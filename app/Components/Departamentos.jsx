'use client'
import React, { useState, useEffect } from 'react'
import { DepartamentoSelector, DepartamentosLoading, Profissional } from '.'

const Departamentos = () => {
    const [active, setActive] = useState(0)
    const [deps, setDeps] = useState([])

    useEffect(() => {
        getDepartamentos()
    }, [])

    const getDepartamentos = () => {
        fetch('/api/departamentos')
            .then((res) => res.json())
            .then((res) => {
                if (res.error) {
                } else {
                    setDeps(
                        res.departamentos.sort((a, b) => {
                            if (a.name === 'Em Breve') return 1
                            if (b.name === 'Em Breve') return -1
                            return 0
                        })
                    )
                    setActive(res.departamentos[0]._id)
                }
            })
    }

    const getDepartamento = (id) => {
        return deps.find((dep) => dep._id === id)
    }

    const getResponsavel = (id) => {
        var dep = getDepartamento(id)
        if (!dep) return null
        return dep.responsavel
    }

    return (
        <section
            className="w-screen bg-white flex flex-col items-center justify-center px-[10%] xl:px-[15%] py-[48px] relative"
            id="departamentos"
        >
            <div className="flex flex-col items-start w-full max-w-[90vw] sm:!max-w-[1900px]">
                <h1 className="text-primary self-center md:self-start text-3xl xl:text-4xl font-bold mb-4">
                    Quem Somos?
                </h1>
                <span className="w-full xl:w-[50%] mb-12 text-lg">
                    O Espaço Clínico Corpo e Mente oferece atendimentos nas
                    áreas de psicologia, psicopedagogia, neuropsicologia,
                    fonoaudiologia e nutrição. Conta com uma equipe de
                    profissionais acolhedores e de muita competência técnica.
                    Atende crianças, adolescentes, adultos e idosos. Conheça
                    nossa equipe abaixo:
                </span>

                {deps && deps.length > 0 ? (
                    <DepartamentoSelector
                        deps={deps}
                        active={active}
                        setActive={setActive}
                    />
                ) : (
                    <DepartamentosLoading />
                )}

                <Profissional profissional={getResponsavel(active)} />
            </div>
        </section>
    )
}

export default Departamentos
