'use client'
import React, { useState, useEffect } from 'react'
import { FaTrashAlt } from 'react-icons/fa'
import { Mensagem } from '.'
import DynamicTable from './DynamicTable'
const MensagensList = () => {
    const [mensagens, setMensagens] = useState([])

    const formatDate = (dateStr) => {
        const [year, month, day] = dateStr.split('-')
        let newDate = `${day}/${month}/${year}`
        return newDate
    }

    useEffect(() => {
        const getMensagens = async () => {
            const res = await fetch('/api/messages')
            const mensagens = await res.json()
            setMensagens(mensagens)
        }
        getMensagens()
    }, [])

    const deleteMensagem = async (id) => {
        const res = await fetch(`/api/messages`, {
            method: 'DELETE',
            body: JSON.stringify({ id }),
        })
        const data = await res.json()
        setMensagens(data)
    }
    const renderMensagem = (mensagem) => {
        return <Mensagem mensagem={mensagem} />
    }
    const columns = [
        {
            key: 'nome',
            label: 'Nome',
        },
        {
            key: 'email',
            label: 'Email',
        },
        {
            key: 'telefone',
            label: 'Telefone',
        },
        {
            key: 'createdAt',
            label: 'Data',
        },
    ]

    const actions = [
        {
            key: 'mensagem',
            label: 'Mensagem',
            custom: true,
            render: renderMensagem,
        },
        {
            key: 'delete',
            label: 'Delete',
            message: 'Deletado com sucesso!',
            icon: (
                <FaTrashAlt className="text-[#c00] dark:text-[#f00] p-0 text-xl dark:drop-shadow-[0px_0px_8px_rgba(255,0,0,0.7)]" />
            ),
            handleAction: deleteMensagem,
        },
    ]

    return <DynamicTable data={mensagens} columns={columns} actions={actions} />
}

export default MensagensList
