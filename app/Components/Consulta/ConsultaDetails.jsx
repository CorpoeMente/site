import React from 'react'
import { Modal } from '..'
import { RxActivityLog } from 'react-icons/rx'
import { formatDateToHTML, formatTime } from '@app/utils/textUtils'
const ConsultaDetails = ({ agendamento }) => {
    return (
        <Modal
            title={'Detalhes da Consulta'}
            className="text-white !p-0 !m-0 !rounded-md !bg-transparent !text-md hover:scale-110 hover:!text-white transition duration-300 ease-in-out"
            buttonText={
                <RxActivityLog className="cursor-pointer hover:scale-110 hover:text-3xl text-2xl !w-[24px] h-[24px] drop-shadow-[0px_0px_4px_rgba(200,200,200,0.1)] text-black dark:text-white" />
            }
        >
            <div className="flex flex-col w-full mt-auto gap-y-8 items-center justify-center">
                <div className="w-2/3">
                    <fieldset>
                        <label
                            htmlFor="name"
                            className="text-primary font-bold"
                        >
                            Nome
                        </label>
                        <input
                            name="name"
                            value={agendamento.nome}
                            placeholder="Nome"
                            className="w-full border-2 border-primary rounded-lg p-2 mb-4 dark:bg-black dark:text-white"
                            type="text"
                            disabled={true}
                        />
                        <label
                            htmlFor="email"
                            className="text-primary font-bold"
                        >
                            Email
                        </label>
                        <input
                            name="email"
                            value={agendamento.email}
                            placeholder="Email"
                            className="w-full border-2 border-primary rounded-lg p-2 mb-4 dark:bg-black dark:text-white"
                            type="email"
                            disabled={true}
                        />

                        <label htmlFor="cpf" className="text-primary font-bold">
                            CPF
                        </label>

                        <input
                            name="cpf"
                            value={agendamento.cpf}
                            placeholder="CPF"
                            className="w-full border-2 border-primary rounded-lg p-2 mb-4 dark:bg-black dark:text-white"
                            type="text"
                            disabled={true}
                        />
                        <label
                            htmlFor="telefone"
                            className="text-primary font-bold"
                        >
                            Telefone
                        </label>

                        <input
                            name="telefone"
                            value={agendamento.telefone}
                            placeholder="Telefone"
                            className="w-full border-2 border-primary rounded-lg p-2 mb-4 dark:bg-black dark:text-white"
                            type="tel"
                            disabled={true}
                        />

                        <label
                            htmlFor="data"
                            className="text-primary font-bold"
                        >
                            Data do Agendamento
                        </label>
                        <input
                            name="data"
                            value={formatDateToHTML(agendamento.date)}
                            placeholder="Data do Agendamento"
                            className="w-full border-2 border-primary rounded-lg p-2 mb-4 dark:bg-black dark:text-white"
                            type="date"
                            disabled={true}
                        />

                        <label
                            htmlFor="hour"
                            className="text-primary font-bold"
                        >
                            Hora do Agendamento
                        </label>
                        <input
                            name="hour"
                            value={formatTime(agendamento.date)}
                            placeholder="Hora do Agendamento"
                            className="w-full border-2 border-primary rounded-lg p-2 mb-4 dark:bg-black dark:text-white"
                            type="time"
                            disabled={true}
                        />

                        <label
                            htmlFor="servicio"
                            className="text-primary font-bold"
                        >
                            Serviço
                        </label>

                        <input
                            name="servico"
                            value={agendamento.servico.nome}
                            placeholder="Serviço"
                            className="w-full border-2 border-primary rounded-lg p-2 mb-4 dark:bg-black dark:text-white"
                            type="text"
                            disabled={true}
                        />
                    </fieldset>
                    <button
                        type="submit"
                        className="w-full bg-primary text-white font-bold py-2 lg:py-4 text-sm xl:text-md rounded-lg shadow-lg hover:from-0% hover:scale-[1.03] hover:bg-secondary hover:text-primary transition ease-in-out duration-300"
                    >
                        Salvar
                    </button>
                </div>
            </div>
        </Modal>
    )
}

export default ConsultaDetails
