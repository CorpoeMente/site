'use client'
import React, { useState, useEffect } from 'react'
import { Modal, ValorServicoForm } from '../Components'
import { FaPencil } from 'react-icons/fa6'
const EditarServico = ({ servico }) => {
    const [nome, setNome] = useState(servico.nome)
    const [type, setType] = useState(servico.type)
    const [descricao, setDescricao] = useState(servico.descricao)
    const [departamento, setDepartamento] = useState(servico.departamento)
    const [departamentos, setDepartamentos] = useState([])
    const [valores, setValores] = useState(servico.valores || [])
    const [valorSocial, setValorSocial] = useState(servico.valorSocial || false)
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
            method: 'PUT',
            body: JSON.stringify({
                id: servico._id,
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
                    window.location.reload()
                }
            })
    }

    return (
        <Modal
            buttonText={<FaPencil />}
            title={'Editar Serviço'}
            className={
                'w-auto !p-2 !text-lg !bg-[#f4b804] hover:bg-[#e4a800] hover:color-[#000]'
            }
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
                                departamentos.map((item, index) =>
                                    item._id === departamento ? (
                                        <option
                                            key={index}
                                            value={item._id}
                                            selected
                                        >
                                            {item.name}
                                        </option>
                                    ) : (
                                        <option key={index} value={item._id}>
                                            {item.name}
                                        </option>
                                    )
                                )}
                        </select>
                        <div className="flex items-center justify-start gap-x-4 my-4">
                            <label>Valor Social:</label>
                            <input
                                type="checkbox"
                                checked={valorSocial}
                                onChange={(e) =>
                                    setValorSocial(valorSocial ? false : true)
                                }
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
                        Salvar
                    </button>
                </form>
            </div>
        </Modal>
    )
}

export default EditarServico
