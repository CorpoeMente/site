'use client'
import React, { useState, useEffect } from 'react'
import { Modal } from '../Components'

const NovoServico = () => {
    const [nome, setNome] = useState('')
    const [type, setType] = useState('')
    const [descricao, setDescricao] = useState('')
    const [departamento, setDepartamento] = useState('')
    const [departamentos, setDepartamentos] = useState([])
    const [message, setMessage] = useState('')

    useEffect(() => {
        fetch('/api/departamentos')
            .then((res) => res.json())
            .then((res) => {
                if (res.error) {
                    alert(res.message)
                } else {
                    setDepartamentos(res.departamentos)
                }
            })
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()

        fetch('/api/servicos', {
            method: 'POST',
            body: JSON.stringify({
                nome,
                type,
                descricao,
                departamento,
            }),
        })
            .then((res) => res.json())
            .then((res) => {
                if (res.error) {
                    setMessage('Erro ao cadastrar serviço')
                } else {
                    setNome('')
                    setType('')
                    setDescricao('')
                    setDepartamento('')
                }
            })
    }

    return (
        <Modal
            buttonText={'Novo Serviço'}
            title={'Novo Serviço'}
            className={'w-auto p-2 !py-2 !text-sm !mt-0 mb-4 ms-auto'}
        >
            <div className="flex flex-col w-full mt-auto gap-y-8 items-center justify-center">
                <form onSubmit={handleSubmit}>
                    <fieldset>
                        <input
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            type="text"
                            placeholder="Nome"
                            className="w-full border-2 border-primary rounded-lg p-2 mb-4"
                            required
                        />
                        <textarea
                            value={descricao}
                            onChange={(e) => setDescricao(e.target.value)}
                            placeholder="Descrição"
                            className="w-full border-2 border-primary rounded-lg p-2 mb-4"
                            required
                        />
                        <select
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            className="w-full border-2 border-primary rounded-lg p-2 mb-4"
                            required
                        >
                            <option value="">Tipo</option>
                            <option value="servico">Serviço</option>
                            <option value="exame">Exame</option>
                        </select>
                        <select
                            value={departamento}
                            onChange={(e) => setDepartamento(e.target.value)}
                            className="w-full border-2 border-primary rounded-lg p-2 mb-4"
                            required
                        >
                            <option value="">Departamento</option>
                            {departamentos &&
                                departamentos.map((item, index) => (
                                    <option key={index} value={item._id}>
                                        {item.name}
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

export default NovoServico
