'use client'
import React from 'react'
import { Modal } from '../../Components'
import { CgDetailsMore } from 'react-icons/cg'
import { formatCPF, formatDatetime } from '@/app/utils/textUtils'
const DetalhesPedido = ({ pedido }) => {
    return (
        <Modal
            className="!bg-transparent dark:hover:!text-white dark:!text-white !text-primary !text-2xl !shadow-none"
            title="Detalhes do Pedido"
            buttonText={<CgDetailsMore />}
            close={
                <button
                    type="button"
                    aria-label="Close"
                    className="text-primary dark:text-white w-3/4 h-16 border-[1px] transition duration-300 ease-in-out border-primary hover:bg-primary hover:text-white rounded dark:border-white absolute bottom-8 left-1/2 transform -translate-x-1/2 dark:hover:bg-white dark:hover:text-black"
                >
                    Fechar
                </button>
            }
        >
            <div className="grid grid-cols-2 grid-rows-3 w-full gap-y-8">
                <div className="flex flex-col items-start justify-center">
                    <label className="text-lg dark:text-white">Nome</label>
                    <p>{pedido.nome}</p>
                </div>
                <div className="flex flex-col items-start justify-center">
                    <label className="text-lg dark:text-white">Email</label>
                    <p>{pedido.email}</p>
                </div>
                <div className="flex flex-col items-start justify-center">
                    <label className="text-lg dark:text-white">Telefone</label>
                    <p>{pedido.telefone}</p>
                </div>
                <div className="flex flex-col items-start justify-center">
                    <label className="text-lg dark:text-white">CPF</label>
                    <p>{formatCPF(pedido.cpf)}</p>
                </div>
                <div className="flex flex-col items-start justify-center">
                    <label className="text-lg dark:text-white">Data</label>
                    <p>{formatDatetime(pedido.data)}</p>
                </div>

                <div className="flex flex-col items-start justify-center">
                    <label className="text-lg dark:text-white">Serviço</label>
                    <p>{pedido.servico}</p>
                </div>

                <div className="col-span-2 flex flex-col items-start justify-center">
                    <label className="text-lg dark:text-white">Mensagem</label>
                    <p>{pedido.mensagem}</p>
                </div>
            </div>
        </Modal>
    )
}

export default DetalhesPedido
