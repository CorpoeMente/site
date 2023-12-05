import React from "react";

const Icone = ({ index, departamento, setActive, active, Icone = null }) => {
  return (
    <div
      className={`flex flex-col xl:flex-row items-center justify-start text-lg font-urbanist font-light  bg-[#fcfcfc]  gap-4 cursor-pointer py-4 px-6 w-full sm:w-60 pe-4 xl:w-80 rounded-xl border-2 border-[#a0a0a] relative z-50  shadow-lg ${
        active === index
          ? `text-white !bg-secondary hover:text-white`
          : "text-primary"
      } hover:bg-[#e1e9eC] hover:text-primary transition-all`}
      onClick={() => setActive(index)}
    >
      <div
        className={`rounded-lg shadow w-16 h-16 relative`}
        style={{ backgroundColor: departamento.color }}
      >
        {Icone ? (
          <Icone className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 text-6xl text-primary drop-shadow-xl" />
        ) : (
          <img
            src={departamento.img}
            className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2"
          />
        )}
      </div>
      <span className={`text-xl font-bold mx-auto`}>{departamento.name}</span>
    </div>
  );
};

export default Icone;
