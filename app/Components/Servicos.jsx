"use client";
import React, { useState, useEffect } from "react";
import { FaSearch, FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { PiSmileySad } from "react-icons/pi";
import { ServicoLoading, Servico } from ".";

const Servicos = () => {
  const servicos = [
    {
      nome: "Psicoterapia",
      descricao:
        "A Psicoterapia é um tratamento psicológico que visa promover o autoconhecimento e o equilíbrio emocional, auxiliando no tratamento de diversos transtornos mentais.",
      departamento: "psicologia",
      type: "servico",
      valores: [
        {
          title: "Avulsa",
          price: 100,
        },
        {
          title: "Pacote 4 sessões",
          price: 320,
        },
      ],
      valorSocial: true,
    },
    {
      nome: "TCC (cognitivo comportamental)",
      descricao:
        "A Terapia Cognitivo-Comportamental é uma abordagem focada na solução de problemas, auxiliando no tratamento de diversos transtornos psicológicos.",
      departamento: "psicologia",
      type: "Exame",
      valores: [
        {
          title: "Avulsa",
          price: 100,
        },
        {
          title: "Pacote 4 sessões",
          price: 320,
        },
      ],
      valorSocial: true,
    },
    {
      nome: "Psicanalista",
      descricao:
        "A Psicanálise é uma abordagem profunda que busca compreender os processos mentais inconscientes, promovendo o autoconhecimento e a transformação pessoal.",
      departamento: "psicologia",
      type: "servico",
      valores: [
        {
          title: "Avulsa",
          price: 80,
        },
        {
          title: "Pacote 4 sessões",
          price: 320,
        },
      ],
      valorSocial: true,
    },
    {
      nome: "Psicopedagogia",
      descricao:
        "A Psicopedagogia visa auxiliar no desenvolvimento das habilidades cognitivas e emocionais, proporcionando um ambiente favorável ao aprendizado.",
      departamento: "psicologia",
      type: "servico",
      valores: false,
    },
    {
      nome: "Psiquiatria",
      descricao:
        "A Psiquiatria é uma especialidade médica que visa diagnosticar e tratar transtornos mentais, promovendo a saúde mental e o bem-estar.",
      departamento: "psicologia",
      type: "servico",
      valores: [
        {
          title: "Avulsa (Online)",
          price: 190,
        },
      ],
      valorSocial: false,
    },
    {
      nome: "Neuropsicologia",
      descricao:
        "Nossos neuropsicólogos utilizam abordagens inovadoras para avaliar e tratar distúrbios cognitivos relacionados ao sistema nervoso, promovendo a reabilitação neuropsicológica.",
      departamento: "neuropsicologia",
      type: "servico",
      valores: [
        {
          title: "Com a guia Amor Saúde",
          price: 1400,
        },
        {
          title: "Sem a guia Amor Saúde",
          price: 2000,
        },
        {
          title: "Sem a guia (parcelado)",
          price: 2300,
        },
      ],
      valorSocial: false,
    },
    {
      nome: "Psicologia da infância",
      descricao:
        "A psicologia da infância visa compreender e intervir nos aspectos psicológicos do desenvolvimento infantil, promovendo o equilíbrio emocional e comportamental.",
      departamento: "psicologia",
      type: "servico",
      valores: [
        {
          title: "Avulsa",
          price: 100,
        },
        {
          title: "Pacote 4 sessões",
          price: 320,
        },
      ],
      valorSocial: true,
    },
    {
      nome: "Psicoterapia infanto-juvenil",
      descricao:
        "A psicologia infanto-juvenil abrange a compreensão e o tratamento das questões emocionais e comportamentais em crianças e adolescentes, visando o desenvolvimento saudável.",
      departamento: "psicologia",
      type: "servico",
      valores: [
        {
          title: "Avulsa",
          price: 100,
        },
        {
          title: "Pacote 4 sessões",
          price: 320,
        },
      ],
      valorSocial: true,
    },
    {
      nome: "Terapeuta de casal e família",
      descricao:
        "A terapia de casal e família busca fortalecer os laços afetivos e resolver conflitos, promovendo relações saudáveis e harmoniosas.",
      departamento: "psicologia",
      type: "servico",
      valores: [
        {
          title: "Avulsa",
          price: 200,
        },
        {
          title: "Pacote 4 sessões",
          price: 650,
        },
      ],
      valorSocial: false,
    },
    {
      nome: "Parecer Psicológico",
      descricao:
        "O Parecer Psicológico é uma avaliação detalhada realizada por nossos psicólogos, fornecendo insights valiosos para diversas situações.",
      departamento: "psicologia",
      type: "exame",
      valores: [
        {
          title: "Avulsa",
          price: 250,
        },
      ],
      valorSocial: true,
    },
  ];

  const departamentos = ["neuropsicologia", "nutricao", "psicologia"];

  const [search, setSearch] = useState("");
  const [filteredServicos, setFilteredServicos] = useState(servicos);
  const [page, setPage] = useState(0); // 6 servicos por pagina
  const [servicosPerPage, setServicosPerPage] = useState(); // 6 servicos por pagina
  const [loading, setLoading] = useState(true);

  const [departamento, setDepartamento] = useState(null);

  function detectServicosPerPage() {
    if (window.innerWidth <= 1280 && window.innerWidth >= 1024) return 4;
    if (window.innerWidth < 1024 && window.innerWidth > 800) return 2;
    if (window.innerWidth <= 800) return 1;
    return 6;
  }

  const handleSearch = (e) => {
    setSearch(e.target.value);
    handleFilter(e.target.value, departamento);
  };

  const handleDepartamentoChange = (value) => {
    if (value === "-1") return setDepartamento(null);
    setDepartamento(departamentos[value]);
    handleFilter(search, departamentos[value]);
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
    setLoading(false);
  }, []);

  const handleFilter = (srch = null, dept = null) => {
    // Filtrar com pesquisa e departamento

    // Filtrar com pesquisa
    const filtered = servicos.filter(
      (servico) =>
        servico.nome.toLowerCase().includes(srch.toLowerCase()) ||
        servico.descricao.toLowerCase().includes(srch.toLowerCase())
    );

    // Filtrar com departamento
    if (dept === null) return setFilteredServicos(filtered);
    const filtered2 = filtered.filter(
      (servico) => servico.departamento === dept
    );

    setFilteredServicos(filtered2);
  };

  return (
    <section
      id="servicos"
      className="w-screen flex flex-col items-center justify-start xl:px-[15%] py-[2%] relative h-auto min-h-[120vh] lg:min-h-[150vh] min-[2560px]:min-h-[100vh] min-[2560px]:h-[100vh]"
    >
      <img
        src="/fundo-preto-e-branco-ondulado.jpg"
        className="absolute w-full h-full top-0 left-0 opacity-[8%] bg-cover object-top object-cover bg-center pointer-events-none"
        id="bg-servicos"
      />
      <h3 className="text-lg xl:text-xl -mb-2 font-bold text-secondary drop-shadow-[0px_0px_2px_rgba(200,222,255,0.4)] drop-shadow-lg mt-8 lg:mt-0">
        Solicite seu Agendamento
      </h3>
      <h2 className="text-3xl xl:text-5xl  font-bold text-white drop-shadow-[0px_0px_2px_rgba(200,222,255,0.4)] mb-8 lg:mb-20">
        Serviços e Exames
      </h2>

      <form className="flex flex-col gap-y-8 gap-x-8 lg:flex-row items-center justify-center max-w-[80vw]">
        <div className="relative group flex max-w-[90vw] lg:max-w-[70%]">
          <FaSearch className="absolute left-8 top-1/2 transform -translate-y-1/2 text-white text-2xl cursor-pointer group-hover:text-secondary" />
          <input
            type="text"
            placeholder="Pesquisar Serviço"
            value={search}
            onChange={handleSearch}
            className="peer rounded-lg border-b-2 border-white ps-20 py-2 text-md md:text-lg xl:text-xl font-bold text-white bg-[#ffffff00] w-[1200px] focus:text-white focus:shadow-[0_0px_12px_4px_rgba(89,182,222,0.5)] focus:border-secondary outline-none transition duration-300 ease-in-out"
          />
        </div>
        <select
          name="departamentos"
          className="w-[90vw] lg:w-50 bg-[#ffffff00] rounded-lg border-b-2 border-white text-md md:text-lg xl:text-xl text-white font-bold  outline-none transition duration-300 ease-in-out p-2  cursor-pointer z-10 relative focus:shadow-[0_0px_12px_4px_rgba(89,182,222,0.5)]"
          onChange={(e) => handleDepartamentoChange(e.target.value)}
        >
          <option defaultValue={-1}>Departamento</option>
          <option value="0">Neuropsicologia</option>
          <option value="1">Nutrição</option>
          <option value="2">Psicologia</option>
        </select>
      </form>

      <div className="relative grid grid-cols-1 place-items-center place-content-start md:grid-cols-2 xl:grid-cols-3 gap-8 mt-16 lg:mt-24 w-full sm:max-w-[90vw] lg:max-w-[70vw] xl:max-w-[80vw] 2xl:max-w-[75vw] w-screen h-[500px] md:h-[1040px]">
        <img
          src="/dots-2.svg"
          className="hidden lg:block absolute left-[-12px] top-[-36px] pointer-events-none"
        />
        <img
          src="/dots-2.svg"
          className="hidden lg:block absolute right-[-12px] bottom-[-36px] pointer-events-none"
        />
        {loading ? (
          [...Array(1)].map((_, index) => (
            <ServicoLoading key={index} index={index} />
          ))
        ) : filteredServicos.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-4">
            <PiSmileySad className="text-secondary text-4xl" />
            <span className="text-secondary text-xl font-bold">
              Nenhum serviço encontrado
            </span>
          </div>
        ) : (
          filteredServicos
            .slice(
              page * servicosPerPage,
              page * servicosPerPage + servicosPerPage
            )
            .map((servico, index) => (
              <Servico
                key={index}
                servico={servico}
                index={index}
                servicosPerPage={servicosPerPage}
              />
            ))
        )}

        <FaChevronLeft
          className={`text-white drop-shadow-[0px_0px_2px_rgba(0,0,0,0.2)] text-4xl cursor-pointer hover:text-secondary absolute left-4 lg:left-[-10%] top-1/2 transform -translate-y-1/2 ${
            page === 0 && "hidden"
          }`}
          onClick={() => handlePageChange(-1)}
        />
        <FaChevronRight
          className={`text-white drop-shadow-[0px_0px_2px_rgba(0,0,0,0.2)] text-4xl cursor-pointer hover:text-secondary absolute right-4 top-1/2 lg:right-[-10%] transform -translate-y-1/2 -translate-y-1/2 ${
            (page + 1 >= filteredServicos.length / servicosPerPage ||
              filteredServicos.length <= 1) &&
            "hidden"
          }`}
          onClick={() => handlePageChange(1)}
        />
      </div>
    </section>
  );
};

export default Servicos;
