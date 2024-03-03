'use client'
import React, { useState, useEffect } from 'react'
import { BiTrashAlt } from 'react-icons/bi'
import { AgendarPedido } from '../../Components'
import DynamicTable from '../../Components/DynamicTable'
import { formatDatetime } from '../../utils/textUtils'
import { MdSettingsBackupRestore } from 'react-icons/md'
import DetalhesPedido from './DetalhesPedido'

const Pedidos = () => {
    const [pedidos, setPedidos] = useState([])

    const [showTrash, setShowTrash] = useState(false)
    const [trash, setTrash] = useState([])

    const formatDate = (dateStr) => {
        const [year, month, day] = dateStr.split('-')
        let newDate = `${day}/${month}/${year}`
        return newDate
    }

    useEffect(() => {
        const getpedidos = async () => {
            const res = await fetch('/api/pedidos')
            const pedidos = await res.json()
            console.log(pedidos)
            setPedidos(
                pedidos.filter((pedido) => {
                    return pedido.documentStatus != 'lixeira'
                })
            )

            setTrash(
                pedidos.filter((pedido) => {
                    return pedido.documentStatus === 'lixeira'
                })
            )
        }
        getpedidos()
    }, [])

    const deletePedido = async ({ _id }) => {
        const res = await fetch(`/api/pedidos`, {
            method: 'DELETE',
            body: JSON.stringify({ id: _id }),
        })
        const data = await res.json()

        //filter pedidos
        const newData = pedidos.filter((pedido) => {
            return pedido._id !== _id
        })

        setPedidos(newData)
    }

    const handleAgendar = async (pedido) => {
        const res = await fetch(`/api/agendamentos`, {
            method: 'POST',
            body: JSON.stringify({
                nome: pedido.nome,
                email: pedido.email,
                telefone: pedido.telefone,
                date: pedido.data,
                servico: pedido.servico,
                status: 'agendado',
            }),
        })
        const data = await res.json()
        setPedidos(data)
    }

    const formatServico = (servico) => {
        return servico?.nome
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
            key: 'servico',
            label: 'Serviço',
            format: formatServico,
        },
        {
            key: 'data',
            label: 'Data',
            format: formatDatetime,
        },
    ]

    const handleRenderAgendar = (pedido) => {
        return <AgendarPedido pedido={pedido} />
    }

    const restorePedido = async (pedido) => {
        console.log(pedido)
        const res = await fetch(`/api/pedidos`, {
            method: 'PUT',
            body: JSON.stringify({ id: pedido._id, documentStatus: 'ativo' }),
        })
        const data = await res.json()

        setPedidos([...pedidos, pedido])
        setTrash(trash.filter((p) => p._id !== pedido._id))
    }

    const handleRenderDetalhes = (pedido) => {
        return <DetalhesPedido pedido={pedido} />
    }

    const actions = [
        {
            key: 'detalhes',
            label: 'Detalhes',
            message: 'Detalhes do pedido',
            custom: true,
            render: handleRenderDetalhes,
        },
        {
            key: 'restore',
            label: 'Restaurar',
            message: 'Pedido restaurado com sucesso!',
            icon: (
                <MdSettingsBackupRestore className="text-[#0a0] dark:text-[#0f0] p-0 text-xl dark:drop-shadow-[0px_0px_8px_rgba(0,255,0,0.7)]" />
            ),
            handleAction: restorePedido,
            showCondition: showTrash,
        },
        {
            key: 'delete',
            label: 'Deletar',
            message: 'Pedido excluído com sucesso!',
            icon: (
                <BiTrashAlt className="text-[#c00] dark:text-[#f00] p-0 text-xl dark:drop-shadow-[0px_0px_8px_rgba(255,0,0,0.7)]" />
            ),
            handleAction: deletePedido,
        },
        {
            key: 'agendar',
            label: 'Agendar',
            message: 'Pedido agendado com sucesso!',
            handleAction: handleAgendar,
            custom: true,
            render: handleRenderAgendar,
            showCondition: !showTrash,
        },
    ]
    return (
        <div className="col-span-4 flex flex-col items-start justify-start text-black bg-[#f4f4f4] dark:bg-black p-12 rounded-lg card-shadow">
            <div className="flex items-center justify-between w-full">
                <button
                    className="btn btn-primary dark:text-white border-[1px] dark:border-white p-2 rounded"
                    onClick={() => setShowTrash(!showTrash)}
                >
                    {!showTrash
                        ? `Lixeira (${trash.length})`
                        : `Ativos (${pedidos.length})`}
                </button>
            </div>
            <DynamicTable
                data={showTrash ? trash : pedidos}
                columns={columns}
                actions={actions}
            />
        </div>
    )
}

export default Pedidos
