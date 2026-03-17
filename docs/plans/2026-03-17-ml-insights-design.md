# RevSpace ML Insights Feature Design

**Date:** 2026-03-17
**Status:** Approved
**Target:** Presentation on 2026-03-19

## Overview

Add ML-powered feedback analysis to RevSpace testimonial collection app. Users submit video or text testimonials, which are automatically analyzed for sentiment. Product owners see aggregated insights per space/product.

## Features

1. **Video + Text Testimonials** - Users can submit either video or written feedback
2. **Automatic Transcription** - Video testimonials transcribed via OpenAI Whisper
3. **Sentiment Analysis** - All feedback analyzed for sentiment, score, and keywords
4. **Product Insights Dashboard** - Aggregated view with AI summary, top appreciations/concerns

## Tech Stack Additions

### Client
- shadcn/ui - Component library
- recharts - Charts for visualizations
- clsx + tailwind-merge - shadcn dependencies

### Server
- openai - Whisper API + GPT API

## Database Schema Changes

```prisma
model Testimonial {
  id           String   @id @default(uuid())
  spaceId      String
  space        Space    @relation(fields: [spaceId], references: [link])
  email        String
  type         String   // "video" | "text"
  v_url        String?  // Cloudinary URL for video
  text_content String?  // Written feedback content
  transcript   String?  // Whisper transcription for videos
  sentiment    String?  // "positive" | "neutral" | "negative"
  score        Int?     // 0-100
  keywords     Json?    // ["fast support", "easy to use", ...]
  analyzed     Boolean  @default(false)
  createdAt    DateTime @default(now())
}
```

## API Endpoints

### New Endpoints

| Method | Route | Purpose |
|--------|-------|---------|
| POST | `/api/v1/testimonial/textupload/:link` | Submit text testimonial |
| GET | `/api/v1/space/:link/insights` | Get aggregated insights for a space |
| POST | `/api/v1/testimonial/:id/reanalyze` | Re-run analysis on a testimonial |

### Modified Endpoints

| Method | Route | Changes |
|--------|-------|---------|
| POST | `/api/v1/testimonial/videoupload/:link/:uploader` | Add transcription + analysis after upload |

## Submission Flow

```
User submits feedback
        |
    Video or Text?
       /        \
   Video         Text
     |             |
Upload to      Save text_content
Cloudinary          |
     |         Send to GPT
Get v_url      for analysis
     |             |
Send to Whisper    |
     |             |
Get transcript     |
     |             |
Send to GPT <------+
     |
{sentiment, score, keywords}
     |
Save to database
```

## Insights Page UI

**Route:** `/dashboard/space/:link/insights`

### Components

1. **Stats Row**
   - Total Reviews count
   - Average Score gauge
   - Sentiment distribution bar

2. **AI Summary Card**
   - GPT-generated paragraph summarizing all feedback

3. **Appreciations & Concerns Cards**
   - Top positive keywords/themes
   - Top negative keywords/themes

4. **Individual Feedback List**
   - Type badge (video/text)
   - Email
   - Score badge
   - Sentiment tag
   - Transcript/text preview
   - Expandable full content

## OpenAI Integration

### Whisper API (Transcription)
```typescript
const transcription = await openai.audio.transcriptions.create({
  file: audioFile,
  model: "whisper-1",
});
```

### GPT API (Analysis)
```typescript
const analysis = await openai.chat.completions.create({
  model: "gpt-3.5-turbo",
  messages: [{
    role: "system",
    content: "Analyze this testimonial feedback..."
  }, {
    role: "user",
    content: transcriptOrText
  }],
  response_format: { type: "json_object" }
});
```

### Expected GPT Response Format
```json
{
  "sentiment": "positive",
  "score": 85,
  "keywords": ["easy to use", "fast support", "clean design"],
  "summary": "User appreciates the intuitive interface..."
}
```

## Implementation Order

1. Set up shadcn/ui in client
2. Install openai package on server
3. Update Prisma schema + migrate
4. Create OpenAI service module
5. Update testimonial upload endpoints
6. Build Insights page UI
7. Create insights API endpoint
8. Test full flow

## Success Criteria

- [ ] Can submit video testimonial and see it analyzed
- [ ] Can submit text testimonial and see it analyzed
- [ ] Insights page shows aggregated data for a space
- [ ] AI summary accurately reflects feedback themes
- [ ] UI is polished with shadcn components
