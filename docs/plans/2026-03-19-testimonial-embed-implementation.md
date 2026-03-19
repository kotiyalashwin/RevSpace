# Testimonial Preview & Embed Feature Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Allow users to view submitted testimonials for their products and copy embeddable HTML/CSS snippets.

**Architecture:** Two new pages (`/testimonials` and `/testimonials/:link`) using existing API endpoints. Client-side embed code generation with three style variants (Compact/Standard/Featured). Modal for style selection and code copying.

**Tech Stack:** React, TypeScript, Tailwind CSS, shadcn/ui components, Lucide icons, axios

---

## Task 1: Add Select and Dialog UI Components

**Files:**
- Create: `client/src/components/ui/select.tsx`
- Create: `client/src/components/ui/dialog.tsx`

**Step 1: Add shadcn select component**

Run: `cd /home/woksh/projects/RevSpace/client && npx shadcn@latest add select`

**Step 2: Add shadcn dialog component**

Run: `cd /home/woksh/projects/RevSpace/client && npx shadcn@latest add dialog`

**Step 3: Verify components installed**

Run: `ls -la /home/woksh/projects/RevSpace/client/src/components/ui/`
Expected: `select.tsx` and `dialog.tsx` should exist

**Step 4: Commit**

```bash
git add client/src/components/ui/
git commit -m "feat: add select and dialog UI components"
```

---

## Task 2: Create Embed Code Generator Utility

**Files:**
- Create: `client/src/utils/embedGenerator.ts`

**Step 1: Create the embed generator utility**

```typescript
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
```

**Step 2: Commit**

```bash
git add client/src/utils/embedGenerator.ts
git commit -m "feat: add embed code generator utility"
```

---

## Task 3: Create Testimonial Card Component

**Files:**
- Create: `client/src/components/Testimonial/TestimonialCard.tsx`

**Step 1: Create the testimonial card component**

```typescript
import { Video, FileText, Code } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Testimonial {
  id: string;
  email: string;
  type: "video" | "text";
  content: string | null;
  v_url: string | null;
  createdAt: string;
}

interface TestimonialCardProps {
  testimonial: Testimonial;
  onGetEmbed: (testimonial: Testimonial) => void;
}

function getVideoThumbnailUrl(videoUrl: string): string {
  return videoUrl.replace(/\.(mp4|webm|mov)$/i, ".jpg");
}

function TestimonialCard({ testimonial, onGetEmbed }: TestimonialCardProps) {
  const formattedDate = new Date(testimonial.createdAt).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    }
  );

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        {/* Type Badge */}
        <div className="flex items-center justify-between mb-3">
          <Badge variant="outline" className="gap-1">
            {testimonial.type === "video" ? (
              <Video size={14} />
            ) : (
              <FileText size={14} />
            )}
            {testimonial.type}
          </Badge>
        </div>

        {/* Preview Content */}
        <div className="mb-3 min-h-[80px]">
          {testimonial.type === "video" && testimonial.v_url ? (
            <div className="relative rounded-lg overflow-hidden bg-gray-100">
              <img
                src={getVideoThumbnailUrl(testimonial.v_url)}
                alt="Video thumbnail"
                className="w-full h-32 object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='80' viewBox='0 0 100 80'%3E%3Crect fill='%23f3f4f6' width='100' height='80'/%3E%3Ctext x='50' y='45' text-anchor='middle' fill='%239ca3af' font-size='12'%3EVideo%3C/text%3E%3C/svg%3E";
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-black/60 rounded-full p-3">
                  <Video className="text-white" size={20} />
                </div>
              </div>
            </div>
          ) : (
            <p className="text-gray-600 text-sm line-clamp-3 italic">
              "{testimonial.content?.slice(0, 100)}
              {(testimonial.content?.length || 0) > 100 ? "..." : ""}"
            </p>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
          <span className="truncate max-w-[150px]">{testimonial.email}</span>
          <span>{formattedDate}</span>
        </div>

        {/* Get Embed Button */}
        <button
          onClick={() => onGetEmbed(testimonial)}
          className="w-full flex items-center justify-center gap-2 bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors"
        >
          <Code size={16} />
          Get Embed Code
        </button>
      </CardContent>
    </Card>
  );
}

export default TestimonialCard;
```

**Step 2: Commit**

```bash
git add client/src/components/Testimonial/TestimonialCard.tsx
git commit -m "feat: add testimonial card component with preview"
```

---

## Task 4: Create Embed Modal Component

**Files:**
- Create: `client/src/components/Testimonial/EmbedModal.tsx`

**Step 1: Create the embed modal component**

```typescript
import { useState } from "react";
import { Copy, Check } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  generateEmbedCode,
  EmbedStyle,
  TestimonialData,
} from "@/utils/embedGenerator";

interface EmbedModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  testimonial: TestimonialData | null;
}

function EmbedModal({ open, onOpenChange, testimonial }: EmbedModalProps) {
  const [style, setStyle] = useState<EmbedStyle>("standard");
  const [copied, setCopied] = useState(false);

  if (!testimonial) return null;

  const embedCode = generateEmbedCode(testimonial, style);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(embedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Get Embed Code</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Style Selector */}
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium text-gray-700">Style:</label>
            <Select
              value={style}
              onValueChange={(value) => setStyle(value as EmbedStyle)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select style" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="compact">Compact</SelectItem>
                <SelectItem value="standard">Standard</SelectItem>
                <SelectItem value="featured">Featured</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Live Preview */}
          <div className="border rounded-lg p-4 bg-gray-50">
            <p className="text-sm font-medium text-gray-500 mb-3">Preview:</p>
            <div
              className="bg-white p-4 rounded-lg flex justify-center"
              dangerouslySetInnerHTML={{ __html: embedCode }}
            />
          </div>

          {/* Code Box */}
          <div className="relative">
            <p className="text-sm font-medium text-gray-500 mb-2">
              HTML Code:
            </p>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm max-h-[200px] overflow-y-auto">
              <code>{embedCode}</code>
            </pre>
            <button
              onClick={handleCopy}
              className="absolute top-8 right-2 flex items-center gap-1 bg-white text-gray-700 px-3 py-1.5 rounded-md text-sm hover:bg-gray-100 transition-colors border"
            >
              {copied ? (
                <>
                  <Check size={14} />
                  Copied!
                </>
              ) : (
                <>
                  <Copy size={14} />
                  Copy
                </>
              )}
            </button>
          </div>

          {/* Instructions */}
          <div className="text-sm text-gray-500 bg-blue-50 p-3 rounded-lg">
            <p className="font-medium text-blue-700 mb-1">How to use:</p>
            <ol className="list-decimal list-inside space-y-1 text-blue-600">
              <li>Copy the code above</li>
              <li>Paste it into your website's HTML</li>
              <li>The testimonial will display with all styles included</li>
            </ol>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default EmbedModal;
```

**Step 2: Commit**

```bash
git add client/src/components/Testimonial/EmbedModal.tsx
git commit -m "feat: add embed modal with style selector and code preview"
```

---

## Task 5: Create Products List Page (Testimonials Landing)

**Files:**
- Create: `client/src/pages/Testimonials.tsx`

**Step 1: Create the products list page**

```typescript
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, MessageSquare, Video, FileText } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const SERVER = import.meta.env.VITE_SERVER;

interface Space {
  id: number;
  spacename: string;
  description: string;
  link: string;
  _count?: {
    testimonials: number;
  };
}

function Testimonials() {
  const navigate = useNavigate();
  const [spaces, setSpaces] = useState<Space[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSpaces = async () => {
      try {
        const response = await axios.get(`${SERVER}/api/v1/space/spaces`, {
          withCredentials: true,
        });
        setSpaces(response.data.spaces || []);
      } catch {
        toast.error("Failed to load products");
        navigate("/dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchSpaces();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-4">
          <button
            onClick={() => navigate("/dashboard")}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <div>
            <h1 className="text-2xl font-bold">Testimonials</h1>
            <p className="text-gray-500 text-sm">
              View and embed testimonials for your products
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {spaces.length === 0 ? (
          <div className="text-center py-16">
            <MessageSquare className="mx-auto text-gray-300 mb-4" size={64} />
            <h2 className="text-xl font-medium text-gray-600 mb-2">
              No products yet
            </h2>
            <p className="text-gray-500 mb-4">
              Create a space in your dashboard to start collecting testimonials
            </p>
            <button
              onClick={() => navigate("/dashboard")}
              className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800"
            >
              Go to Dashboard
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {spaces.map((space) => (
              <Card
                key={space.id}
                className="hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => navigate(`/testimonials/${space.link}`)}
              >
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{space.spacename}</span>
                    <MessageSquare size={20} className="text-gray-400" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {space.description && (
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {space.description}
                    </p>
                  )}
                  <button
                    className="w-full bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/testimonials/${space.link}`);
                    }}
                  >
                    View Testimonials
                  </button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default Testimonials;
```

**Step 2: Commit**

```bash
git add client/src/pages/Testimonials.tsx
git commit -m "feat: add testimonials products list page"
```

---

## Task 6: Create Testimonials Detail Page with Embed

**Files:**
- Create: `client/src/pages/TestimonialsEmbed.tsx`

**Step 1: Create the testimonials detail page**

```typescript
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Video, FileText } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { Badge } from "@/components/ui/badge";
import TestimonialCard from "@/components/Testimonial/TestimonialCard";
import EmbedModal from "@/components/Testimonial/EmbedModal";
import { TestimonialData } from "@/utils/embedGenerator";

const SERVER = import.meta.env.VITE_SERVER;

interface Testimonial {
  id: string;
  email: string;
  type: "video" | "text";
  content: string | null;
  v_url: string | null;
  createdAt: string;
}

interface SpaceData {
  space: {
    id: number;
    name: string;
    description: string;
    link: string;
  };
  testimonials: Testimonial[];
}

function TestimonialsEmbed() {
  const { link } = useParams<{ link: string }>();
  const navigate = useNavigate();
  const [data, setData] = useState<SpaceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTestimonial, setSelectedTestimonial] =
    useState<TestimonialData | null>(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get(
          `${SERVER}/api/v1/testimonial/insights/${link}`,
          { withCredentials: true }
        );
        setData(response.data);
      } catch {
        toast.error("Failed to load testimonials");
        navigate("/testimonials");
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, [link, navigate]);

  const handleGetEmbed = (testimonial: Testimonial) => {
    setSelectedTestimonial({
      type: testimonial.type,
      content: testimonial.content,
      v_url: testimonial.v_url,
      email: testimonial.email,
      createdAt: testimonial.createdAt,
    });
    setModalOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  const { space, testimonials } = data;
  const videoCount = testimonials.filter((t) => t.type === "video").length;
  const textCount = testimonials.filter((t) => t.type === "text").length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-4">
          <button
            onClick={() => navigate("/testimonials")}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <div>
            <h1 className="text-2xl font-bold">{space.name}</h1>
            <p className="text-gray-500 text-sm">{space.description}</p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Bar */}
        <div className="flex items-center gap-4 mb-6">
          <Badge variant="outline" className="text-sm py-1 px-3">
            Total: {testimonials.length}
          </Badge>
          <Badge variant="outline" className="text-sm py-1 px-3 gap-1">
            <Video size={14} />
            {videoCount}
          </Badge>
          <Badge variant="outline" className="text-sm py-1 px-3 gap-1">
            <FileText size={14} />
            {textCount}
          </Badge>
        </div>

        {/* Testimonials Grid */}
        {testimonials.length === 0 ? (
          <div className="text-center py-16">
            <FileText className="mx-auto text-gray-300 mb-4" size={64} />
            <h2 className="text-xl font-medium text-gray-600 mb-2">
              No testimonials yet
            </h2>
            <p className="text-gray-500">
              Share your testimonial form link to start collecting feedback
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {testimonials.map((testimonial) => (
              <TestimonialCard
                key={testimonial.id}
                testimonial={testimonial}
                onGetEmbed={handleGetEmbed}
              />
            ))}
          </div>
        )}
      </main>

      {/* Embed Modal */}
      <EmbedModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        testimonial={selectedTestimonial}
      />
    </div>
  );
}

export default TestimonialsEmbed;
```

**Step 2: Commit**

```bash
git add client/src/pages/TestimonialsEmbed.tsx
git commit -m "feat: add testimonials detail page with embed modal"
```

---

## Task 7: Add Routes to App.tsx

**Files:**
- Modify: `client/src/App.tsx`

**Step 1: Add imports and routes**

Add to imports at top:
```typescript
import Testimonials from "./pages/Testimonials";
import TestimonialsEmbed from "./pages/TestimonialsEmbed";
```

Add routes inside `<Routes>`:
```typescript
<Route path="/testimonials" element={<Testimonials />} />
<Route path="/testimonials/:link" element={<TestimonialsEmbed />} />
```

**Step 2: Commit**

```bash
git add client/src/App.tsx
git commit -m "feat: add testimonials routes"
```

---

## Task 8: Add "View Testimonials" Button to SpaceBox

**Files:**
- Modify: `client/src/components/Dashboard/SpaceBox.tsx`

**Step 1: Add MessageSquare import**

Add to imports:
```typescript
import { BookPlus, BarChart3, MessageSquare } from "lucide-react";
```

**Step 2: Add View Testimonials button in SpaceCard**

In the `SpaceCard` component, add a new button in the `div` with `className="flex gap-2"`:

```typescript
<button
  onClick={() => navigate(`/testimonials/${link}`)}
  className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-3 rounded flex items-center"
>
  <MessageSquare size={18} />
</button>
```

**Step 3: Commit**

```bash
git add client/src/components/Dashboard/SpaceBox.tsx
git commit -m "feat: add view testimonials button to space cards"
```

---

## Task 9: Test the Feature

**Step 1: Start the dev server**

Run: `cd /home/woksh/projects/RevSpace/client && npm run dev`

**Step 2: Manual Testing Checklist**

- [ ] Navigate to `/testimonials` - should see products list
- [ ] Click a product - should navigate to `/testimonials/:link`
- [ ] See testimonial cards with preview (video thumbnail or text snippet)
- [ ] Click "Get Embed Code" - modal should open
- [ ] Change style dropdown - preview should update
- [ ] Copy code - should copy to clipboard
- [ ] Paste code in an HTML file - should render correctly

**Step 3: Final commit**

```bash
git add -A
git commit -m "feat: complete testimonial preview and embed feature"
```

---

## Summary

**New Files Created:**
- `client/src/utils/embedGenerator.ts` - Generates HTML/CSS embed snippets
- `client/src/components/Testimonial/TestimonialCard.tsx` - Preview card component
- `client/src/components/Testimonial/EmbedModal.tsx` - Style selector + code modal
- `client/src/pages/Testimonials.tsx` - Products list page
- `client/src/pages/TestimonialsEmbed.tsx` - Testimonials list with embed

**Modified Files:**
- `client/src/App.tsx` - Added routes
- `client/src/components/Dashboard/SpaceBox.tsx` - Added View Testimonials button
- `client/src/components/ui/select.tsx` - Added via shadcn (Task 1)
- `client/src/components/ui/dialog.tsx` - Added via shadcn (Task 1)
