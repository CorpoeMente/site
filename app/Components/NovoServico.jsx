'use client'
import React, { useState, useEffect } from 'react'
import { Modal, ValorServicoForm } from '../Components'

const NovoServico = () => {
    const [nome, setNome] = useState('')
    const [type, setType] = useState('')
    const [descricao, setDescricao] = useState('')
    const [departamento, setDepartamento] = useState('')
    const [departamentos, setDepartamentos] = useState([])
    const [valores, setValores] = useState([])
    const [message, setMessage] = useState('')
    const [valorSocial, setValorSocial] = useState(false)

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
                valores,
                valorSocial,
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
                    setValores([])
                    setValorSocial(false)
                    window.location.reload()
                }
            })
    }

    return (
        <Modal
            buttonText={'Novo Serviço'}
            title={'Novo Serviço'}
            className="!mt-0 self-end mb-2 !py-2 !px-4 font-normal dark:bg-transparent dark:border-[1px] dark:border-[#fff] hover:dark:bg-[#202020] hover:dark:text-white hover:dark:scale-100"
        >
            <div className="flex flex-col w-full mt-auto gap-y-8 items-center justify-center">
                <form onSubmit={handleSubmit}>
                    <fieldset>
                        <input
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            type="text"
                            placeholder="Nome"
                            className="w-full dark:bg-black dark:text-white border-2 border-primary rounded-lg p-2 mb-4"
                            required
                        />
                        <textarea
                            value={descricao}
                            onChange={(e) => setDescricao(e.target.value)}
                            placeholder="Descrição"
                            className="w-full dark:bg-black dark:text-white border-2 border-primary rounded-lg p-2 mb-4"
                            required
                        />
                        <select
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            className="w-full dark:bg-black dark:text-white border-2 border-primary rounded-lg p-2 mb-4"
                            required
                        >
                            <option value="">Tipo</option>
                            <option value="servico">Serviço</option>
                            <option value="exame">Exame</option>
                        </select>
                        <select
                            value={departamento}
                            onChange={(e) => setDepartamento(e.target.value)}
                            className="w-full dark:bg-black dark:text-white border-2 border-primary rounded-lg p-2 mb-4"
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

                        <div className="flex items-center justify-start gap-x-4 my-4">
                            <label>Valor Social:</label>
                            <input
                                type="checkbox"
                                value={valorSocial}
                                onChange={(e) => setValorSocial(e.target.value)}
                                className="border-2 border-primary rounded-lg p-2"
                            />
                        </div>
                        <ValorServicoForm
                            valores={valores}
                            setValores={setValores}
                        />
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
