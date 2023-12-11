"use client";
import React, { useState, useEffect } from "react";
import { Table, TableRow } from ".";
import { FaTrashAlt } from "react-icons/fa";
import { Mensagem } from ".";

const Pedidos = () => {
  const [pedidos, setPedidos] = useState([]);
  const formatDate = (dateStr) => {
    const [year, month, day] = dateStr.split("-");
    let newDate = `${day}/${month}/${year}`;
    return newDate;
  };
  useEffect(() => {
    const getpedidos = async () => {
      const res = await fetch("/api/pedidos");
      const pedidos = await res.json();
      setPedidos(pedidos);
    };
    getpedidos();
  }, []);

  const deletePedido = async (id) => {
    const res = await fetch(`/api/pedidos`, {
      method: "DELETE",
      body: JSON.stringify({ id }),
    });
    const data = await res.json();
    setPedidos(data);
  };
  return (
    <Table
      headers={["Nome", "Email", "Telefone", "Serviço", "Mensagem", "Data", ""]}
    >
      {pedidos.map((pedido) => (
        <TableRow key={pedido._id}>
          <td className="px-4 py-2">{pedido.nome}</td>
          <td className="px-4 py-2">{pedido.email}</td>
          <td className="px-4 py-2">{pedido.telefone}</td>
          <td className="px-4 py-2">{pedido.servico}</td>
          <td className="px-4 py-2">{formatDate(pedido.data.split("T")[0])}</td>
          <td className="px-4 py-2 flex items-center justify-center gap-x-4">
            <button
              className="text-white p-2 rounded-md bg-[#f00] text-lg hover:scale-110 transition duration-300 ease-in-out"
              onClick={() => deletePedido(pedido._id)}
            >
              <FaTrashAlt />
            </button>
            <Mensagem mensagem={pedido} />
          </td>
        </TableRow>
      ))}
    </Table>
  );
};

export default Pedidos;
