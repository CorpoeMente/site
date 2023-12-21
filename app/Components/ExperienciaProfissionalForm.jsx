'use client'
import React, { useState } from 'react'

const ExperienciaProfissionalForm = ({ curriculo, setCurriculo }) => {
    const addExperienciaProfissional = () => {
        setCurriculo([...curriculo, {}])
    }

    const removeExperienciaProfissional = (index) => {
        const newExperienciasProfissionais = [...curriculo]
        newExperienciasProfissionais.splice(index, 1)
        setCurriculo(newExperienciasProfissionais)
    }

    const handleChange = (index, event) => {
        const newExperienciasProfissionais = [...curriculo]
        newExperienciasProfissionais[index][event.target.name] =
            event.target.value
        setCurriculo(newExperienciasProfissionais)
    }

    const renderExperienciasProfissionais = () => {
        return curriculo.map((experienciaProfissional, index) => {
            return (
                <div className="flex flex-col w-full" key={index}>
                    <input
                        type="text"
                        name="title"
                        placeholder="Título / Cargo / Formação"
                        className="w-full border-2 border-primary rounded-lg p-2 mb-4"
                        onChange={(event) => handleChange(index, event)}
                    />

                    <input
                        type="text"
                        name="text"
                        placeholder="Instituição"
                        className="w-full border-2 border-primary rounded-lg p-2 mb-4"
                        onChange={(event) => handleChange(index, event)}
                    />

                    <input
                        type="text"
                        name="date"
                        placeholder="Data (Ex: 2010 - 2015)"
                        className="w-full border-2 border-primary rounded-lg p-2 mb-4"
                        onChange={(event) => handleChange(index, event)}
                    />
                    <button
                        type="button"
                        className="bg-[#f00] text-white py-1 px-3 rounded my-4 self-end"
                        onClick={() => removeExperienciaProfissional(index)}
                    >
                        Remover
                    </button>
                </div>
            )
        })
    }

    return (
        <div className="flex flex-col items-center justify-center w-full">
            <h2 className="text-center text-primary font-bold text-lg mt-8">
                Curriculo
            </h2>
            <button
                className="bg-primary text-white py-1 px-3 rounded my-4 self-end"
                type="button"
                onClick={() => addExperienciaProfissional()}
            >
                Adicionar Experiência Profissional
            </button>
            {renderExperienciasProfissionais()}
        </div>
    )
}

export default ExperienciaProfissionalForm
