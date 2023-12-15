import React from "react";
import { Modal, Table, TableRow } from ".";

const Valores = ({ valores }) => {
  return (
    <Modal
      buttonText={"Ver Valores"}
      title={"Valores"}
      className={"w-full !text-sm"}
    >
      <Table headers={["Tipo", "Valor"]} className="w-full">
        {valores.map((item, index) => (
          <TableRow key={index}>
            <td className="px-4 py-4 text-center">{item.title}</td>
            <td className="px-4 py-4 text-center">
              R$ {item.price.toFixed(2)}
            </td>
          </TableRow>
        ))}
      </Table>

      <p className="text-center mt-4">
        * Trabalhamos com valores sociais, caso não possa pagar o valor.
      </p>
    </Modal>
  );
};

export default Valores;
