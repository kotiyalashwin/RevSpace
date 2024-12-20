type YesNoSliderProps = {
  setValue: React.Dispatch<React.SetStateAction<boolean>>;
  value: boolean;
};

const YesNoSlider = ({ setValue, value }: YesNoSliderProps) => {
  // Default to "No"

  const handleToggle = () => {
    setValue((s) => !s);
  };

  return (
    <div className="flex items-center space-x-4 p-4">
      <span className={`text-md ${!value ? "text-blue-600" : "text-gray-400"}`}>
        No
      </span>
      <div
        className={`w-9 h-6 flex items-center rounded-full p-1 cursor-pointer ${
          value ? "bg-green-500" : "bg-red-500"
        }`}
        onClick={handleToggle}
      >
        <div
          className={`w-4 h-4 bg-white rounded-full shadow-md transform duration-300 ${
            value ? "translate-x-4" : ""
          }`}
        />
      </div>
      <span className={`text-md ${value ? "text-green-600" : "text-gray-400"}`}>
        Yes
      </span>
    </div>
  );
};

export default YesNoSlider;
