import React from "react";
import { useSelector } from "react-redux";

export default function InputForm({
  type = "text",
  inputValue,
  setInputValue,
  placeholder,
}) {
  const mode = useSelector(state => state.mode);
  return (
    <input
      style={{ backgroundColor: mode.themeColor, color: mode.textColor }}
      className={`w-full p-2 rounded-md text-sm outline-none ${
        mode.theme === "dark"
          ? " border border-gray-400  active:border-white hover:border-white"
          : "border active:border-gray-800 hover:border-gray-800"
      }`}
      type={type}
      placeholder={placeholder}
      value={inputValue}
      onChange={e => setInputValue(e.target.value)}
    />
  );
}
