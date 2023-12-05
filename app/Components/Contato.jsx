import React from "react";
import { Input, TextArea } from ".";
import { FiSend } from "react-icons/fi";
const Contato = () => {
  return (
    <div
      className="absolute bottom-[-15%] lg:bottom-[-10%] z-10 bg-white flex items-stretch justify-center min-w-[250px] w-full max-w-[80vw]  rounded-xl  min-h-[600px] card-shadow"
      id="contato"
    >
      <div className="hidden lg:block bg-[#e0e0e0] w-2/5 rounded-l-xl"></div>

      <form className="w-4/5 lg:w-3/5 flex flex-col items-center justify-between py-12 gap-8">
        <h2 className="text-primary text-4xl font-bold text-center">
          Entre em Contato Conosco
        </h2>
        <Input
          type="text"
          placeholder="Digite seu Nome"
          required={true}
          label="Nome"
        />

        <Input
          type="email"
          placeholder="Digite seu Email"
          required={true}
          label="Email"
        />

        <Input
          type="text"
          placeholder="Digite seu Telefone"
          required={true}
          label="Telefone"
          mask="(99) 99999-9999"
        />
        <TextArea label={"Digite sua mensagem..."} />

        <button
          className="bg-primary hover:bg-secondary w-full max-w-[400px] py-3 rounded-lg text-white font-bold text-xl font-urbanist transition duration-300 ease-in-out mt-6"
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
