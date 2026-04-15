import { ChangeEvent, useState } from "react";
import { Plus, Pencil, Trash2, Check, X } from "lucide-react";

type DyCardProps = {
  cards: string[];
  setCards: (cards: string[]) => void;
};

const DynamicInputCards: React.FC<DyCardProps> = ({ cards, setCards }) => {
  const [showInput, setShowInput] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editValue, setEditValue] = useState<string>("");

  const handleAdd = (): void => {
    if (inputValue.trim()) {
      setCards([...cards, inputValue]);
      setInputValue("");
      setShowInput(false);
    }
  };

  const handleDelete = (index: number): void => {
    setCards(cards.filter((_, i) => i !== index));
  };

  const startEdit = (index: number): void => {
    setEditIndex(index);
    setEditValue(cards[index]);
  };

  const saveEdit = (): void => {
    if (editValue.trim() && editIndex !== null) {
      const newCards = [...cards];
      newCards[editIndex] = editValue;
      setCards(newCards);
      setEditIndex(null);
    }
  };

  const inputCls =
    "flex-1 h-9 rounded-md border border-border bg-bg-elevated px-3 text-sm text-fg placeholder:text-fg-subtle focus-visible:outline-none focus-visible:border-fg-muted";

  return (
    <div className="space-y-2 mt-2">
      {cards.length === 0 && !showInput && (
        <p className="text-xs text-fg-subtle font-mono uppercase tracking-wider">
          No questions yet
        </p>
      )}

      <div className="space-y-1.5">
        {cards.map((card, index) => (
          <div
            key={index}
            className="flex items-center gap-2 rounded-md border border-border bg-bg-elevated px-3 py-2 group"
          >
            {editIndex === index ? (
              <>
                <input
                  value={editValue}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setEditValue(e.target.value)
                  }
                  className={inputCls}
                />
                <button
                  type="button"
                  onClick={saveEdit}
                  className="p-1.5 text-success hover:bg-bg-hover rounded transition-colors"
                >
                  <Check size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => setEditIndex(null)}
                  className="p-1.5 text-fg-muted hover:bg-bg-hover rounded transition-colors"
                >
                  <X size={14} />
                </button>
              </>
            ) : (
              <>
                <span className="flex-1 text-sm text-fg">{card}</span>
                <button
                  type="button"
                  onClick={() => startEdit(index)}
                  className="p-1.5 text-fg-muted hover:text-fg hover:bg-bg-hover rounded transition-colors opacity-0 group-hover:opacity-100"
                >
                  <Pencil size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(index)}
                  className="p-1.5 text-fg-muted hover:text-danger hover:bg-bg-hover rounded transition-colors opacity-0 group-hover:opacity-100"
                >
                  <Trash2 size={14} />
                </button>
              </>
            )}
          </div>
        ))}
      </div>

      {showInput ? (
        <div className="flex gap-2">
          <input
            value={inputValue}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setInputValue(e.target.value)
            }
            placeholder="Question..."
            autoFocus
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAdd())}
            className={inputCls}
          />
          <button
            type="button"
            onClick={handleAdd}
            className="px-3 h-9 text-xs font-medium bg-fg text-bg rounded-md hover:bg-fg/90 transition-colors"
          >
            Add
          </button>
          <button
            type="button"
            onClick={() => {
              setShowInput(false);
              setInputValue("");
            }}
            className="px-3 h-9 text-xs text-fg-muted hover:text-fg hover:bg-bg-elevated rounded-md transition-colors"
          >
            Cancel
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setShowInput(true)}
          className="w-full h-9 flex items-center justify-center gap-2 rounded-md border border-dashed border-border text-fg-muted hover:text-fg hover:border-border-hover hover:bg-bg-elevated transition-colors text-xs font-medium"
        >
          <Plus size={14} />
          Add question
        </button>
      )}
    </div>
  );
};

export default DynamicInputCards;
