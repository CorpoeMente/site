'use client'
import React, { useState, useEffect } from 'react'
import { FaSearch, FaChevronRight, FaChevronLeft } from 'react-icons/fa'
import { PiSmileySad } from 'react-icons/pi'
import { ServicoLoading, Servico } from '.'

const Servicos = () => {
    const [search, setSearch] = useState('')
    const [filteredServicos, setFilteredServicos] = useState()
    const [page, setPage] = useState(0) // 6 servicos por pagina
    const [servicosPerPage, setServicosPerPage] = useState() // 6 servicos por pagina
    const [loading, setLoading] = useState(true)
    const [departamentos, setDepartamentos] = useState([])
    const [servicos, setServicos] = useState([])

    const [departamento, setDepartamento] = useState(null)

    function detectServicosPerPage() {
        if (window.innerWidth <= 1280 && window.innerWidth >= 1024) return 4
        if (window.innerWidth < 1024 && window.innerWidth > 800) return 2
        if (window.innerWidth <= 800) return 1
        return 6
    }

    const handleSearch = (e) => {
        setSearch(e.target.value)
        handleFilter(e.target.value, departamento)
    }

    const handleDepartamentoChange = (value) => {
        if (value === '-1') return setDepartamento(null)
        setDepartamento(value)
        handleFilter(search, value)
    }

    const handlePageChange = (value) => {
        if (
            page + value < 0 ||
            page + value >= filteredServicos.length / servicosPerPage
        )
            return
        setPage(value + page)
    }

    useEffect(() => {
        setServicosPerPage(detectServicosPerPage())

        fetch('/api/departamentos')
            .then((res) => res.json())
            .then((res) => {
                if (res.error) {
                    //
                } else {
                    setDepartamentos(res.departamentos)
                }
            })

        fetch('/api/servicos')
            .then((response) => response.json())
            .then((data) => {
                setServicos(data)
                setFilteredServicos(data)
                setLoading(false)
            })
    }, [])

    const handleFilter = (srch = null, dept = null) => {
        // Filtrar com pesquisa e departamento

        // Filtrar com pesquisa
        const filtered = servicos.filter(
            (servico) =>
                servico.nome.toLowerCase().includes(srch.toLowerCase()) ||
                servico.descricao.toLowerCase().includes(srch.toLowerCase())
        )
        console.log(dept)
        // Filtrar com departamento
        if (dept === null) return setFilteredServicos(filtered)
        const filtered2 = filtered.filter(
            (servico) => servico.departamento === dept.toLowerCase()
        )

        setFilteredServicos(filtered2)
    }

    const handleServicoColor = (departamento) => {
        // look for department in departments
        const dept = departamentos.find((dept) => dept._id === departamento)

        if (dept) return dept.color
    }

    return (
        <section
            id="servicos"
            className="w-screen flex flex-col items-center justify-start xl:px-[15%] py-[10%] relative h-auto"
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
                    {departamentos.map((departamento, index) => (
                        <option key={index} value={departamento.name}>
                            {departamento.name}
                        </option>
                    ))}
                </select>
            </form>

            <div className="relative grid grid-cols-1 place-items-center place-content-start md:grid-cols-2 xl:grid-cols-3 gap-8 mt-16 lg:mt-24 w-full sm:max-w-[90vw] lg:max-w-[70vw] xl:max-w-[80vw] 2xl:max-w-[75vw] w-screen">
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
                    <div className="absolute top-12 left-1/2 transform  -translate-x-1/2 flex flex-col items-center justify-center gap-4">
                        <PiSmileySad className="text-secondary text-4xl" />
                        <span className="text-secondary text-xl font-bold">
                            Nenhum serviço encontrado!
                        </span>
                        <p className="text-white text-md font-bold">
                            Veja se digitou tudo corretamente, ou tente utilizar
                            outro termo.
                        </p>
                    </div>
                ) : (
                    filteredServicos
                        .slice(
                            page * servicosPerPage,
                            page * servicosPerPage + servicosPerPage
                        )
                        .map((servico, index) => (
                            <Servico
                                color={handleServicoColor(servico.departamento)}
                                key={index}
                                servico={servico}
                                index={index}
                                servicosPerPage={servicosPerPage}
                            />
                        ))
                )}

                <FaChevronLeft
                    className={`text-white drop-shadow-[0px_0px_2px_rgba(0,0,0,0.2)] text-4xl cursor-pointer hover:text-secondary absolute left-4 lg:left-[-10%] top-1/2 transform -translate-y-1/2 ${
                        page === 0 && 'hidden'
                    }`}
                    onClick={() => handlePageChange(-1)}
                />
                <FaChevronRight
                    className={`text-white drop-shadow-[0px_0px_2px_rgba(0,0,0,0.2)] text-4xl cursor-pointer hover:text-secondary absolute right-4 top-1/2 lg:right-[-10%] transform -translate-y-1/2 -translate-y-1/2 ${
                        filteredServicos &&
                        (page + 1 >=
                            filteredServicos.length / servicosPerPage ||
                            filteredServicos.length <= 1) &&
                        'hidden'
                    }`}
                    onClick={() => handlePageChange(1)}
                />
            </div>
        </section>
    )
}

export default Servicos
