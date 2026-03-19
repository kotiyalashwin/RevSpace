export type EmbedStyle = "compact" | "standard" | "featured";

export interface TestimonialData {
  type: "video" | "text";
  content: string | null;
  v_url: string | null;
  email: string;
  createdAt: string;
}

function getVideoThumbnailUrl(videoUrl: string): string {
  // Convert Cloudinary video URL to thumbnail
  // e.g., .../video.mp4 -> .../video.jpg
  return videoUrl.replace(/\.(mp4|webm|mov)$/i, ".jpg");
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function getStyleCSS(style: EmbedStyle): string {
  const baseCSS = `
.revspace-testimonial {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  box-sizing: border-box;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  color: #1f2937;
}
.revspace-testimonial * {
  box-sizing: border-box;
}
.revspace-content {
  margin: 0;
  font-style: italic;
  line-height: 1.6;
  color: #374151;
}
.revspace-content::before {
  content: '"';
}
.revspace-content::after {
  content: '"';
}
.revspace-video {
  width: 100%;
  border-radius: 8px;
  background: #000;
}
.revspace-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
  font-size: 0.875em;
  color: #6b7280;
}
.revspace-email {
  font-weight: 500;
}`;

  const styleVariants: Record<EmbedStyle, string> = {
    compact: `
.revspace-compact {
  max-width: 280px;
  padding: 12px;
  border-radius: 8px;
  font-size: 14px;
}
.revspace-compact .revspace-video {
  border-radius: 6px;
}`,
    standard: `
.revspace-standard {
  max-width: 400px;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  font-size: 16px;
}`,
    featured: `
.revspace-featured {
  max-width: 560px;
  padding: 32px;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  font-size: 18px;
}
.revspace-featured .revspace-content {
  font-size: 1.125em;
  line-height: 1.7;
}`,
  };

  return baseCSS + styleVariants[style];
}

export function generateEmbedCode(
  testimonial: TestimonialData,
  style: EmbedStyle
): string {
  const css = getStyleCSS(style);
  const date = formatDate(testimonial.createdAt);

  let contentHTML: string;

  if (testimonial.type === "video" && testimonial.v_url) {
    const thumbnailUrl = getVideoThumbnailUrl(testimonial.v_url);
    contentHTML = `
    <video
      class="revspace-video"
      poster="${thumbnailUrl}"
      controls
      preload="none"
    >
      <source src="${testimonial.v_url}" type="video/mp4">
      Your browser does not support the video tag.
    </video>`;
  } else {
    const textContent = testimonial.content || "";
    contentHTML = `
    <blockquote class="revspace-content">
      ${textContent}
    </blockquote>`;
  }

  return `<div class="revspace-testimonial revspace-${style}">
  ${contentHTML.trim()}
  <div class="revspace-footer">
    <span class="revspace-email">${testimonial.email}</span>
    <span class="revspace-date">${date}</span>
  </div>
  <style>${css}</style>
</div>`;
}
