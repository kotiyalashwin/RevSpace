import { Loader2, X } from "lucide-react";
import StatBox from "./StatBox";
import SpaceBox from "./SpaceBox";
import { FormEvent, useEffect, useState } from "react";
import Input from "./Input";
import DynamicInputCards from "./DynamicInputCards";
import YesNoSlider from "./YesNoSlider";
import Preview from "./MainBox/Preview";
import axios from "axios";
import toast from "react-hot-toast";
import useSpaces from "../../hooks/spaces";
import { InlineLoader } from "@/components/ui/loader";

const SERVER = import.meta.env.VITE_SERVER;

interface Space {
  id?: number;
  spacename: string;
  description: string;
  link: string;
  _count?: { testimonials: number };
}

function MainContent() {
  const [isOpen, setIsOpen] = useState(false);
  const [spaces, setSpaces] = useState<Space[]>([]);

  const { isLoading, spacesData } = useSpaces();
  useEffect(() => {
    if (!isLoading) setSpaces(spacesData);
  }, [isLoading, spacesData]);

  return (
    <div className="px-6 md:px-10 py-10 max-w-[1280px] mx-auto">
      {/* Topbar */}
      <header className="mb-10 flex items-end justify-between">
        <div className="space-y-2">
          <p className="font-mono text-[11px] uppercase tracking-wider text-fg-muted">
            Overview
          </p>
          <h1 className="text-3xl md:text-4xl font-medium tracking-tight text-fg">
            Welcome back
          </h1>
        </div>
      </header>

      {isLoading ? (
        <InlineLoader text="Loading spaces" />
      ) : (
        <>
          <StatBox spaces={spaces as any} />
          <SpaceBox spaces={spaces} setIsOpen={setIsOpen} />
        </>
      )}

      {isOpen && <SpaceForm setIsOpen={setIsOpen} />}
    </div>
  );
}

type SpaceFormProps = { setIsOpen: (v: boolean) => void };

const SpaceForm = ({ setIsOpen }: SpaceFormProps) => {
  const [header, setHeader] = useState<string>("Title for Space");
  const [message, setMessage] = useState<string>("A message for your users");
  const [spaceName, setSpaceName] = useState<string>("");
  const [valueVideo, setValueVideo] = useState(false);
  const [valueText, setValueText] = useState(false);
  const [cards, setCards] = useState<string[]>([]);
  const [creating, setCreating] = useState(false);

  const handleCreateSpace = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!spaceName.trim()) {
      toast.error("Space name is required");
      return;
    }
    setCreating(true);
    try {
      const body = {
        spaceName,
        description: message,
        spaceMetadata: {
          formFields: {
            header,
            message,
            wantVideo: valueVideo,
            wantText: valueText,
            questions: cards,
          },
        },
      };
      const response = await axios.post<{ success: boolean; message?: string; error?: string }>(
        `${SERVER}/api/v1/space/newspace`,
        body,
        { withCredentials: true }
      );
      const data = response.data;
      if (data.success) {
        toast.success(data.message || "Space created");
        setIsOpen(false);
        window.location.reload();
      } else {
        toast.error(data.error || "Failed to create space");
      }
    } catch {
      toast.error("Failed to create space");
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
      />
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative w-full max-w-5xl rounded-lg border border-border bg-bg-elevated shadow-2xl shadow-black/40 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-border">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-wider text-fg-muted">
                New
              </p>
              <h2 className="text-lg font-medium tracking-tight text-fg">
                Create a space
              </h2>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 text-fg-muted hover:text-fg hover:bg-bg-hover rounded transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-6 p-6 max-h-[80vh] overflow-y-auto">
            {/* Form */}
            <form onSubmit={handleCreateSpace} className="space-y-1">
              <Input
                label="Space name"
                placeholder="e.g. Acme Reviews"
                message="Used in your public URL"
                onChange={(e) => setSpaceName(e.target.value)}
              />

              <Input
                label="Header title"
                placeholder="Share your experience"
                message=""
                onChange={(e) => setHeader(e.target.value)}
              />

              <Input
                label="Message"
                placeholder="We'd love to hear what you think"
                message=""
                onChange={(e) => setMessage(e.target.value)}
              />

              <div className="pt-3">
                <p className="font-mono text-[11px] uppercase tracking-wider text-fg-muted mb-1">
                  Questions
                </p>
                <DynamicInputCards cards={cards} setCards={setCards} />
              </div>

              <div className="pt-4 space-y-3">
                <p className="font-mono text-[11px] uppercase tracking-wider text-fg-muted">
                  Allowed formats
                </p>
                <div className="rounded-md border border-border divide-y divide-border">
                  <ToggleRow
                    label="Video testimonials"
                    desc="Customers can record videos"
                    value={valueVideo}
                    setValue={setValueVideo}
                  />
                  <ToggleRow
                    label="Text testimonials"
                    desc="Customers can write reviews"
                    value={valueText}
                    setValue={setValueText}
                  />
                </div>
              </div>

              <div className="pt-6 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  disabled={creating}
                  className="h-9 px-4 text-sm text-fg-muted hover:text-fg hover:bg-bg-hover rounded-md transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={creating}
                  className="h-9 px-4 text-sm font-medium bg-fg text-bg rounded-md hover:bg-fg/90 transition-colors disabled:opacity-50 inline-flex items-center gap-2"
                >
                  {creating ? (
                    <>
                      <Loader2 className="animate-spin" size={14} /> Creating
                    </>
                  ) : (
                    "Create space"
                  )}
                </button>
              </div>
            </form>

            {/* Preview */}
            <Preview
              preview={null}
              wantImage={false}
              cards={cards}
              valueVideo={valueVideo}
              valueText={valueText}
              header={header}
              message={message}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const ToggleRow = ({
  label,
  desc,
  value,
  setValue,
}: {
  label: string;
  desc: string;
  value: boolean;
  setValue: React.Dispatch<React.SetStateAction<boolean>>;
}) => (
  <div className="flex items-center justify-between p-3">
    <div>
      <p className="text-sm text-fg">{label}</p>
      <p className="text-xs text-fg-muted">{desc}</p>
    </div>
    <YesNoSlider value={value} setValue={setValue} />
  </div>
);

export default MainContent;
