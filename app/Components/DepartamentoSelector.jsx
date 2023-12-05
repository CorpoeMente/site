import React from "react";
import { Icone } from ".";
import { BsFillPersonFill } from "react-icons/bs";

const DepartamentoSelector = ({ deps, active, setActive }) => {
  return (
    <div className="flex flex-wrap items-center mx-auto xl:mx-0 md:self-start lg:items-start justify-center gap-4 lg:gap-8 max-w-[80vw]">
      {deps.map((departamento, index) => (
        <Icone
          key={index}
          index={index}
          departamento={departamento}
          setActive={setActive}
          active={active}
          Icone={departamento.Icone}
        />
      ))}
    </div>
  );
};

export default DepartamentoSelector;
