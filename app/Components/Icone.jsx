import React from "react";

const Icone = ({ index, departamento, setActive, active, Icone = null }) => {
  const handleClick = () => {
    setActive(index);
    const profissionaisDiv = document.getElementById("profissional");
    profissionaisDiv.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      className={`flex flex-col xl:flex-row items-center justify-start text-lg  font-light  bg-[#fcfcfc]  gap-4 cursor-pointer p-2 w-full sm:w-60 pe-4 xl:w-80 rounded-xl border-2 border-[#a0a0a] relative z-30  shadow-lg ${
        active === index
          ? `text-white !bg-secondary hover:text-white`
          : "text-primary"
      } hover:bg-[#e1e9eC] hover:text-primary transition-all`}
      onClick={handleClick}
    >
      <span className={`text-xl font-bold mx-auto`}>{departamento.name}</span>
    </div>
  );
};

export default Icone;
