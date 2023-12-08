import React from "react";
import { Agendamento } from ".";
const Servico = ({ servico, index }) => {
  var colors = [
    "light-blue",
    "purple",
    "light-purple",
    "pink",
    "orange",
    "green",
  ];

  return (
    <div
      key={index}
      className="flex flex-col items-center justify-start gap-8 min-w-[250px] max-w-[300px] lg:max-w-[400px] h-full bg-white rounded-xl shadow-xl p-8 text-center w-full h-full max-h-[600px] relative overflow-hidden"
    >
      <div className={`bg-${colors[index]} w-36 h-36 rounded-lg`}></div>

      <h4 className="font-bold text-xl  text-clamp-2">{servico.nome}</h4>

      <p>{servico.descricao}</p>

      <Agendamento servico={servico} />
    </div>
  );
};

export default Servico;
