'use client'
import React, { useState, useEffect } from 'react'
import {
    ConsultaRoot,
    ConsultaImage,
    ConsultaContent,
    ConsultaActions,
} from './Consulta'
const ConsultasList = () => {
    const [consultas, setConsultas] = useState([])
    const today = new Date()

    // 00:00:00
    const startTime = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        -3,
        0,
        0
    ).toISOString()
    // 23:59:59
    const endTime = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        20,
        59,
        59
    ).toISOString()

    const fetchData = async () => {
        try {
            const response = await fetch(
                `/api/agendamentos?startTime=${startTime}&endTime=${endTime}`
            )
            const data = await response.json()

            setConsultas(data.reverse())
        } catch (error) {
            console.error('Erro ao buscar os agendamentos:', error)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div className="flex flex-col items-center gap-y-4 h-full p-4 text-black bg-[#f4f4f4] dark:bg-black dark:border-[1px] dark:border-[#404040] rounded-lg shadow-[0px_0px_8px_4px_rgba(0,0,0,0.3)]">
            <h4 className="font-bold text-lg text-black dark:text-white">
                Consultas de Hoje
            </h4>
            <div className="flex flex-col items-center gap-y-4 p-2 pr-4 h-full w-full overflow-y-auto">
                {consultas.length > 0 &&
                    consultas.map((consulta) => (
                        <ConsultaRoot key={consulta._id}>
                            <ConsultaImage color="#ff6060" type="exame" />
                            <ConsultaContent
                                nomeServico={consulta.servico.nome}
                                nomePaciente={consulta.nome}
                                status={consulta.status}
                                date={consulta.date}
                            />
                            <ConsultaActions
                                agendamento={consulta}
                                onUpdate={fetchData}
                            />
                        </ConsultaRoot>
                    ))}

                {consultas && consultas.length === 0 && (
                    <p className="text-center text-[#606060] dark:text-[#808080]">
                        Nenhuma consulta agendada para hoje até o momento.
                    </p>
                )}
            </div>
        </div>
    )
}

export default ConsultasList
