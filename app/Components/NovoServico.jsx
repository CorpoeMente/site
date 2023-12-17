import React from "react";
import { Modal, Input } from "../Components";

const NovoServico = () => {
  return (
    <Modal
      buttonText={"Novo Serviço"}
      title={"Novo Serviço"}
      className={"w-1/3 !text-sm"}
    >
      <Input type="text" label="Nome" />
      <Input type="text" label="Tipo" />
      <Input type="text" label="Descrição" />
    </Modal>
  );
};

export default NovoServico;
