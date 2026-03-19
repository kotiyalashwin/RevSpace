# Testimonial Preview & Embed Code Feature

## Overview

Allow users to view submitted testimonials for their products and copy embeddable HTML/CSS snippets to display testimonials on their websites.

## User Flow

```
Dashboard → Testimonials → Select Product → View All Testimonials → Get Embed Code
```

## Routes

| Route | Purpose |
|-------|---------|
| `/testimonials` | Lists all user's products with "View Testimonials" action |
| `/testimonials/:link` | Shows all testimonials for a specific product |

## Navigation Changes

- Add "Testimonials" link to dashboard navigation
- Add "View Testimonials" button on SpaceBox component (alongside "View Form" and "Insights")

## Page: Products List (`/testimonials`)

**Data Source:** Existing `/space/spaces` endpoint

**Layout:**
- Header: "Your Testimonials"
- Grid of product cards, each showing:
  - Product name
  - Testimonial count
  - "View Testimonials" button

## Page: Testimonials List (`/testimonials/:link`)

**Data Source:** Existing `/testimonial/insights/:link` endpoint (uses testimonial data, ignores AI insights)

**Layout:**
- Header: Product name + "Back to products" link
- Stats bar: Total count | Video count | Text count
- Grid of testimonial preview cards

**Testimonial Preview Card:**
- Type indicator (video/text icon)
- Preview content:
  - Video: Cloudinary auto-thumbnail with play icon overlay
  - Text: First ~100 characters truncated
- Submitter email
- Submission date
- "Get Embed Code" button

## Embed Modal

Opens when user clicks "Get Embed Code" on a testimonial card.

**Components:**
1. **Live Preview** - Shows how the embed will look
2. **Style Dropdown** - Compact / Standard / Featured
3. **Code Box** - Static HTML/CSS snippet with copy button

**Style Variations (Consistent Theme):**

All styles share: same border radius, shadow style, font weights, neutral color scheme. Differ only in size/density.

| Style | Use Case |
|-------|----------|
| Compact | Sidebars, tight spaces |
| Standard | General purpose, balanced |
| Featured | Hero sections, prominent display |

## Embed Code Structure

### Text Testimonial

```html
<div class="revspace-testimonial revspace-{style}">
  <blockquote class="revspace-content">
    "{testimonial text}"
  </blockquote>
  <div class="revspace-footer">
    <span class="revspace-email">{email}</span>
    <span class="revspace-date">{date}</span>
  </div>
  <style>
    /* All styles inlined - self-contained */
  </style>
</div>
```

### Video Testimonial

```html
<div class="revspace-testimonial revspace-{style}">
  <video
    class="revspace-video"
    poster="{cloudinary-thumbnail-url}"
    controls
    preload="none"
  >
    <source src="{cloudinary-video-url}" type="video/mp4">
  </video>
  <div class="revspace-footer">
    <span class="revspace-email">{email}</span>
    <span class="revspace-date">{date}</span>
  </div>
  <style>
    /* All styles inlined - self-contained */
  </style>
</div>
```

## Video Thumbnail

Use Cloudinary's automatic thumbnail generation by transforming the video URL:

```
Original: https://res.cloudinary.com/xxx/video/upload/v123/path/video.mp4
Thumbnail: https://res.cloudinary.com/xxx/video/upload/v123/path/video.jpg
```

The `poster` attribute on `<video>` displays this thumbnail until user clicks play.

## Technical Notes

### No Backend Changes Required
- Uses existing `/space/spaces` endpoint for products list
- Uses existing `/testimonial/insights/:link` endpoint for testimonials data
- Static HTML snippets generated client-side

### No Approval Workflow
- All testimonials are embeddable by default
- No moderation step required

### No Customization (v1)
- Fixed styles per option
- No color/font customization in initial release

## Files to Create/Modify

### New Files
- `client/src/pages/Testimonials.tsx` - Products list page
- `client/src/pages/TestimonialEmbed.tsx` - Testimonials list with embed
- `client/src/components/Testimonial/EmbedModal.tsx` - Embed code modal
- `client/src/components/Testimonial/TestimonialCard.tsx` - Preview card component
- `client/src/utils/embedGenerator.ts` - Generates HTML/CSS snippets

### Modified Files
- `client/src/App.tsx` - Add new routes
- `client/src/components/Dashboard/SpaceBox.tsx` - Add "View Testimonials" button
- Navigation component - Add "Testimonials" link

## Embed Styles CSS

```css
/* Shared base styles */
.revspace-testimonial {
  font-family: system-ui, -apple-system, sans-serif;
  box-sizing: border-box;
}

.revspace-content {
  margin: 0;
  font-style: italic;
}

.revspace-video {
  width: 100%;
  border-radius: inherit;
}

.revspace-footer {
  display: flex;
  justify-content: space-between;
  opacity: 0.7;
  font-size: 0.875em;
}

/* Compact */
.revspace-compact {
  max-width: 280px;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #e5e5e5;
  font-size: 14px;
}

/* Standard */
.revspace-standard {
  max-width: 400px;
  padding: 20px;
  border-radius: 12px;
  border: 1px solid #e5e5e5;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  font-size: 16px;
}

/* Featured */
.revspace-featured {
  max-width: 560px;
  padding: 32px;
  border-radius: 16px;
  border: 1px solid #e5e5e5;
  box-shadow: 0 4px 16px rgba(0,0,0,0.08);
  font-size: 18px;
}
```

## Out of Scope (Future)

- Script-based dynamic embeds
- Color/font customization
- Testimonial approval workflow
- Carousel/gallery widgets for multiple testimonials
- Analytics on embed views
