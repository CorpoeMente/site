"use client";
import React, { useState, useEffect } from "react";
import { MdMessage } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";

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
      console.log(mensagens);
      setMensagens(mensagens);
    };
    getMensagens();
  }, []);

  return (
    <table className="table-fixed w-2/3 border-[1px]">
      <thead>
        <tr>
          <th className="py-4">
            <h1>Nome</h1>
          </th>
          <th className="py-4">
            <h1>Email</h1>
          </th>
          <th className="py-4">
            <h1>Telefone</h1>
          </th>
          <th className="py-4">
            <h1>Data</h1>
          </th>
          <th className="py-4">
            <h1>Ações</h1>
          </th>
        </tr>
      </thead>
      <tbody>
        {mensagens &&
          mensagens.map((mensagem, index) => {
            return (
              <tr
                className={`${
                  index % 2 == 0 ? "bg-[#d0d0d0]" : "bg-[#ffffff]"
                }`}
              >
                <td className="text-center font-bold py-2">
                  <h1>{mensagem.nome}</h1>
                </td>
                <td className="text-center font-bold">
                  <h1>{mensagem.email}</h1>
                </td>
                <td className="text-center font-bold">
                  <h1>{mensagem.telefone}</h1>
                </td>
                <td className="text-center font-bold">
                  <h1>{formatDate(mensagem.updatedAt.split("T")[0])}</h1>
                </td>
                <td className="text-center font-bold">
                  <button className="text-white p-1 bg-[#0fffc0] text-2xl me-2 rounded-md hover:scale-110 transition duration-300 ease-in-out">
                    <MdMessage className="drop-shadow-[0px_0px_4px_rgba(0,0,0,0.8)]" />
                  </button>
                  <button className="text-white p-1 bg-[#f00] text-xl rounded-md hover:scale-110 transition duration-300 ease-in-out ">
                    <FaTrashAlt className="drop-shadow-[0px_0px_4px_rgba(0,0,0,0.5)]" />
                  </button>
                </td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};

export default MensagensList;
