import React from "react";
import * as Label from "@radix-ui/react-label";

const TextArea = ({ type, label, required = false }) => {
  const [inputValue, setInputValue] = React.useState("");
  return (
    <div className="w-full max-w-[400px] relative">
      <textarea
        className={`w-full border bg-[#f0f0f0] rounded shadow-lg focus:shadow-secondary font-inter font-bold text-lg focus:border-secondary focus:bg-white h-32 xl:h-72 ${
          inputValue ? "border-secondary bg-white" : "border-[#e0e0e0]"
        } py-4 px-4 peer outline-none transition duration-300 ease-in-out`}
        type={type}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <Label.Root
        className={`absolute font-bold text-lg top-[35px] left-2 px-2 transform -translate-y-1/2 transition duration-300 ease-in-out ${
          inputValue
            ? "translate-y-[-50px] bg-white"
            : "peer-focus:translate-y-[-50px] peer-focus:bg-white"
        }`}
      >
        {label}
      </Label.Root>
    </div>
  );
};
export default TextArea;
