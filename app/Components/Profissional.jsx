import React from "react";
import { Curriculo } from ".";
const profissionais = [
  {
    nome: "Profissional de Neuropsicologia",
    cargo: "Neuropsicólogo e Psicólogo",
    imagem:
      "https://media-gig4-1.cdn.whatsapp.net/v/t61.24694-24/209605740_946893555875123_5389400469944571154_n.jpg?ccb=11-4&oh=01_AdQX94evdAZLxoHq5qlSWsXDHYKoUdGSunJFKuX8wJSAUA&oe=6574D7C5&_nc_sid=e6ed6c&_nc_cat=102",
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
    imagem:
      "https://media-gig4-1.cdn.whatsapp.net/v/t61.24694-24/209605740_946893555875123_5389400469944571154_n.jpg?ccb=11-4&oh=01_AdQX94evdAZLxoHq5qlSWsXDHYKoUdGSunJFKuX8wJSAUA&oe=6574D7C5&_nc_sid=e6ed6c&_nc_cat=102",
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
    nome: "Profissional de Nutricionismo)",
    imagem:
      "https://media-gig4-1.cdn.whatsapp.net/v/t61.24694-24/209605740_946893555875123_5389400469944571154_n.jpg?ccb=11-4&oh=01_AdQX94evdAZLxoHq5qlSWsXDHYKoUdGSunJFKuX8wJSAUA&oe=6574D7C5&_nc_sid=e6ed6c&_nc_cat=102",
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
    <div className="w-full max-w-[80vw] flex flex-col lg:flex-row items-center justify-center h-[800px] lg:h-[600px] mt-16 rounded-xl card-shadow relative z-10 self-center">
      <img
        src="./dots.svg"
        className="absolute -z-100 top-[-12%] right-[-7%]"
      />
      <div className="bg-[#a0a0a0] w-full h-full lg:w-1/2 lg:rounded-l-xl lg:rounded-r-none rounded-t-xl"></div>
      <div className="flex flex-col lg:items-end lg:justify-start lg:w-1/2 h-full p-8 relative z-10 bg-white border-[1px] border-[#f4f4f4] rounded-r-xl">
        <h1 className="text-[#606060] text-4xl font-urbanist mb-2 ">
          {profissionais[departamento].nome}
        </h1>
        <span className="text-primary text-xl font-urbanist font-bold mb-8">
          {profissionais[departamento].cargo}
        </span>
        <p className="lg:max-w-[85%] lg:text-right text-md lg:text-lg xl:text-xl">
          {profissionais[departamento].descricao}
        </p>

        <Curriculo profissional={profissionais[departamento]} />
      </div>
    </div>
  );
};

export default Profissional;
