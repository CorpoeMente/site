'use client'
import React, { useState, useEffect } from 'react'
import { Modal, ExperienciaProfissionalForm } from '../Components'

const NovoProfissional = () => {
    const [nome, setNome] = useState('')
    const [cargo, setCargo] = useState('')
    const [imagem, setImagem] = useState('')
    const [descricao, setDescricao] = useState('')
    const [departamento, setDepartamento] = useState('')
    const [departamentos, setDepartamentos] = useState([])
    const [telefone, setTelefone] = useState('')
    const [email, setEmail] = useState('')
    const [curriculo, setCurriculo] = useState([])
    const [jornada, setJornada] = useState({
            segunda: { inicio: '', fim: '' },
            terca: { inicio: '', fim: '' },
            quarta: { inicio: '', fim: '' },
            quinta: { inicio: '', fim: '' },
            sexta: { inicio: '', fim: '' },
            sabado: { inicio: '', fim: '' },
            domingo: { inicio: '', fim: '' },
        }
    )

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
            method: 'POST',
            body: JSON.stringify({
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
            buttonText={'Novo Profissional'}
            title={'Novo Profissional'}
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
                            className="w-full border-2 border-primary rounded-lg p-2 mb-4 dark:bg-black dark:text-white"
                            required
                        />
                        <input
                            value={cargo}
                            onChange={(e) => setCargo(e.target.value)}
                            type="text"
                            placeholder="Cargo"
                            className="w-full border-2 border-primary rounded-lg p-2 mb-4 dark:bg-black dark:text-white"
                            required
                        />
                        <input
                            value={imagem}
                            onChange={(e) => setImagem(e.target.value)}
                            type="text"
                            placeholder="Imagem"
                            className="w-full border-2 border-primary rounded-lg p-2 mb-4 dark:bg-black dark:text-white"
                        />
                        <textarea
                            value={descricao}
                            onChange={(e) => setDescricao(e.target.value)}
                            placeholder="Descrição"
                            className="w-full border-2 border-primary rounded-lg p-2 mb-4 dark:bg-black dark:text-white"
                            required
                        />
                        <select
                            value={departamento}
                            onChange={(e) => setDepartamento(e.target.value)}
                            className="w-full border-2 border-primary rounded-lg p-2 mb-4 dark:bg-black dark:text-white"
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
                        <input
                            value={telefone}
                            onChange={(e) => setTelefone(e.target.value)}
                            type="text"
                            placeholder="Telefone"
                            className="w-full border-2 border-primary rounded-lg p-2 mb-4 dark:bg-black dark:text-white"
                            required
                        />
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            placeholder="E-mail"
                            className="w-full border-2 border-primary rounded-lg p-2 mb-4 dark:bg-black dark:text-white"
                            required
                        />
                        <div className="flex flex-col items-center justify-center gap-8">
                            <span className="text-lg font-bold">Jornada</span>

                            <div className="grid grid-cols-[80px_1fr_1fr] gap-4 w-full">
                                <span></span>
                                <span className="text-center text-lg">
                                    Entrada
                                </span>
                                <span className="text-center text-lg">
                                    Saída
                                </span>
                                {Object.keys(jornada).map((dia, index) => (
                                    <>
                                        <span>{dia}</span>
                                        <input
                                            value={jornada[dia].inicio}
                                            onChange={(e) =>
                                                setJornada({
                                                    ...jornada,
                                                    [dia]: {
                                                        ...jornada[dia],
                                                        inicio: e.target.value,
                                                    },
                                                })
                                            }
                                            type="time"
                                            className="w-full border-2 border-primary rounded-lg p-2 mb-4 dark:bg-black dark:text-white"
                                        />
                                        <input
                                            value={jornada[dia].fim}
                                            onChange={(e) =>
                                                setJornada({
                                                    ...jornada,
                                                    [dia]: {
                                                        ...jornada[dia],
                                                        fim: e.target.value,
                                                    },
                                                })
                                            }
                                            type="time"
                                            className="w-full border-2 border-primary rounded-lg p-2 mb-4 dark:bg-black dark:text-white"
                                        />
                                    </>
                                ))}
                            </div>
                        </div>
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
