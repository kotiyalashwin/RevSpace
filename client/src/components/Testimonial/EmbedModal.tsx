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
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
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
