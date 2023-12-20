"use client";
import React from "react";
import * as Label from "@radix-ui/react-label";
import InputMask from "react-input-mask";

const Input = ({
  type,
  label,
  required = false,
  mask,
  className,
  state,
  setState,
  disabled = false,
}) => {
  return (
    <div
      className={`w-full max-w-[400px] relative ${className} lg:!max-w-[75%]`}
    >
      {mask ? (
        <InputMask
          mask={mask}
          className={`w-full border bg-[#fafafa] rounded shadow-lg focus:shadow-secondary font-inter font-medium text-sm lg:text-lg focus:border-secondary focus:bg-white ${
            state ? "border-secondary bg-white" : "border-[#e0e0e0]"
          } p-2 peer outline-none transition duration-300 ease-in-out`}
          type={type}
          value={state}
          onChange={(e) => setState(e.target.value)}
          autoComplete="off"
          required={required}
          {...(disabled && { disabled: true })}
        />
      ) : (
        <input
          className={`w-full border rounded shadow-lg focus:shadow-secondary font-inter font-medium text-sm lg:text-lg focus:border-secondary focus:bg-white ${
            state ? "border-secondary bg-white" : "border-[#e0e0e0]"
          } ${
            type == "date" || type == "time" ? "bg-white" : "bg-[#fafafa]"
          } p-2 peer outline-none transition duration-300 ease-in-out`}
          type={type}
          value={state}
          onChange={(e) => setState(e.target.value)}
          autoComplete="off"
          required={required}
          {...(disabled && { disabled: true })}
        />
      )}
      {type != "date" && type != "time" ? (
        <Label.Root
          className={`absolute font-medium text-sm lg:text-lg text-[#404040] top-1/2 left-2 px-2 transform -translate-y-1/2 transition duration-300 ease-in-out pointer-events-none ${
            state
              ? "translate-y-[-30px] lg:translate-y-[-38px] bg-white text-[#000]"
              : "peer-focus:translate-y-[-30px] lg:peer-focus:translate-y-[-38px] peer-focus:bg-white peer-focus:text-[#000]"
          }`}
        >
          {label}
        </Label.Root>
      ) : (
        <Label.Root
          className={`absolute font-bold text-sm lg:text-lg top-0 left-2 px-2 transform -translate-y-1/2 transition duration-300 ease-in-out bg-white pointer-events-none ${
            state ? "bg-white" : "peer-focus:bg-white"
          }`}
        >
          {label}
        </Label.Root>
      )}
    </div>
  );
};

export default Input;
