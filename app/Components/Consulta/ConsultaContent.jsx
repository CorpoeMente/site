import React from 'react'

const ConsultaContent = ({ nomeServico, nomePaciente, status, date }) => {
    const formatString = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1)
    }
    const formatHour = (date) => {
        const dt = new Date(date)
        dt.setHours(dt.getHours() + 3)
        return dt.toLocaleTimeString('pt-BR').slice(0, -3)
    }
    return (
        <div className="col-span-3 flex flex-col items-center justify-center">
            <span className="font-bold dark:text-white text-center">
                {formatString(nomeServico)} de {formatString(nomePaciente)}
            </span>
            <span className="dark:text-white">
                <b
                    className={`text-sm ${
                        status === 'confirmado'
                            ? 'text-[#0f0]'
                            : status === 'cancelado'
                              ? 'text-[#f00]'
                              : 'dark:text-white'
                    }`}
                >
                    {formatString(status)}
                </b>{' '}
                - {formatHour(date)}
            </span>
        </div>
    )
}

export default ConsultaContent
