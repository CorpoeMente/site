"use client";
import React, { useState, useEffect } from "react";

const AgendamentosList = () => {
  const [agendamentos, setAgendamentos] = useState([]);

  useEffect(() => {
    const getAgendamentos = async () => {
      const res = await fetch("/api/agendamentos");
      const agendamentos = await res.json();
      setAgendamentos(agendamentos);
    };
    getAgendamentos();
  }, []);
  return (
    <div className="flex flex-col items-center justify-center">
      {agendamentos &&
        agendamentos.map((agendamento) => {
          return (
            <div className="flex flex-col items-center justify-center gap-4">
              <div className="flex flex-row items-center justify-center gap-4">
                <div className="flex flex-col items-center justify-center gap-4">
                  <h1 className="text-xl font-semibold">{agendamento.nome}</h1>
                </div>
                <div className="flex flex-col items-center justify-center gap-4">
                  <h1 className="text-xl font-semibold">{agendamento.email}</h1>
                </div>
                <div className="flex flex-col items-center justify-center gap-4">
                  <h1 className="text-xl font-semibold">
                    {agendamento.telefone}
                  </h1>
                </div>
                <div className="flex flex-col items-center justify-center gap-4">
                  <h1 className="text-xl font-semibold">{agendamento.data}</h1>
                </div>
                <div className="flex flex-col items-center justify-center gap-4">
                  <h1 className="text-xl font-semibold">{agendamento.hora}</h1>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default AgendamentosList;
