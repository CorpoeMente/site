import React from "react";
import { Curriculo } from ".";
const profissionais = [
  {
    nome: "Profissional de Neuropsicologia",
    cargo: "Neuropsicólogo e Psicólogo",
    imagem: "/Vagner.jpg",
    descricao:
      "Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit.",
    curriculo: [
      {
        date: "2018 - 2020",
        title: "Graduação em Psicologia",
        text: "Universidade Federal de Santa Catarina (UFSC)",
      },
      {
        date: "2020 - 2022",
        title: "Pós-graduação em Neuropsicologia",
        text: "Universidade Federal de Santa Catarina (UFSC)",
      },
    ],
  },
  {
    nome: "Profissional de Psicologia",
    imagem: "/Thayane.jpg",
    cargo: "Psicólogo",
    descricao:
      "Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit.",
    curriculo: [
      {
        date: "2018 - 2020",
        title: "Graduação em Psicologia",
        text: "Universidade Federal de Santa Catarina (UFSC)",
      },
      {
        date: "2020 - 2022",
        title: "Pós-graduação em Neuropsicologia",
        text: "Universidade Federal de Santa Catarina (UFSC)",
      },
    ],
  },
  {
    nome: "Profissional de Nutricionismo",
    imagem: "",
    cargo: "Nutricionista",
    descricao:
      "Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit.",
    curriculo: [
      {
        date: "2018 - 2020",
        title: "Graduação em Nutrição",
        text: "Universidade Federal de Santa Catarina (UFSC)",
      },
      {
        date: "2020 - 2022",
        title: "Pós-graduação em Nutrição Clínica",
        text: "Universidade Federal de Santa Catarina (UFSC)",
      },
    ],
  },
];
const Profissional = ({ departamento }) => {
  return (
    <div
      className="w-full max-w-[80vw] flex flex-col lg:flex-row items-center justify-center h-[800px] lg:h-[800px] mt-16 rounded-xl card-shadow relative self-center"
      id="profissional"
    >
      <img
        src="./dots.svg"
        className="absolute top-[-12%] right-[-7%] pointer-events-none"
      />
      <div
        className="w-full h-1/2 lg:h-full lg:w-1/2 lg:rounded-l-xl lg:rounded-r-none rounded-t-xl  relative z-10 object-cover object-top bg-top lg:object-center  no-repeat bg-cover bg-no-repeat lg:bg-center z-10"
        style={{
          backgroundImage: `url(${profissionais[departamento].imagem})`,
        }}
      ></div>
      <div className="flex flex-col lg:items-end lg:justify-start lg:w-1/2 h-full p-8 bg-white border-[1px] border-[#f4f4f4] rounded-b-xl lg:rounded-r-xl z-10">
        <h1 className="text-[#606060] text-2xl xl:text-4xl font-bold mb-2">
          {profissionais[departamento].nome}
        </h1>
        <span className="text-primary text-lg xl:text-xl mb-8">
          {profissionais[departamento].cargo}
        </span>
        <p className="lg:max-w-[85%] lg:text-right text-sm lg:text-md xl:text-xl mb-8">
          {profissionais[departamento].descricao}
        </p>

        <Curriculo profissional={profissionais[departamento]} />
      </div>
    </div>
  );
};

export default Profissional;
