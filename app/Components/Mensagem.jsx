import React from 'react'
import { Modal } from '.'
import { MdMessage } from 'react-icons/md'
import { formatData } from '@/app/utils/textUtils'
const Mensagem = ({ mensagem }) => {
    return (
        <Modal
            buttonText={<MdMessage />}
            title={'Mensagem de ' + mensagem.nome}
            className={
                'max-w-[60px] !p-2 !mt-0 bg-transparent shadow-none text-[#003458] dark:text-[#fff] dark:drop_shadow-[0px_0px_4px_rgba(255,255,255,0.8)] hover:bg-transparent'
            }
        >
            <div className="flex flex-col h-3/4">
                <p className="text-md font-bold text-primary dark:text-white">
                    {mensagem.mensagem}
                </p>
                <p className="text-sm text-primary dark:text-white mt-auto mb-4">
                    <b>Email:</b> {mensagem.email}
                </p>
                <p className="text-sm text-primary dark:text-white mb-4">
                    <b>Telefone:</b> {mensagem.telefone}
                </p>
                <p className="text-sm text-primary dark:text-white">
                    <b>Data:</b> {formatData(mensagem.createdAt)}
                </p>
            </div>
        </Modal>
    )
}

export default Mensagem
