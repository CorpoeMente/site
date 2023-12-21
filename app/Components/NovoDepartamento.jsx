'use client'
import React, { useState, useEffect } from 'react'
import { Modal } from '../Components'

const NovoDepartamento = () => {
    const [name, setName] = useState('')
    const [color, setColor] = useState('')
    const [img, setImg] = useState('')
    const [message, setMessage] = useState('')
    const [responsavel, setResponsavel] = useState('')
    const [profissionais, setProfissionais] = useState([])

    useEffect(() => {
        fetch('/api/profissionais')
            .then((res) => res.json())
            .then((res) => {
                if (res.error) {
                    //
                } else {
                    setProfissionais(res.profissionais)
                }
            })
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()

        fetch('/api/departamentos', {
            method: 'POST',
            body: JSON.stringify({
                name,
                color,
                img,
            }),
        })
            .then((res) => res.json())
            .then((res) => {
                if (res.error) {
                    setMessage('Erro ao cadastrar departamento')
                } else {
                    setName('')
                    setColor('')
                    setImg('')
                }
            })
    }

    return (
        <Modal
            buttonText={'Novo Departamento'}
            title={'Novo Departamento'}
            className={'w-auto p-2 !py-2 !text-sm !mt-0 mb-4 ms-auto'}
        >
            <div className="flex flex-col w-full mt-auto gap-y-8 items-center justify-center">
                <form onSubmit={handleSubmit} className="w-2/3">
                    <fieldset>
                        <label
                            htmlFor="name"
                            className="text-primary font-bold"
                        >
                            Nome
                        </label>
                        <input
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Nome"
                            className="w-full border-2 border-primary rounded-lg p-2 mb-4"
                            type="text"
                        />
                        <div className="w-full mb-4 flex-col items-start justify-center">
                            <label
                                htmlFor="color"
                                className="text-primary font-bold"
                            >
                                Cor
                            </label>
                            <div className="flex items-center justify-center border border-primary rounded-lg">
                                <input
                                    value={color}
                                    name="color"
                                    onChange={(e) => setColor(e.target.value)}
                                    placeholder="Cor"
                                    className="h-10 border-none"
                                    type="color"
                                />
                                <input
                                    value={color}
                                    name="color"
                                    onChange={(e) => setColor(e.target.value)}
                                    placeholder="Cor"
                                    className="w-full p-2 border-none rounded-lg"
                                    type="text"
                                />
                            </div>
                        </div>
                        <label htmlFor="img" className="text-primary font-bold">
                            Imagem
                        </label>
                        <input
                            name="img"
                            value={img}
                            onChange={(e) => setImg(e.target.value)}
                            placeholder="Link da Imagem"
                            className="w-full border-2 border-primary rounded-lg p-2 mb-4"
                            type="text"
                        />
                        <label
                            htmlFor="responsavel"
                            className="text-primary font-bold"
                        >
                            Responsável
                        </label>
                        <select
                            name="responsavel"
                            id="responsavel"
                            className="w-full border-2 border-primary rounded-lg p-2 mb-4"
                            value={responsavel}
                            onChange={(e) => setResponsavel(e.target.value)}
                        >
                            {profissionais &&
                                profissionais.map((profissional) => (
                                    <option
                                        key={profissional.id}
                                        value={profissional.id}
                                    >
                                        {profissional.name}
                                    </option>
                                ))}
                        </select>
                    </fieldset>
                    <button
                        type="submit"
                        className="w-full bg-primary text-white rounded-lg p-2 mb-4"
                    >
                        Cadastrar
                    </button>
                </form>
            </div>
        </Modal>
    )
}

export default NovoDepartamento
