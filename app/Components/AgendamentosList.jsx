"use client";
import React, { useState, useEffect } from "react";
import { Table, TableRow } from ".";
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
    <Table headers={["Nome", "Email", "Telefone", "Data", "Serviço", ""]}>
      {agendamentos &&
        agendamentos.map((agendamento, index) => {
          return (
            <TableRow key={index}>
              <td className="px-4 py-2">{agendamento.nome}</td>
              <td className="px-4 py-2">{agendamento.email}</td>
              <td className="px-4 py-2">{agendamento.telefone}</td>
              <td className="px-4 py-2">{agendamento.data}</td>
              <td className="px-4 py-2">{agendamento.servico}</td>
            </TableRow>
          );
        })}
    </Table>
  );
};

export default AgendamentosList;
