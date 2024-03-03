'use client'
import React, { useState, useEffect } from 'react'
import InputMask from 'react-input-mask'
import { useTheme } from 'next-themes'
import { FormRoot } from '@/app/Components/MultiStepForm/'
import { getWeekDay } from '@/app/utils/date'

// get params from the url
import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'
import useAgendamentos from '@/app/hooks/useAgendamentos'

import {formatDateToHTML, formatTime} from '@/app/utils/textUtils'

const phoneMask = '(99) 99999-9999'
const cpfMask = '999.999.999-99'

const EditarAgendamento = ({agendamento_id}) => {
    const {agdmts, isLoadingAgdmts} = useAgendamentos(agendamento_id)

    const { theme } = useTheme()

    const [servicos, setServicos] = useState([])
    const [profissionais, setProfissionais] = useState('')

    const [agendamentos, setAgendamentos] = useState([])

    const [servico, setServico] = useState('')

    const [profissional, setProfissional] = useState('')
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [telefone, setTelefone] = useState('')
    const [cpf, setCpf] = useState('')

    const [data, setData] = useState('')
    const [hora, setHora] = useState('')
    const [message, setMessage] = useState('')

    const router = useRouter()

    useEffect(() => {
        if(agdmts && !isLoadingAgdmts){
            setServico(agdmts.servico._id)
            setProfissional(agdmts.profissional)
            setNome(agdmts.nome)
            setEmail(agdmts.email)
            setTelefone(agdmts.telefone)
            setCpf(agdmts.cpf)
            setData(formatDateToHTML(agdmts.date))
            setHora(formatTime(agdmts.date))
            setMessage(agdmts.message)
            setProfissionais(
                servicos.find((item) => item._id === agdmts.servico._id)?
                .profissionais
            )
        }
    }, [agdmts, servicos])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/servicos')
                const data = await response.json()
                setServicos(data)
            } catch (error) {
                console.error('Erro ao buscar os serviços:', error)
            }
        }
        fetchData()
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault()
        var date = new Date(data + ' ' + hora)
        date.setHours(date.getHours() - 3)

        const body = {
            _id: agdmts._id,
            nome,
            email,
            telefone,
            cpf,
            date: date,
            servico,
            profissional,
            status: agdmts.status
        }

        try {
            const response = await fetch('/api/agendamentos', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            })

            const data = await response.json()
            if (data.error) {
                setMessage(data.error)
            } else {
                router.push('/panel/agendamentos')
            }
        } catch (error) {
            console.error('Erro ao cadastrar o agendamento:', error)
        }
    }

    const fetchAgendamentos = async ({ profissional, day }) => {
        try {
            const response = await fetch(
                '/api/agendamentos?date=' +
                    day +
                    '&profissional=' +
                    profissional
            )
            const data = await response.json()
            setAgendamentos(data)
        } catch (error) {
            console.error('Erro ao buscar os agendamentos:', error)
        }
    }
    const generateHours = () => {
        let hoursArray = []
        let hour = 8
        let minute = 0

        while (hour < 21 || (hour === 21 && minute === 0)) {
            if (hour === 21) break
            if (hour === 12) {
                hour = 13
                minute = 0
            }

            let hourString = hour.toString().padStart(2, '0')
            let minuteString = minute.toString().padStart(2, '0')

            hoursArray.push(hourString + ':' + minuteString)
            minute += 40

            if (minute >= 60) {
                hour++
                minute -= 60
            }
        }

        return hoursArray
    }
    const generateValidHours = (jornada) => {
        if (agendamentos) {
            const hoursArray = generateHours()
            const weekDay = getWeekDay(new Date(data))
            if (!jornada[weekDay]) return []

            const inicioExpediente = new Date(
                data + ' ' + jornada[weekDay].inicio
            )
            const fimExpediente = new Date(data + ' ' + jornada[weekDay].fim)

            const now = new Date()
            var validHours = []

            hoursArray.forEach((hour) => {
                var valid = true
                var dateAgendamento = new Date(data + ' ' + hour)
                agendamentos.forEach((agendamento) => {
                    // check if the hour is already taken
                    if (
                        agendamento.date.split('T')[1].substring(0, 5) ===
                            hour &&
                        ['agendado', 'confirmado'].includes(agendamento.status)
                         && agendamento._id !== agdmts._id
                    ) {
                        valid = false
                    }
                })
                if (dateAgendamento < now) {
                    valid = false
                }

                // check if the hour is within the professional's work hours (horario está entre o inicio e o fim da jornada do profissional)
                if (
                    dateAgendamento < inicioExpediente ||
                    dateAgendamento >= fimExpediente
                ) {
                    valid = false
                }
                if (valid) {
                    validHours.push(hour)
                }
            })
        }

        return validHours
    }

    const handleServicoChange = (e) => {
        setServico(e.target.value)
        if (e.target.value) {
            setProfissionais(
                servicos.find((item) => item._id === e.target.value)
                    .profissionais
            )
        } else {
            setProfissional('')
            setServico('')
            setProfissionais([])
        }
    }

    useEffect(() => {
        if (profissional && data) {
            fetchAgendamentos({ profissional, day: data })
        }
    }, [profissional, data])

    if(isLoadingAgdmts){
        return <span>Carregando...</span>
    }

    return (
        <div className="col-span-4 flex flex-col items-start justify-start text-black bg-[#f4f4f4] dark:bg-[#222] p-12 rounded-lg card-shadow">
            <FormRoot
                onSubmit={handleSubmit}
                stepsTitle={['Informações Pessoais', 'Data e Hora']}
            >
                <div className="col-span-1 row-span-4 w-full h-full">
                    <p className="text-[#f22] text-center font-bold my-4">
                        {message}
                    </p>
                    <label
                        htmlFor="nome"
                        className="dark:text-white font-bold 2xl:text-lg ms-2"
                    >
                        Nome
                    </label>
                    <input
                        value={nome}
                        name="nome"
                        onChange={(e) => setNome(e.target.value)}
                        type="text"
                        placeholder="Nome do Paciente"
                        className="w-full dark:bg-black dark:text-white border-[1px] border-[#aaa] dark:border-[#fff] rounded-lg p-2 mb-4"
                        required
                    />

                    <label
                        htmlFor="cpf"
                        className="dark:text-white font-bold 2xl:text-lg ms-2"
                    >
                        CPF
                    </label>
                    <InputMask
                        mask={cpfMask}
                        name="cpf"
                        value={cpf}
                        onChange={(e) => setCpf(e.target.value)}
                        type="text"
                        placeholder="CPF"
                        className="w-full dark:bg-black dark:text-white border-[1px] border-[#aaa] dark:border-[#fff] rounded-lg p-2 mb-4"
                        required
                    />

                    <label
                        htmlFor="email"
                        className="dark:text-white font-bold 2xl:text-lg ms-2"
                    >
                        Email
                    </label>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        name="email"
                        placeholder="Email do Paciente  "
                        className="w-full dark:bg-black dark:text-white border-[1px] border-[#aaa] dark:border-[#fff] rounded-lg p-2 mb-4"
                        required
                    />

                    <label
                        htmlFor="telefone"
                        className="dark:text-white font-bold 2xl:text-lg ms-2"
                    >
                        Telefone
                    </label>
                    <InputMask
                        mask={phoneMask}
                        value={telefone}
                        name="telefone"
                        onChange={(e) => setTelefone(e.target.value)}
                        type="text"
                        placeholder="Telefone"
                        className="w-full dark:bg-black dark:text-white border-[1px] border-[#aaa] dark:border-[#fff] rounded-lg p-2 mb-4"
                        required
                    />

                    <div className="flex items-center justify-center gap-x-8">
                        <div className="w-full">
                            <label
                                htmlFor="servico"
                                className="dark:text-white font-bold 2xl:text-lg ms-2"
                            >
                                Serviço
                            </label>
                            <select
                                name="servico"
                                value={servico}
                                onChange={(e) => handleServicoChange(e)}
                                className="w-full dark:bg-black dark:text-white border-[1px] border-[#aaa] dark:border-[#fff] rounded-lg p-2 mb-4"
                                required
                            >
                                <option value="">Serviço</option>
                                {servicos &&
                                    servicos.map((item, index) => (
                                        <option key={index} value={item._id}>
                                            {item.nome}
                                        </option>
                                    ))}
                            </select>
                        </div>
                        <div className="w-full">
                            <label
                                htmlFor="profissional"
                                className="dark:text-white font-bold 2xl:text-lg ms-2"
                            >
                                Profissional
                            </label>
                            <select
                                name="profissional"
                                value={profissional}
                                onChange={(e) =>
                                    setProfissional(e.target.value)
                                }
                                className="w-full dark:bg-black dark:text-white border-[1px] border-[#aaa] dark:border-[#fff] rounded-lg p-2 mb-4"
                                required
                            >
                                <option value="">Profissional</option>
                                {profissionais &&
                                    profissionais.length > 0 &&
                                    profissionais.map((prof, index) => (
                                        <option key={index} value={prof._id}>
                                            {prof.nome}
                                        </option>
                                    ))}
                            </select>
                        </div>
                    </div>
                </div>
                {profissionais && (
                    <div className="row-span-4 col-span-1 grid grid-rows-4 grid-cols-1 items-center gap-y-2 w-full px-8">
                        <div className="row-span-1 flex flex-col items-center justify-center">
                            <span className="text-center font-bold text-xl mb-4 dark:text-white">
                                Data e Hora
                            </span>
                            <input
                                value={data}
                                onChange={(e) => setData(e.target.value)}
                                type="date"
                                placeholder="Data"
                                className="dark:bg-black dark:text-white border-[1px] border-[#aaa] dark:border-[#fff] rounded-lg p-4 h-12 w-72"
                                min={new Date().toISOString().split('T')[0]}
                                required
                            />
                        </div>

                        {profissional && data && (
                            <div className="row-span-3 grid grid-cols-4 grid-row-5 gap-4 h-auto">
                                {/* placeholder array for adding buttons that will be the possible hours for the agendamento */}
                                {generateValidHours(
                                    profissionais.find(
                                        (prof) => prof._id === profissional
                                    ).jornada
                                ).map((hour, index) => (
                                    <input
                                        type="button"
                                        key={index}
                                        onClick={() => setHora(hour)}
                                        className={`col-span-1 row-span-1 dark:bg-black dark:text-white dark:hover:bg-white dark:hover:text-black border-[1px] border-[#aaa] dark:border-[#fff] rounded-lg p-2 mb-4 cursor-pointer`}
                                        value={hour}
                                        style={{
                                            backgroundColor:
                                                hora === hour
                                                    ? theme === 'dark'
                                                        ? '#fff'
                                                        : theme === 'light'
                                                          ? '#000'
                                                          : '#fff'
                                                    : 'transparent',
                                            color:
                                                hora === hour
                                                    ? theme === 'dark'
                                                        ? '#000'
                                                        : theme === 'light'
                                                          ? '#fff'
                                                          : '#000'
                                                    : theme === 'dark'
                                                      ? '#fff'
                                                      : '#000',
                                        }}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </FormRoot>
        </div>
    )
}

export default EditarAgendamento
