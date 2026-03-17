import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  timeout: 60000, // 60 seconds
  maxRetries: 2,
});

interface AnalysisResult {
  sentiment: "positive" | "neutral" | "negative";
  score: number;
  keywords: string[];
  summary: string;
}

export async function transcribeVideo(videoUrl: string): Promise<string> {
  try {
    // Fetch the video file from Cloudinary URL
    const response = await fetch(videoUrl);
    const arrayBuffer = await response.arrayBuffer();

    // Create a File object for OpenAI API using Blob
    const blob = new Blob([arrayBuffer], { type: "video/webm" });
    const file = new File([blob], "video.webm", { type: "video/webm" });

    const transcription = await openai.audio.transcriptions.create({
      file: file,
      model: "whisper-1",
    });

    return transcription.text;
  } catch (error) {
    console.error("Transcription error:", error);
    throw new Error("Failed to transcribe video");
  }
}

export async function analyzeSentiment(text: string): Promise<AnalysisResult> {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are a sentiment analysis assistant. Analyze the following testimonial feedback and return a JSON object with:
- sentiment: "positive", "neutral", or "negative"
- score: a number from 0-100 (0 being most negative, 100 being most positive)
- keywords: an array of 3-5 key themes or topics mentioned (e.g., "easy to use", "fast support", "pricing concerns")
- summary: a one-sentence summary of the feedback

Respond ONLY with valid JSON, no additional text.`,
        },
        {
          role: "user",
          content: text,
        },
      ],
      response_format: { type: "json_object" },
    });

    const result = JSON.parse(completion.choices[0].message.content || "{}");

    return {
      sentiment: result.sentiment || "neutral",
      score: Math.min(100, Math.max(0, result.score || 50)),
      keywords: result.keywords || [],
      summary: result.summary || "",
    };
  } catch (error) {
    console.error("Sentiment analysis error:", error);
    throw new Error("Failed to analyze sentiment");
  }
}

export async function generateInsightsSummary(
  testimonials: { transcript?: string | null; text_content?: string | null; sentiment?: string | null; keywords?: unknown }[]
): Promise<{ summary: string; topAppreciations: string[]; topConcerns: string[] }> {
  try {
    // Combine all feedback text
    const allFeedback = testimonials
      .map((t) => t.transcript || t.text_content || "")
      .filter((text) => text.length > 0)
      .join("\n---\n");

    // Collect all keywords
    const allKeywords = testimonials
      .flatMap((t) => (Array.isArray(t.keywords) ? t.keywords : []))
      .filter((k): k is string => typeof k === "string");

    // Collect sentiments
    const sentimentCounts = {
      positive: testimonials.filter((t) => t.sentiment === "positive").length,
      neutral: testimonials.filter((t) => t.sentiment === "neutral").length,
      negative: testimonials.filter((t) => t.sentiment === "negative").length,
    };

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are an insights analyst. Based on the following testimonials, generate a JSON response with:
- summary: A 2-3 sentence executive summary of overall feedback themes
- topAppreciations: Array of 3-5 most mentioned positive aspects
- topConcerns: Array of 3-5 most mentioned concerns or areas for improvement

Context:
- Total feedback count: ${testimonials.length}
- Sentiment breakdown: ${sentimentCounts.positive} positive, ${sentimentCounts.neutral} neutral, ${sentimentCounts.negative} negative
- Keywords mentioned: ${allKeywords.slice(0, 20).join(", ")}

Respond ONLY with valid JSON.`,
        },
        {
          role: "user",
          content: allFeedback.slice(0, 8000), // Limit context length
        },
      ],
      response_format: { type: "json_object" },
    });

    const result = JSON.parse(completion.choices[0].message.content || "{}");

    return {
      summary: result.summary || "No feedback data available for analysis.",
      topAppreciations: result.topAppreciations || [],
      topConcerns: result.topConcerns || [],
    };
  } catch (error) {
    console.error("Insights generation error:", error);
    return {
      summary: "Unable to generate insights at this time.",
      topAppreciations: [],
      topConcerns: [],
    };
  }
}
