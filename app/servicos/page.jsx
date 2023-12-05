"use client";
import React, { useState, useEffect } from "react";
import { FaSearch, FaChevronRight, FaChevronLeft } from "react-icons/fa";
const Page = () => {
  const servicos = [
    {
      nome: "Terapia ABA (terapia do autismo)",
      descricao:
        "Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit.",
    },
    {
      nome: "TCC (cognitivo comportamental)",
      descricao:
        "Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit.",
    },
    {
      nome: "Psicanalista",
      descricao:
        "Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit.",
    },
    {
      nome: "Psicopedagogia",
      descricao:
        "Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit.",
    },
    {
      nome: "Neuropsicologia (avaliação neuropsicológica)",
      descricao:
        "Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit.",
    },
    {
      nome: "Psicóloga da infância",
      descricao:
        "Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit.",
    },
    {
      nome: "Psicóloga infanto-juvenil",
      descricao:
        "Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit.",
    },
    {
      nome: "Terapeuta de casal e família",
      descricao:
        "Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit.",
    },
    {
      nome: "Parecer psicológico (atestado) para: laqueadura, bariátrica, vasectomia…",
      descricao:
        "Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit.",
    },
    {
      nome: "Terapia ocupacional",
      descricao:
        "Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit.",
    },
    {
      nome: "Fonoaudiologia",
      descricao:
        "Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit.",
    },
    {
      nome: "Nutricionista",
      descricao:
        "Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit.",
    },
  ];

  var colors = [
    "light-blue",
    "purple",
    "light-purple",
    "pink",
    "orange",
    "green",
  ];

  const [search, setSearch] = useState("");
  const [filteredServicos, setFilteredServicos] = useState(servicos);
  const [page, setPage] = useState(0); // 6 servicos por pagina
  const [servicosPerPage, setServicosPerPage] = useState(); // 6 servicos por pagina

  function detectServicosPerPage() {
    if (window.innerWidth <= 1580 && window.innerWidth >= 750) return 4;
    if (window.innerWidth < 750) return 1;

    return 6;
  }

  const handleSearch = (e) => {
    setSearch(e.target.value);

    const filtered = servicos.filter(
      (servico) =>
        servico.nome.toLowerCase().includes(e.target.value.toLowerCase()) ||
        servico.descricao.toLowerCase().includes(e.target.value.toLowerCase())
    );

    setFilteredServicos(filtered);
  };

  const handlePageChange = (value) => {
    if (
      page + value < 0 ||
      page + value >= filteredServicos.length / servicosPerPage
    )
      return;
    setPage(value + page);
  };

  useEffect(() => {
    setServicosPerPage(detectServicosPerPage());
  }, []);

  return (
    <section
      id="servicos"
      className="w-screen flex flex-col items-center justify-between xl:px-[15%] py-[12%] relative min-h-screen"
    >
      <img
        src="/fundo-preto-e-branco-ondulado.jpg"
        className="absolute w-full h-full top-0 left-0 opacity-10 bg-cover object-top object-cover bg-center"
        id="bg-servicos"
      />
      <h2 className="text-4xl xl:text-7xl font-urbanist font-bold text-white drop-shadow-[0_4px_1px_rgba(0,0,0,0.35)] mb-32">
        Serviços e Exames
      </h2>

      <form action="">
        <div className="relative group flex max-w-[80vw]">
          <input
            type="text"
            placeholder="Pesquisar Serviço"
            value={search}
            onChange={handleSearch}
            className="border-b-2 border-white ps-4 py-2 text-xl font-bold text-white bg-[#ffffff00] w-[1200px] group-hover:text-secondary"
          />

          <FaSearch className="absolute right-8 top-5 transform -translate-y-1/2 text-white text-2xl cursor-pointer group-hover:text-secondary" />
        </div>
      </form>

      <div className="flex flex-wrap items-center justify-center gap-8 relative mt-24 min-h-[420x] md:min-h-[880px] w-full sm:max-w-[80vw] !md:max-w-screen w-screen">
        <img src="/dots-2.svg" className="absolute left-[-40px] top-[-40px]" />
        <img
          src="/dots-2.svg"
          className="absolute right-[-40px] bottom-[-40px]"
        />
        {filteredServicos
          .slice(
            page * servicosPerPage,
            page * servicosPerPage + servicosPerPage
          )
          .map((servico, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-start gap-8 max-w-[280px] lg:max-w-[400px] bg-white rounded-xl shadow-xl p-8 text-center w-full min-h-[400px] relative"
            >
              <div className={`bg-${colors[index]} w-36 h-36 rounded-lg`}></div>

              <h4 className="font-bold text-xl font-urbanist">
                {servico.nome}
              </h4>

              <p>{servico.descricao}</p>
            </div>
          ))}
        <FaChevronLeft
          className={`text-white text-4xl cursor-pointer hover:text-secondary absolute left-0 top-1/2 transform -translate-y-1/2 ${
            page === 0 && "hidden"
          }`}
          onClick={() => handlePageChange(-1)}
        />
        <FaChevronRight
          className={`text-white text-4xl cursor-pointer hover:text-secondary absolute right-0 top-1/2 transform -translate-y-1/2 ${
            page + 1 === filteredServicos.length / servicosPerPage && "hidden"
          }`}
          onClick={() => handlePageChange(1)}
        />
      </div>
    </section>
  );
};

export default Page;
