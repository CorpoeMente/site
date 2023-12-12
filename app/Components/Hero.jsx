"use client";
import React from "react";

// create a fetch post to create an admin user

const Hero = () => {
  return (
    <section className="w-screen h-screen flex items-start  justify-between xl:px-[15%] py-[120px] xl:py-[15%] relative">
      <img
        src="/background.webp"
        className="absolute top-0 left-0 h-screen -z-10 bg-contain bg-center pointer-events-none"
      />
      <div className="relative flex flex-col items-center  xl:items-start justify-end w-full 2xl:w-1/2 gap-12 px-[10%] 2xl:px-[0] h-[110%] 2xl:h-auto slide-bottom z-40">
        <h1 className="text-4xl lg:text-6xl w-full lg:w-3/4 xl:w-full  font-black text-white text-center xl:text-start drop-shadow-[0_4px_1px_rgba(0,0,0,0.35)]">
          Cuidar do <span className="text-secondary">Corpo</span> e
          <span className="text-secondary"> Mente</span> em um só lugar
        </h1>

        <p className="text-center w-full sm:w-2/3 text-white  font-regular text-lg xl:text-xl drop-shadow-[0_4px_1px_rgba(0,0,0,0.35)] xl:w-3/4 xl:text-start">
          Encontre equilíbrio e bem-estar através de cuidados especializados em
          <span className="text-secondary font-semibold">
            {" "}
            psicologia, neuropsicologia e nutrição
          </span>
          . Nossa clínica oferece um ambiente acolhedor para apoiar você em sua
          jornada de autocuidado.
        </p>

        <div className="flex flex-col lg:flex-row items-start gap-12 w-full lg:w-[80%]">
          <a
            href="#contato"
            className="bg-secondary text-white py-4 rounded-xl font-bold cursor-pointer hover:scale-110 w-full xl:w-72 text-center"
          >
            Entre em Contato
          </a>
          <a
            href="#servicos"
            className="border-secondary border text-white py-4  rounded-xl font-bold cursor-pointer hover:bg-secondary w-full xl:w-72 text-center"
          >
            Conheça Nossos Serviços
          </a>
        </div>
      </div>

      <img
        src="/logo-white.svg"
        alt=""
        className="opacity-[0.4] pointer-events-none w-2/3 transform translate-x-[-47%] left-1/2 absolute top-[15%] 2xl:top-[15%] 2xl:right-0 2xl:-translate-x-[5%] 2xl:w-2/3 max-w-[800px] drop-shadow-[0_4px_1px_rgba(0,0,0,0.35)] slide-left"
      />
    </section>
  );
};

export default Hero;
