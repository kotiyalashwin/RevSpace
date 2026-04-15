import { cn } from "@/lib/utils";

type YesNoSliderProps = {
  setValue: React.Dispatch<React.SetStateAction<boolean>>;
  value: boolean;
};

const YesNoSlider = ({ setValue, value }: YesNoSliderProps) => {
  const handleToggle = () => setValue((s) => !s);

  return (
    <button
      type="button"
      onClick={handleToggle}
      role="switch"
      aria-checked={value}
      className={cn(
        "relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border border-border transition-colors duration-150",
        value ? "bg-fg" : "bg-bg-elevated"
      )}
    >
      <span
        className={cn(
          "inline-block h-3.5 w-3.5 transform rounded-full transition-transform duration-150 mt-[1px]",
          value ? "translate-x-[18px] bg-bg" : "translate-x-[2px] bg-fg-muted"
        )}
      />
    </button>
  );
};

export default YesNoSlider;
