'use client'
import React, { useState } from 'react'
import { Modal } from '../Components'
import { FaPencil } from 'react-icons/fa6'
import { PiSpinnerGapThin } from 'react-icons/pi'
import useServicos from '../hooks/useServicos'
import useProfissionais from '../hooks/useProfissionais'

import { formatDateToHTML } from '@/app/utils/textUtils'

const EditarAgendamento = ({ agendamento }) => {
    const [nome, setNome] = useState(agendamento.nome)
    const [email, setEmail] = useState(agendamento.email)
    const [telefone, setTelefone] = useState(agendamento.telefone)
    const [cpf, setCpf] = useState(agendamento.cpf)
    const [servico, setServico] = useState(agendamento.servico._id)
    const [profissional, setProfissional] = useState(
        agendamento.profissional._id
    )
    const [date, setDate] = useState(agendamento.date)
    const [status, setStatus] = useState(agendamento.status)

    const { servs, isLoadingServs } = useServicos()
    const { profs, isLoadingProfs } = useProfissionais()

    const [message, setMessage] = useState('')
    const handleSubmit = (e) => {
        e.preventDefault()

        fetch('/api/agendamentos', {
            method: 'PUT',
            body: JSON.stringify({
                nome,
                email,
                telefone,
                cpf,
                servico,
                profissional,
                date,
                status,
            }),
        })
            .then((res) => res.json())
            .then((res) => {
                if (res.error) {
                    setMessage('Erro ao editar agendamento. Tente novamente.')
                } else {
                    window.location.reload()
                }
            })
    }
    if (isLoadingServs || isLoadingProfs)
        return <PiSpinnerGapThin className="animate-spin h-5 w-5" />
    const servicos = servs
    const profissionais = profs.profissionais
    return (
        <Modal
            buttonText={<FaPencil />}
            title={'Editar Serviço'}
            className={
                'w-auto !p-0 !m-0 !text-sm !bg-transparent hover:bg-transparent dark:hover:text-[#fff] dark:!text-[#fff] !text-[#f8be00]'
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
                            className="w-full border-2 border-primary dark:bg-black rounded-lg p-2 mb-4"
                            required
                        />
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            placeholder="Email"
                            className="w-full border-2 border-primary dark:bg-black rounded-lg p-2 mb-4"
                            required
                        />

                        <input
                            value={telefone}
                            onChange={(e) => setTelefone(e.target.value)}
                            type="tel"
                            placeholder="Telefone"
                            className="w-full border-2 border-primary dark:bg-black rounded-lg p-2 mb-4"
                            required
                        />

                        <input
                            value={cpf}
                            onChange={(e) => setCpf(e.target.value)}
                            type="text"
                            placeholder="CPF"
                            className="w-full border-2 border-primary dark:bg-black rounded-lg p-2 mb-4"
                            required
                        />

                        <select
                            value={servico}
                            onChange={(e) => setServico(e.target.value)}
                            className="w-full border-2 border-primary dark:bg-black rounded-lg p-2 mb-4"
                            required
                        >
                            <option>Serviço</option>
                            {servicos &&
                                servicos.map((servico) => (
                                    <option
                                        key={servico._id}
                                        value={servico._id}
                                    >
                                        {servico.nome}
                                    </option>
                                ))}
                        </select>

                        <select
                            value={profissional}
                            onChange={(e) => setProfissional(e.target.value)}
                            className="w-full border-2 border-primary dark:bg-black rounded-lg p-2 mb-4"
                            required
                        >
                            <option value="">Profissional</option>
                            {profs &&
                                profs.map((profissional) => (
                                    <option
                                        key={profissional._id}
                                        value={profissional._id}
                                    >
                                        {profissional.nome}
                                    </option>
                                ))}
                        </select>
                        <input
                            value={formatDateToHTML(date)}
                            onChange={(e) => setDate(e.target.value)}
                            type="date"
                            placeholder="Data"
                            className="w-full border-2 border-primary dark:bg-black rounded-lg p-2 mb-4"
                            required
                        />

                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="w-full border-2 border-primary dark:bg-black rounded-lg p-2 mb-4"
                            required
                        >
                            <option value="">Status</option>
                            <option value="agendado">Agendado</option>
                            <option value="confirmado">Confirmado</option>
                            <option value="cancelado">Cancelado</option>
                        </select>
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

export default EditarAgendamento
