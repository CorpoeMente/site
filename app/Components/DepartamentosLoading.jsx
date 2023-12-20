import React from "react";
const DepartamentosLoading = () => {
  return (
    <div
      className={`flex flex-row  items-center justify-start text-lg  font-light  bg-[#fcfcfc]  gap-4 cursor-pointer p-4 w-80 rounded-xl border-2 border-[#a0a0a] relative z-30 hover:bg-[#e1e9eC] hover:text-primary transition-all`}
    >
      <div
        className={`rounded-lg shadow w-16 h-16 relative bg-gray-400 animate-pulse`}
      ></div>
      <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-2/3 ms-auto animate-pulse"></div>
    </div>
  );
};

export default DepartamentosLoading;
