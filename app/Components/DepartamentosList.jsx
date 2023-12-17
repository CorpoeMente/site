"use client";
import React, { useState, useEffect } from "react";
import { Table, TableRow } from "../Components";
const DepartamentosList = () => {
  const [departamentos, setDepartamentos] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch("/api/departamentos")
      .then((response) => response.json())
      .then((data) => setDepartamentos(data))
      .then(() => setLoading(false));
  }, []);

  return (
    <Table className="w-full" headers={["Nome", "imagem", ""]}>
      {loading ? (
        <TableRow>
          <td colSpan={3}>Carregando...</td>
        </TableRow>
      ) : (
        departamentos.map((departamento, index) => (
          <TableRow key={index}>
            <td>{departamento.nome}</td>
            <td>{departamento.imagem}</td>
          </TableRow>
        ))
      )}
    </Table>
  );
};

export default DepartamentosList;
