'use client'
import React, { useState, useEffect } from 'react'
import { Modal } from '../Components'
import { FaPencil } from 'react-icons/fa6'

const EditarDepartamento = ({ departamento }) => {
    const [name, setName] = useState(departamento.name)
    const [color, setColor] = useState(departamento.color)
    const [message, setMessage] = useState('')
    const [profissionais, setProfissionais] = useState([])
    const [responsavel, setResponsavel] = useState(
        departamento.responsavel?._id
    )

    useEffect(() => {
        fetch('/api/profissionais')
            .then((res) => res.json())
            .then((res) => {
                if (res.error) {
                    //
                } else {
                    setProfissionais(res)
                }
            })
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()

        fetch('/api/departamentos', {
            method: 'PUT',
            body: JSON.stringify({
                id: departamento._id,
                name,
                color,
                responsavel,
            }),
        })
            .then((res) => res.json())
            .then((res) => {
                if (res.error) {
                    setMessage('Erro ao cadastrar departamento')
                } else {
                    window.location.reload()
                }
            })
    }

    return (
        <Modal
            buttonText={<FaPencil />}
            title={'Editar Departamento'}
            className="
            dark:!text-white !text-[#f8be00] !p-0 !m-0 !rounded-md !bg-transparent !text-md hover:scale-110 transition duration-300 ease-in-out"
        >
            <div className="flex flex-col w-full mt-auto gap-y-8 items-center justify-center">
                <form onSubmit={handleSubmit} className="w-2/3">
                    <fieldset>
                        <label
                            htmlFor="name"
                            className="text-primary font-bold dark:text-white"
                        >
                            Nome
                        </label>
                        <input
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Nome"
                            className="w-full border-2 border-primary rounded-lg p-2 mb-4 dark:bg-black dark:text-white"
                            type="text"
                        />
                        <div className="w-full mb-4 flex-col items-start justify-center">
                            <label
                                htmlFor="color"
                                className="text-primary font-bold dark:text-white"
                            >
                                Cor
                            </label>
                            <div className="flex h-10 overflow-hidden items-center justify-center rounded-lg">
                                <input
                                    value={color}
                                    name="color"
                                    onChange={(e) => setColor(e.target.value)}
                                    placeholder="Cor"
                                    className="h-11 border-none rounded-l-lg"
                                    type="color"
                                />
                                <input
                                    value={color}
                                    name="color"
                                    onChange={(e) => setColor(e.target.value)}
                                    placeholder="Cor"
                                    className="w-full h-10 border-none rounded-r-lg dark:bg-black dark:text-white"
                                    type="text"
                                />
                            </div>
                        </div>
                        {/* <label htmlFor="img" className="text-primary font-bold dark:text-white">
                            Imagem
                        </label> 
                        <input
                            name="img"
                            value={img}
                            onChange={(e) => setImg(e.target.value)}
                            placeholder="Link da Imagem"
                            className="w-full border-2 border-primary rounded-lg p-2 mb-4 dark:bg-black dark:text-white"
                            type="text"
                        /> */}
                        <label
                            htmlFor="responsavel"
                            className="text-primary font-bold dark:text-white"
                        >
                            Responsável
                        </label>
                        <select
                            name="responsavel"
                            id="responsavel"
                            className="w-full border-2 border-primary rounded-lg p-2 mb-4 dark:bg-black dark:text-white"
                            value={responsavel}
                            onChange={(e) => setResponsavel(e.target.value)}
                        >
                            <option value="">Responsável</option>

                            {profissionais &&
                                profissionais.map((profissional) => (
                                    <option
                                        key={profissional._id}
                                        value={profissional._id}
                                    >
                                        {profissional.nome}
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

export default EditarDepartamento
