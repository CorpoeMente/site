"use client";
import React from "react";
import { Input, TextArea } from ".";
import { FiSend } from "react-icons/fi";
const Contato = () => {
  const [nome, setNome] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [telefone, setTelefone] = React.useState("");
  const [mensagem, setMensagem] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    // post to api /api/mensagens
    const data = {
      nome,
      email,
      telefone,
      mensagem,
    };

    fetch("/api/messages", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => {
      setLoading(false);
      setNome("");
      setEmail("");
      setTelefone("");
      setMensagem("");
      setSuccess(true);
    });
  };

  return (
    <div
      className="absolute bottom-[-15%] lg:bottom-[-10%] z-10 bg-white flex items-stretch justify-center min-w-[250px] w-full max-w-[80vw] max-w-[1600px]  rounded-xl  min-h-[600px] card-shadow"
      id="contato"
    >
      <img
        src="equipe.jpg"
        alt="Foto da equipe do Espaço Clínico Corpo e Mente"
        className="hidden lg:block bg-[#e0e0e0] w-[40%] rounded-l-xl object-cover object-center"
      />

      <form
        className="w-4/5 lg:w-3/5 flex flex-col items-center justify-between py-12 gap-8"
        onSubmit={(e) => handleSubmit(e)}
      >
        <h2 className="text-primary text-4xl font-bold text-center">
          Entre em Contato Conosco
        </h2>
        {success && (
          <p className="text-center text-lg font-medium text-[#060]">
            Mensagem enviada com sucesso!
          </p>
        )}
        <Input
          disabled={loading}
          type="text"
          placeholder="Digite seu Nome"
          required={true}
          label="Nome"
          state={nome}
          setState={setNome}
        />

        <Input
          disabled={loading}
          type="email"
          placeholder="Digite seu Email"
          required={true}
          label="Email"
          state={email}
          setState={setEmail}
        />

        <Input
          disabled={loading}
          type="text"
          placeholder="Digite seu Telefone"
          required={true}
          label="Telefone"
          mask="(99) 99999-9999"
          state={telefone}
          setState={setTelefone}
        />
        <TextArea
          label={"Digite sua mensagem..."}
          state={mensagem}
          setState={setMensagem}
        />

        <button
          className="bg-primary hover:bg-secondary w-full max-w-[400px] py-3 rounded-lg text-white font-bold text-xl  transition duration-300 ease-in-out mt-6"
          type="submit"
        >
          <FiSend className="inline-block mr-2" />
          Enviar
        </button>
      </form>
    </div>
  );
};

export default Contato;
