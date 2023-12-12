"use client";
import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { FaTimes } from "react-icons/fa";
import { Input, TextArea } from ".";

const Agendamento = ({ servico }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [data, setData] = useState("");
  const [mensagem, setMensagem] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    setSuccess(false);

    const body = {
      nome,
      email,
      telefone,
      data,
      mensagem,
      servico: servico.nome,
    };
    const res = await fetch("/api/pedidos", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="text-white bg-primary font-bold py-2 lg:py-4 text-xl w-full  rounded-lg shadow-lg hover:from-0% hover:scale-110 hover:bg-secondary hover:text-primary transition ease-in-out duration-300">
          Solicitar Agendamento
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay bg-primary z-40 relative" />
        <Dialog.Content className="DialogContent bg-primary z-40 relative overflow-y-auto !h-[1600px]">
          <Dialog.Title className="text-2xl text-primary text-center font-bold">
            Agendamento de {servico.nome}
          </Dialog.Title>

          <form
            className="flex flex-col items-center justify-between gap-8 mt-8 w-full"
            onSubmit={handleSubmit}
          >
            <Input
              state={nome}
              setState={setNome}
              className={"!max-w-[75%]"}
              type={"text"}
              label={"Nome"}
              required={true}
            />

            <Input
              state={email}
              setState={setEmail}
              className={"!max-w-[75%]"}
              type={"email"}
              label={"Email"}
              required={true}
            />

            <Input
              state={telefone}
              setState={setTelefone}
              className={"!max-w-[75%]"}
              type={"tel"}
              label={"Telefone"}
              required={true}
              mask={"(99) 99999-9999"}
            />

            <Input
              state={data}
              setState={setData}
              className={"!max-w-[75%]"}
              type={"date"}
              label={"Data do Agendamento"}
              required={true}
            />

            <TextArea
              state={mensagem}
              setState={setMensagem}
              className={
                "w-full md:w-[110%] md:ms-[-5%] xl:w-[140%] xl:ms-[-20%]"
              }
              type={"text"}
              label={"Digite informações de horário e dia"}
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
