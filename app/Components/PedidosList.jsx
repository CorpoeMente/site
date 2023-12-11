"use client";
import React, { useState, useEffect } from "react";

const Pedidos = () => {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    const getpedidos = async () => {
      const res = await fetch("/api/pedidos");
      const pedidos = await res.json();
      setPedidos(pedidos);
    };
    getpedidos();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      {pedidos &&
        pedidos.map((pedido, index) => {
          return (
            <div
              className="flex flex-col items-center justify-center gap-4"
              key={index}
            >
              <div className="flex flex-row items-center justify-center gap-4">
                <div className="flex flex-col items-center justify-center gap-4">
                  <h1 className="text-xl font-semibold">{pedido.nome}</h1>
                </div>
                <div className="flex flex-col items-center justify-center gap-4">
                  <h1 className="text-xl font-semibold">{pedido.email}</h1>
                </div>
                <div className="flex flex-col items-center justify-center gap-4">
                  <h1 className="text-xl font-semibold">{pedido.telefone}</h1>
                </div>
                <div className="flex flex-col items-center justify-center gap-4">
                  <h1 className="text-xl font-semibold">{pedido.data}</h1>
                </div>
                <div className="flex flex-col items-center justify-center gap-4">
                  <h1 className="text-xl font-semibold">{pedido.servico}</h1>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Pedidos;
