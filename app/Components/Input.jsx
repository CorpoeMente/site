"use client";
import React from "react";
import * as Label from "@radix-ui/react-label";
import InputMask from "react-input-mask";

const Input = ({ type, label, required = false, mask, className }) => {
  const [inputValue, setInputValue] = React.useState("");
  return (
    <div className={`w-full max-w-[400px] relative ${className}`}>
      {mask ? (
        <InputMask
          mask={mask}
          className={`w-full border bg-[#f0f0f0] rounded shadow-lg focus:shadow-secondary font-inter font-bold text-lg focus:border-secondary focus:bg-white ${
            inputValue ? "border-secondary bg-white" : "border-[#e0e0e0]"
          } py-4 px-4 peer outline-none transition duration-300 ease-in-out`}
          type={type}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          autoComplete="off"
          required={required}
        />
      ) : (
        <input
          className={`w-full border rounded shadow-lg focus:shadow-secondary font-inter font-bold text-lg focus:border-secondary focus:bg-white ${
            inputValue ? "border-secondary bg-white" : "border-[#e0e0e0]"
          } ${
            type == "date" || type == "time" ? "bg-white" : "bg-[#f0f0f0]"
          } py-4 px-4 peer outline-none transition duration-300 ease-in-out`}
          type={type}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          autoComplete="off"
          required={required}
        />
      )}
      {type != "date" && type != "time" ? (
        <Label.Root
          className={`absolute font-bold text-lg top-1/2 left-2 px-2 transform -translate-y-1/2 transition duration-300 ease-in-out pointer-events-none ${
            inputValue
              ? "translate-y-[-45px] bg-white"
              : "peer-focus:translate-y-[-45px] peer-focus:bg-white"
          }`}
        >
          {label}
        </Label.Root>
      ) : (
        <Label.Root
          className={`absolute font-bold text-lg top-0 left-2 px-2 transform -translate-y-1/2 transition duration-300 ease-in-out bg-white pointer-events-none ${
            inputValue ? "bg-white" : "peer-focus:bg-white"
          }`}
        >
          {label}
        </Label.Root>
      )}
    </div>
  );
};

export default Input;
