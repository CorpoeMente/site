"use client";
import React, { useState, useEffect } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { Table, TableRow } from ".";
import { Mensagem } from ".";

const MensagensList = () => {
  const [mensagens, setMensagens] = useState([]);

  const formatDate = (dateStr) => {
    const [year, month, day] = dateStr.split("-");
    let newDate = `${day}/${month}/${year}`;
    return newDate;
  };

  useEffect(() => {
    const getMensagens = async () => {
      const res = await fetch("/api/messages");
      const mensagens = await res.json();
      setMensagens(mensagens);
    };
    getMensagens();
  }, []);

  const deleteMensagem = async (id) => {
    const res = await fetch(`/api/messages`, {
      method: "DELETE",
      body: JSON.stringify({ id }),
    });
    const data = await res.json();
    setMensagens(data);
  };

  return (
    <Table
      headers={["Nome", "Email", "Telefone", "Data", ""]}
      className="w-full"
    >
      {mensagens &&
        mensagens.map((mensagem, index) => {
          return (
            <TableRow key={index}>
              <td className="px-4 py-2">{mensagem.nome}</td>
              <td className="px-4 py-2">{mensagem.email}</td>
              <td className="px-4 py-2">{mensagem.telefone}</td>
              <td className="px-4 py-2">
                {formatDate(mensagem.updatedAt.split("T")[0])}
              </td>
              <td className="px-4 py-2 flex items-center justify-center gap-x-4">
                <Mensagem mensagem={mensagem} />
                <button
                  className="text-white p-2 rounded-md bg-[#f00] text-lg hover:scale-110 transition duration-300 ease-in-out"
                  onClick={() => deleteMensagem(mensagem._id)}
                >
                  <FaTrashAlt />
                </button>
              </td>
            </TableRow>
          );
        })}
    </Table>
  );
};

export default MensagensList;
