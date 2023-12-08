"use client";
import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { FaTimes } from "react-icons/fa";
import { Input } from ".";

const Agendamento = ({ servico }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    setSuccess(false);

    const body = {
      nome: e.target[0].value,
      email: e.target[1].value,
      telefone: e.target[2].value,
      data: e.target[3].value,
      mensagem: e.target[4].value,
      servico: servico.nome,
    };

    console.log(body);
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="text-white bg-primary font-bold mt-8 lg:mt-auto py-2 lg:py-4 text-xl w-full  rounded-lg shadow-lg hover:from-0% hover:scale-110 hover:bg-secondary hover:text-primary transition ease-in-out duration-300">
          Solicitar Agendamento
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay bg-primary z-40 relative" />
        <Dialog.Content className="DialogContent bg-primary z-40 relative">
          <Dialog.Title className="text-2xl text-primary text-center font-bold ">
            Agendamento de {servico.nome}
          </Dialog.Title>

          <form
            className="flex flex-col items-center justify-between gap-8 mt-24 w-full"
            onSubmit={handleSubmit}
          >
            {/* type, label, required = false, mask */}
            <Input
              className={"!max-w-[75%]"}
              type={"text"}
              label={"Nome"}
              required={true}
            />

            <Input
              className={"!max-w-[75%]"}
              type={"email"}
              label={"Email"}
              required={true}
            />

            <Input
              className={"!max-w-[75%]"}
              type={"tel"}
              label={"Telefone"}
              required={true}
              mask={"(99) 99999-9999"}
            />

            <Input
              className={"!max-w-[75%]"}
              type={"date"}
              label={"Data do Agendamento"}
              required={true}
            />

            <Input
              className={"!max-w-[75%]"}
              type={"text"}
              label={"Mensagem"}
              required={true}
              mask={""}
            />

            <button
              type="submit"
              className="bg-primary py-4 text-white font-bold  text-xl rounded-xl mt-auto hover:from-0% hover:scale-[1.01] hover:bg-secondary hover:text-primary transition ease-in-out duration-300 w-3/4"
            >
              {loading ? "Enviando..." : "Enviar"}
            </button>

            <Dialog.Close asChild>
              <button className="bg-gray-dark py-2 px-6 absolute bottom-6 right-6 text-white font-bold  text-xl rounded-xl">
                Fechar
              </button>
            </Dialog.Close>
          </form>
          <Dialog.Close asChild>
            <button
              className="text-[#f00] absolute top-6 right-6 hover:scale-150 transition duration-300 ease-in-out"
              aria-label="Close"
            >
              <FaTimes />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Agendamento;
