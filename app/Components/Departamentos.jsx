"use client";
import React, { useState } from "react";
import { DepartamentoSelector, Profissional } from "../Components";
import { PiBrainThin } from "react-icons/pi";

const deps = [
  {
    name: "Neuropsicologia",
    img: "/neuropsicologia.svg",
    color: "#FFC5D9",
    Icone: PiBrainThin,
  },
  {
    name: "Psicologia",
    img: "/psychology.svg",
    color: "#ADF4FF",
  },
  {
    name: "Nutrição",
    img: "/nutrition.svg",
    color: "#FFDFAF",
  },
];

const Departamentos = () => {
  const [active, setActive] = useState(0);
  return (
    <section
      className="w-screen bg-white flex flex-col items-start px-[10%] xl:px-[15%] py-[48px] relative"
      id="departamentos"
    >
      <h1 className="text-primary self-center md:self-start text-5xl  text-bold mb-4">
        Departamentos
      </h1>
      <span className="w-full xl:w-[40%] mb-12 text-lg">
        Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi.
        Aliquam in hendrerit urna. Pellentesque sit amet sapien.
      </span>

      <DepartamentoSelector deps={deps} active={active} setActive={setActive} />
      <Profissional departamento={active} />
    </section>
  );
};

export default Departamentos;
