import { Response } from "express";
import { authReq } from "../middleware/auth";
import streamifier from "streamifier";
import { v2 as cloudinary } from "cloudinary";
import prisma from "../config";
import { transcribeVideo, analyzeSentiment, generateInsightsSummary } from "../services/analysis";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Helper function to process video analysis asynchronously
async function processVideoAnalysis(testimonialId: string, videoUrl: string) {
  try {
    console.log(`Starting analysis for testimonial ${testimonialId}`);

    // Step 1: Transcribe video
    const transcript = await transcribeVideo(videoUrl);
    console.log(`Transcription complete for ${testimonialId}`);

    // Step 2: Analyze sentiment
    const analysis = await analyzeSentiment(transcript);
    console.log(`Sentiment analysis complete for ${testimonialId}`);

    // Step 3: Update database with results
    await prisma.testimonial.update({
      where: { id: testimonialId },
      data: {
        transcript,
        sentiment: analysis.sentiment,
        score: analysis.score,
        keywords: analysis.keywords,
        analyzed: true,
      },
    });

    console.log(`Analysis saved for testimonial ${testimonialId}`);
  } catch (error) {
    console.error(`Analysis failed for testimonial ${testimonialId}:`, error);
    // Mark as analyzed with error state
    await prisma.testimonial.update({
      where: { id: testimonialId },
      data: { analyzed: true },
    });
  }
}

export const testimonialUpload = async (req: authReq, res: Response) => {
  try {
    const { link } = req.params;
    const { uploader } = req.params;
    const path = `Testimonials/${req.user}/${link}/${uploader}/`;

    if (!req.file) {
      res.status(400).json({ success: false, message: "No file uploaded" });
      return;
    }

    const uploadStream = cloudinary.uploader.upload_stream(
      { resource_type: "video", folder: path },
      async (error, result) => {
        if (error) {
          console.error("Error uploading to Cloudinary:", error);
          res.json({ success: false, error: "Upload failed" });
          return;
        }

        if (result) {
          // Create testimonial record
          const testimonial = await prisma.testimonial.create({
            data: {
              email: uploader,
              v_url: result.url,
              spaceId: link,
              type: "video",
              analyzed: false,
            },
          });

          // Start async analysis (don't await - let it run in background)
          processVideoAnalysis(testimonial.id, result.url).catch(console.error);

          res.json({
            success: true,
            message: "Successfully Uploaded Testimonial. Analysis in progress.",
            testimonialId: testimonial.id,
          });
        } else {
          res.json({ success: false, error: "Unable to upload Video" });
        }
      }
    );

    streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
  } catch (error) {
    console.error("Error processing upload:", error);
    res.json({ success: false, error: (error as Error).message });
  }
};

// New endpoint for text testimonials
export const textTestimonialUpload = async (req: authReq, res: Response) => {
  try {
    const { link } = req.params;
    const { email, text } = req.body;

    if (!email || !text) {
      res.status(400).json({ success: false, message: "Email and text are required" });
      return;
    }

    // Analyze sentiment immediately for text (fast enough)
    const analysis = await analyzeSentiment(text);

    // Create testimonial with analysis
    const testimonial = await prisma.testimonial.create({
      data: {
        email,
        spaceId: link,
        type: "text",
        text_content: text,
        sentiment: analysis.sentiment,
        score: analysis.score,
        keywords: analysis.keywords,
        analyzed: true,
      },
    });

    res.json({
      success: true,
      message: "Successfully Submitted Feedback",
      testimonialId: testimonial.id,
    });
  } catch (error) {
    console.error("Error processing text testimonial:", error);
    res.json({ success: false, error: (error as Error).message });
  }
};

export const testimonialDetails = async (req: authReq, res: Response) => {
  const user = req.user;

  const details = await prisma.testimonial.findMany({
    where: {
      space: {
        userId: user,
      },
    },
    select: {
      id: true,
      email: true,
      type: true,
      v_url: true,
      text_content: true,
      transcript: true,
      sentiment: true,
      score: true,
      keywords: true,
      analyzed: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  res.json(details);
};

// Get insights for a specific space
export const spaceInsights = async (req: authReq, res: Response) => {
  try {
    const { link } = req.params;
    const user = req.user;

    // Verify user owns this space
    const space = await prisma.space.findFirst({
      where: {
        link,
        userId: user,
      },
      include: {
        metadata: true,
      },
    });

    if (!space) {
      res.status(404).json({ success: false, message: "Space not found" });
      return;
    }

    // Get all testimonials for this space
    const testimonials = await prisma.testimonial.findMany({
      where: { spaceId: link },
      orderBy: { createdAt: "desc" },
    });

    // Calculate aggregate stats
    const totalReviews = testimonials.length;
    const analyzedReviews = testimonials.filter((t) => t.analyzed);

    const sentimentCounts = {
      positive: analyzedReviews.filter((t) => t.sentiment === "positive").length,
      neutral: analyzedReviews.filter((t) => t.sentiment === "neutral").length,
      negative: analyzedReviews.filter((t) => t.sentiment === "negative").length,
    };

    const avgScore = analyzedReviews.length > 0
      ? Math.round(
          analyzedReviews.reduce((sum, t) => sum + (t.score || 0), 0) / analyzedReviews.length
        )
      : 0;

    // Generate AI insights if we have analyzed testimonials
    let aiInsights = {
      summary: "No feedback data available yet.",
      topAppreciations: [] as string[],
      topConcerns: [] as string[],
    };

    if (analyzedReviews.length > 0) {
      aiInsights = await generateInsightsSummary(analyzedReviews);
    }

    res.json({
      success: true,
      space: {
        id: space.id,
        name: space.spacename,
        description: space.description,
        link: space.link,
      },
      stats: {
        totalReviews,
        analyzedCount: analyzedReviews.length,
        avgScore,
        sentimentCounts,
      },
      insights: aiInsights,
      testimonials: testimonials.map((t) => ({
        id: t.id,
        email: t.email,
        type: t.type,
        content: t.type === "video" ? t.transcript : t.text_content,
        v_url: t.v_url,
        sentiment: t.sentiment,
        score: t.score,
        keywords: t.keywords,
        analyzed: t.analyzed,
        createdAt: t.createdAt,
      })),
    });
  } catch (error) {
    console.error("Error fetching insights:", error);
    res.status(500).json({ success: false, error: (error as Error).message });
  }
};

// Re-analyze a specific testimonial
export const reanalyzeTestimonial = async (req: authReq, res: Response) => {
  try {
    const { id } = req.params;
    const user = req.user;

    const testimonial = await prisma.testimonial.findFirst({
      where: {
        id,
        space: { userId: user },
      },
    });

    if (!testimonial) {
      res.status(404).json({ success: false, message: "Testimonial not found" });
      return;
    }

    // Get text to analyze
    const textToAnalyze = testimonial.type === "video"
      ? testimonial.transcript
      : testimonial.text_content;

    if (!textToAnalyze) {
      // For videos without transcript, re-transcribe
      if (testimonial.type === "video" && testimonial.v_url) {
        processVideoAnalysis(testimonial.id, testimonial.v_url).catch(console.error);
        res.json({ success: true, message: "Re-analysis started" });
        return;
      }
      res.status(400).json({ success: false, message: "No content to analyze" });
      return;
    }

    // Analyze sentiment
    const analysis = await analyzeSentiment(textToAnalyze);

    await prisma.testimonial.update({
      where: { id },
      data: {
        sentiment: analysis.sentiment,
        score: analysis.score,
        keywords: analysis.keywords,
        analyzed: true,
      },
    });

    res.json({ success: true, message: "Re-analysis complete", analysis });
  } catch (error) {
    console.error("Error re-analyzing:", error);
    res.status(500).json({ success: false, error: (error as Error).message });
  }
};
