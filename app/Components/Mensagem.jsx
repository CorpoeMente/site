import React from "react";
import { Modal } from ".";
import { MdMessage } from "react-icons/md";

const Mensagem = ({ mensagem }) => {
  return (
    <Modal
      buttonText={<MdMessage />}
      title={"Mensagem de " + mensagem.nome}
      className={"max-w-[60px] !p-2"}
    >
      <div className="flex flex-col h-3/4">
        <p className="text-lg font-bold text-primary">{mensagem.mensagem}</p>
        <p className="text-lg text-primary mt-auto mb-4">{mensagem.email}</p>
        <p className="text-lg text-primary">{mensagem.telefone}</p>
      </div>
    </Modal>
  );
};

export default Mensagem;
