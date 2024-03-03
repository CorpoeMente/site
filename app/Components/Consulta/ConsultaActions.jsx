import React from 'react'
import { RxCrossCircled, RxCheckCircled, RxChatBubble } from 'react-icons/rx'
import { Toaster } from '..'
import ConsultaDetails from './ConsultaDetails'

const ConsultaActions = ({ agendamento, onUpdate }) => {
    const handleConfirm = () => {
        if (agendamento.status === 'confirmado') return
        agendamento.status = 'confirmado'
        agendamento.servico = agendamento.servico._id
        fetch(`/api/agendamentos`, {
            method: 'PUT',
            body: JSON.stringify(agendamento),
        }).then(() => onUpdate())
    }

    const handleCancel = () => {
        if (agendamento.status === 'cancelado') return
        agendamento.status = 'cancelado'
        agendamento.servico = agendamento.servico._id
        fetch(`/api/agendamentos`, {
            method: 'PUT',
            body: JSON.stringify(agendamento),
        }).then(() => onUpdate())
    }

    const handleSendMessage = () => {
        const message = `Olá ${agendamento.nome}, tudo bem? Sua consulta foi ${
            agendamento.status.substring(0, agendamento.status.length - 1) + 'a'
        } para o dia ${new Date(agendamento.date).toLocaleDateString('pt-BR', {
            timeZone: 'UTC',
        })} às ${new Date(agendamento.date).toLocaleTimeString('pt-BR', {
            timeZone: 'UTC',
        })}. Até lá!`

        window.open(
            `https://api.whatsapp.com/send?phone=${agendamento.telefone}&text=${message}`,
            '_blank'
        )
    }

    return (
        <div className="col-start-5 col-span-2 flex items-center justify-center gap-x-4">
            {agendamento.status === 'confirmado' ? (
                <Toaster
                    message="Consulta cancelada com sucesso!"
                    description="A consulta foi cancelada com sucesso e o paciente pode ser notificado via WhatsApp."
                    action={handleCancel}
                    label={'Desfazer'}
                    cancelAction={handleConfirm}
                >
                    <RxCrossCircled
                        onClick={handleCancel}
                        className={`text-2xl !w-[24px] h-[24px] drop-shadow-[0px_0px_4px_rgba(200,200,200,0.1)] ${
                            agendamento.status === 'cancelado'
                                ? 'text-[#a0a0a0]'
                                : 'text-[#ff6060] cursor-pointer hover:scale-110 hover:text-3xl'
                        }`}
                    />
                </Toaster>
            ) : (
                <Toaster
                    message="Consulta confirmada com sucesso!"
                    description="A consulta foi confirmada com sucesso e o paciente pode ser notificado via WhatsApp."
                    action={handleConfirm}
                >
                    <RxCheckCircled
                        className={`text-2xl !w-[24px] h-[24px] drop-shadow-[0px_0px_4px_rgba(200,200,200,0.1)] ${
                            agendamento.status === 'confirmado'
                                ? 'text-[#a0a0a0]'
                                : 'text-[#60ff60] cursor-pointer hover:scale-110 hover:text-3xl'
                        }`}
                    />
                </Toaster>
            )}

            <RxChatBubble
                onClick={handleSendMessage}
                className="cursor-pointer hover:scale-110 hover:text-3xl text-2xl !w-[24px] h-[24px] drop-shadow-[0px_0px_4px_rgba(200,200,200,0.1)] text-[#6060ff]"
            />
            <ConsultaDetails agendamento={agendamento} />
        </div>
    )
}

export default ConsultaActions
