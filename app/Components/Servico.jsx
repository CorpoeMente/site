"use client";
import React from "react";
import { Agendamento, Valores } from ".";
import { LiaFileMedicalAltSolid } from "react-icons/lia";
import { FaUserDoctor } from "react-icons/fa6";
const Servico = ({ servico, index }) => {
  return (
    <div
      key={index}
      className="flex flex-col items-center justify-between min-w-[250px] max-w-[300px] lg:max-w-[400px] min-h-[500px] max-h-[600px] bg-white rounded-xl shadow-xl p-8 text-center w-full h-full relative overflow-hidden"
    >
      <div
        className={`${
          servico.departamento === "psicologia"
            ? "bg-[#79d1e5]"
            : servico.departamento === "neuropsicologia"
            ? "bg-[#b173df]"
            : "bg-[#84fb98]"
        } w-28 h-28 rounded-lg shadow-[1px_1px_4px_1px_rgba(0,0,0,0.25)] flex flex-col items-center justify-center mb-4`}
      >
        {servico.type === "servico" ? (
          <FaUserDoctor className="w-16 h-16 text-white drop-shadow-[0px_0px_4px_rgba(200,200,200,0.5)]" />
        ) : (
          <LiaFileMedicalAltSolid className="w-16 h-16 text-white drop-shadow-[0px_0px_4px_rgba(200,200,200,0.5)]" />
        )}
      </div>

      <h4 className="font-bold text-xl  text-clamp-2 mb-4">{servico.nome}</h4>

      <p>{servico.descricao}</p>

      {servico.valores && (
        <Valores valores={servico.valores} valorSocial={servico.valorSocial} />
      )}

      <Agendamento servico={servico} />
    </div>
  );
};

export default Servico;
