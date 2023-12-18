"use client";
import React, { useState, useEffect } from "react";
import { DepartamentoSelector, Profissional } from "../Components";
import { PiBrainThin } from "react-icons/pi";

const Departamentos = () => {
  const [active, setActive] = useState(0);
  const [deps, setDeps] = useState([]);

  useEffect(() => {
    fetch("/api/departamentos")
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          //
        } else {
          setDeps(res.departamentos);
        }
      });
  }, []);
  return (
    <section
      className="w-screen bg-white flex flex-col items-start px-[10%] xl:px-[15%] py-[48px] relative"
      id="departamentos"
    >
      <h1 className="text-primary self-center md:self-start text-3xl xl:text-4xl font-bold mb-4">
        Departamentos
      </h1>
      <span className="w-full xl:w-[50%] mb-12 text-lg">
        Explore nossos departamentos e descubra como podemos cuidar melhor de
        você. Cada departamento é liderado por profissionais dedicados e
        qualificados.
      </span>

      <DepartamentoSelector deps={deps} active={active} setActive={setActive} />
      <Profissional departamento={active} />
    </section>
  );
};

export default Departamentos;
