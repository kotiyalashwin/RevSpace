import { ChangeEvent, useState } from "react";

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
    const newCards = cards.filter((_, i) => i !== index);
    setCards(newCards);
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

  return (
    <div className="space-y-4">
      <button
        type="button"
        onClick={() => setShowInput(true)}
        className="w-full bg-[#8e8e8e] hover:bg-black text-white py-2 px-4 rounded flex items-center justify-center gap-2 transition-colors"
      >
        <span className="text-xl">+</span> Add New Item
      </button>

      {showInput && (
        <div className="flex gap-2 bg-slate-200 p-2">
          <input
            value={inputValue}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setInputValue(e.target.value)
            }
            placeholder="Question..."
            className="flex-1 border rounded px-3 py-2 focus:outline-none focus:border-blue-500"
          />
          <button
            type="button"
            onClick={handleAdd}
            className="bg-black  text-white px-4 py-2 rounded transition-colors"
          >
            Add
          </button>
          <button
            type="button"
            onClick={() => {
              setShowInput(false);
              setInputValue("");
            }}
            className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded transition-colors"
          >
            ×
          </button>
        </div>
      )}

      <div className="space-y-2">
        {cards.map((card, index) => (
          <div key={index} className="bg-white shadow rounded-lg p-4 border">
            {editIndex === index ? (
              <div className="flex gap-2">
                <input
                  value={editValue}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setEditValue(e.target.value)
                  }
                  className="flex-1 border rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                />
                <button
                  type="button"
                  onClick={saveEdit}
                  className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded transition-colors"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setEditIndex(null)}
                  className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded transition-colors"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <span>{card}</span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => startEdit(index)}
                    className="text-blue-500 hover:text-blue-600 px-2 py-1 rounded transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(index)}
                    className="text-red-500 hover:text-red-600 px-2 py-1 rounded transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
export default DynamicInputCards;
