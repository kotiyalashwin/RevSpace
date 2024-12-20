import { ChangeEvent } from "react";

type InputProps = {
  label: string;
  placeholder: string;
  message: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export default function Input({
  label,
  placeholder,
  message,
  onChange,
}: InputProps) {
  return (
    <div className="w-full mb-2 ">
      <p className="font-semibold">{label}</p>
      <input
        required
        onChange={onChange}
        className="w-full border-2 p-2 border-gray-200 outline-none placeholder:text-sm focus:ring-1"
        placeholder={placeholder}
      />
      <p className="text-neutral-400">{message}</p>
    </div>
  );
}
