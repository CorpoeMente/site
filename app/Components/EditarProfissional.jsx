'use client'
import React, { useState, useEffect } from 'react'
import { Modal, ExperienciaProfissionalForm } from '../Components'
import { FaPencil } from 'react-icons/fa6'

const NovoProfissional = ({ profissional }) => {
    const [nome, setNome] = useState(profissional.nome)
    const [cargo, setCargo] = useState(profissional.cargo)
    const [imagem, setImagem] = useState(profissional.imagem)
    const [descricao, setDescricao] = useState(profissional.descricao)
    const [departamento, setDepartamento] = useState(profissional.departamento)
    const [departamentos, setDepartamentos] = useState([])
    const [telefone, setTelefone] = useState(profissional.telefone)
    const [email, setEmail] = useState(profissional.email)
    const [curriculo, setCurriculo] = useState(profissional.curriculo)

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

        fetch('/api/profissionais', {
            method: 'PUT',
            body: JSON.stringify({
                id: profissional._id,
                nome,
                cargo,
                imagem,
                descricao,
                departamento,
                telefone,
                email,
                curriculo,
            }),
        })
            .then((res) => res.json())
            .then((res) => {
                if (res.error) {
                    alert(res.message)
                } else {
                }
            })
    }

    return (
        <Modal
            buttonText={<FaPencil />}
            title={'Editar Profissional'}
            className={
                'w-auto p-2 !py-2 !text-sm !bg-[#f4b804] hover:bg-[#e4a800] hover:color-[#000]'
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
                        <input
                            value={cargo}
                            onChange={(e) => setCargo(e.target.value)}
                            type="text"
                            placeholder="Cargo"
                            className="w-full border-2 border-primary rounded-lg p-2 mb-4"
                            required
                        />
                        <input
                            value={imagem}
                            onChange={(e) => setImagem(e.target.value)}
                            type="text"
                            placeholder="Imagem"
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
                            value={departamento}
                            onChange={(e) => setDepartamento(e.target.value)}
                            className="w-full border-2 border-primary rounded-lg p-2 mb-4"
                            required
                        >
                            <option value="">Departamento</option>
                            {departamentos &&
                                departamentos.map((item, index) =>
                                    item._id === departamento ? (
                                        <option value={item._id} selected>
                                            {item.name}
                                        </option>
                                    ) : (
                                        <option value={item._id}>
                                            {item.name}
                                        </option>
                                    )
                                )}
                        </select>
                        <input
                            value={telefone}
                            onChange={(e) => setTelefone(e.target.value)}
                            type="text"
                            placeholder="Telefone"
                            className="w-full border-2 border-primary rounded-lg p-2 mb-4"
                            required
                        />
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            placeholder="E-mail"
                            className="w-full border-2 border-primary rounded-lg p-2 mb-4"
                            required
                        />
                        <ExperienciaProfissionalForm
                            curriculo={curriculo}
                            setCurriculo={setCurriculo}
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

export default NovoProfissional
