'use client'
import React, { useState, useEffect } from 'react'

const ValorServicoForm = ({ valores, setValores }) => {
    const addValor = () => {
        setValores([...valores, {}])
    }

    const removeValor = (index) => {
        const newValorServico = [...valores]
        newValorServico.splice(index, 1)
        setValores(newValorServico)
    }

    const handleChange = (index, event) => {
        const newValorServico = [...valores]
        newValorServico[index][event.target.name] = event.target.value
        setValores(newValorServico)
    }

    const renderValorServico = () => {
        return valores.map((valorServico, index) => {
            return (
                <div
                    className="flex flex-col w-full dark:!text-white"
                    key={index}
                >
                    <input
                        type="text"
                        name="title"
                        placeholder="Titulo do serviço"
                        className="w-full dark:bg-black border-2 border-primary rounded-lg p-2 mb-4"
                        onChange={(event) => handleChange(index, event)}
                        value={valorServico.title}
                    />

                    <input
                        type="number"
                        name="price"
                        step="0.01"
                        placeholder="Valor"
                        className="w-full dark:bg-black border-2 border-primary rounded-lg p-2 mb-4"
                        onChange={(event) => handleChange(index, event)}
                        value={valorServico.price}
                    />

                    <button
                        type="button"
                        className="bg-[#f00] text-white py-1 px-3 rounded my-4 self-end"
                        onClick={() => removeValor(index)}
                    >
                        Remover
                    </button>
                </div>
            )
        })
    }

    useEffect(() => {
        if (valores.length > 0) {
            renderValorServico()
        }
    }, [])

    return (
        <div className="flex flex-col items-center justify-center w-full">
            <h2 className="text-center text-primary dark:text-white font-bold text-lg mt-8">
                Valores
            </h2>
            <button
                className="bg-primary text-white py-1 px-3 rounded my-4 self-end"
                type="button"
                onClick={() => addValor()}
            >
                Adicionar Valor
            </button>
            {renderValorServico()}
        </div>
    )
}

export default ValorServicoForm
