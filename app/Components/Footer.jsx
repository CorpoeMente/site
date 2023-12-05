import React from "react";
import { FaLocationArrow, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { BsInstagram, BsFacebook, BsWhatsapp } from "react-icons/bs";
import { Map } from ".";

const Footer = () => {
  return (
    <footer className="w-screen xl:max-h-[1000px] min-h-[650px] xl:h-[80vh] bg-primary px-[5%] xl:px-[10%] pt-[300px] flex flex-col items-center">
      <div className="flex flex-col gap-y-24 xl:flex-row items-start justify-between w-screen xl:px-[5%] 2xl:px-[10%]">
        <Map />
        <div className="flex flex-col items-center font-urbanist text-white gap-y-8 gap-x-2 w-full xl:w-1/3 h-full">
          <h2 className="text-7xl font-bold mb-4">LOGO</h2>
          <div className="flex items-center gap-x-8">
            <FaLocationArrow className="text-4xl " />
            <span className="text-xl">
              Taguatinga Norte, QNG 32 Lote 19, Brasília - DF, 72115-700
            </span>
          </div>
          <div className="flex items-center gap-x-8">
            <FaPhoneAlt className="text-4xl" />
            <span className="text-xl">(61) 99999-9999</span>
          </div>
          <div className="flex items-center gap-x-8">
            <FaEnvelope className="text-4xl" />
            <span className="text-xl">contato@clinicacorpoemente.com</span>
          </div>

          <div className="flex items-start gap-x-12 mt-auto mb-8">
            <a
              href=""
              className="bg-white p-4 rounded-full text-primary cursor-pointer hover:bg-[#e0e0e0] transition duration-300 ease-in-out"
            >
              <BsInstagram className="text-4xl" />
            </a>
            <a
              href=""
              className="bg-white p-4 rounded-full text-primary cursor-pointer hover:bg-[#e0e0e0] transition duration-300 ease-in-out"
            >
              <BsFacebook className="text-4xl" />
            </a>
            <a
              href=""
              className="bg-white p-4 rounded-full text-primary cursor-pointer hover:bg-[#e0e0e0] transition duration-300 ease-in-out"
            >
              <BsWhatsapp className="text-4xl" />
            </a>
          </div>
        </div>
        <div className="grid grid-cols-2 self-center font-urbanist text-white h-full gap-x-12 xl:w-1/3">
          <h4 className="col-span-2 font-bold text-3xl mb-8 text-center xl:text-start">
            Horário de Funcionamento
          </h4>
          <span className="text-xl">Segunda-Feira</span>
          <span className="text-xl text-end xl:text-start">08:00 - 18:00</span>

          <span className="text-xl">Terça-Feira</span>
          <span className="text-xl text-end xl:text-start">08:00 - 18:00</span>

          <span className="text-xl">Quarta-Feira</span>
          <span className="text-xl text-end xl:text-start">08:00 - 18:00</span>

          <span className="text-xl">Quinta-Feira</span>
          <span className="text-xl text-end xl:text-start">08:00 - 18:00</span>

          <span className="text-xl">Sexta-Feira</span>
          <span className="text-xl text-end xl:text-start">08:00 - 18:00</span>

          <span className="text-xl">Sábado</span>
          <span className="text-xl text-end xl:text-start">08:00 - 18:00</span>

          <span className="text-xl">Domingo e Feriados</span>
          <span className="text-xl text-end xl:text-start">Fechado</span>
        </div>
      </div>

      <hr className="w-full h-[1px] text-white mt-24 xl:mt-auto" />
      <span className="text-white text-xl text-center justify-end my-4">
        © Copyright 2023 All Rights Reserved by João Alves | Developed by{" "}
        <a
          href="https://github.com/Joaoaalves"
          className="underline text-bold font-urbanist cursor-pointer"
        >
          João Alves
        </a>
      </span>
    </footer>
  );
};

export default Footer;
