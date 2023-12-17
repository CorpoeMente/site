"use client";
import React from "react";
import { Agendamento, Valores } from ".";
import { LiaFileMedicalAltSolid } from "react-icons/lia";
import { FaUserDoctor } from "react-icons/fa6";
import { ImageLoading, TextLoading, ButtonLoading } from ".";
const Servico = ({ servico, index }) => {
  return (
    <div
      key={index}
      className="flex flex-col items-center justify-between min-w-[250px] max-w-[300px] lg:max-w-[400px] min-h-[500px] max-h-[600px] bg-white rounded-xl shadow-xl p-8 text-center w-full h-full relative overflow-hidden"
    >
      <ImageLoading className="w-28 h-28 text-white drop-shadow-[0px_0px_4px_rgba(200,200,200,0.5)] mb-4" />

      <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4 self-center"></div>
      <TextLoading />

      <ButtonLoading
        className="text-white bg-primary font-bold mt-8 lg:mt-auto py-2 lg:py-4 text-xl  rounded-lg shadow-lg hover:from-0% hover:scale-110 hover:bg-secondary hover:text-primary transition ease-in-out duration-300 
        w-full !text-sm mb-4 bg-white border-2 border-primary !text-primary hover:!scale-100 hover:!bg-primary hover:!text-white transition ease-in-out duration-500 animate-pulse"
        innerText={"Carregando Valores..."}
      />

      <ButtonLoading
        className="text-white bg-primary font-bold py-2 lg:py-4 text-sm xl:text-md w-full  rounded-lg shadow-lg hover:from-0% hover:scale-[1.03] 
                hover:bg-secondary hover:text-primary transition ease-in-out duration-300"
        innerText={"Carregando Agendamento..."}
      />
    </div>
  );
};

export default Servico;
