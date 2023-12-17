"use client";
import React, { useState, useEffect } from "react";
import { Table, TableRow } from "../Components";

const ServicosList = () => {
  const [servicos, setServicos] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch("/api/servicos")
      .then((response) => response.json())
      .then((data) => setServicos(data))
      .then(() => setLoading(false));
  }, []);

  return (
    <Table className="w-full" headers={["Nome", "Tipo", ""]}>
      {loading ? (
        <TableRow>
          <td colSpan={3}>Carregando...</td>
        </TableRow>
      ) : (
        servicos.map((servico, index) => <TableRow key={index}></TableRow>)
      )}
      {!loading &&
        servicos.map((servico, index) => (
          <TableRow key={index}>
            <td>{servico.name}</td>
            <td>{servico.type}</td>
            <td>
              <button
                onClick={() => {
                  fetch(`/api/servicos/${servico.id}`, {
                    method: "DELETE",
                  }).then(() => window.location.reload());
                }}
              >
                Delete
              </button>
            </td>
          </TableRow>
        ))}
    </Table>
  );
};

export default ServicosList;
