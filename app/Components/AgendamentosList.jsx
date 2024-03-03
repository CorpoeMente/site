'use client'
import React, { useState, useEffect } from 'react'
import DynamicTable from './DynamicTable'
import { BiTrashAlt } from 'react-icons/bi'
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa'
import { formatDatetime } from '@app/utils/textUtils'
import { EditarAgendamento } from '@app/Components'
import { GrRedo } from 'react-icons/gr'
import { useRouter } from 'next/navigation'
import { FaPencil } from 'react-icons/fa6'
import { formatDateToHTML } from '@/app/utils/textUtils'
import { Tooltip } from 'flowbite-react'

const AgendamentosList = () => {
    const [agendamentos, setAgendamentos] = useState([])
    const [trash, setTrash] = useState([])
    const [showTrash, setShowTrash] = useState(false)

    const router = useRouter()

    useEffect(() => {
        const getAgendamentos = async () => {
            const res = await fetch('/api/agendamentos')
            const data = await res.json()
            // set only agendamentos with documentStatus === 'ativo'
            setAgendamentos(
                data.filter((agendamento) => {
                    return agendamento.documentStatus === 'ativo'
                })
            )

            // set only agendamentos with documentStatus === 'trash'
            setTrash(
                data.filter((agendamento) => {
                    return agendamento.documentStatus === 'lixeira'
                })
            )
        }
        getAgendamentos()
    }, [])

    const deleteAgendamento = async ({ _id, documentStatus }) => {
        const res = await fetch(`/api/agendamentos`, {
            method: 'DELETE',
            body: JSON.stringify({ _id }),
        })

        const success = await res.json()
        if (!success) return

        if (documentStatus === 'lixeira') {
            const data = trash.filter((agendamento) => {
                return agendamento._id !== _id
            })
            setTrash(data)
        } else {
            const data = agendamentos.filter((agendamento) => {
                return agendamento._id !== _id
            })
            setAgendamentos(data)

            const agendamento = agendamentos.find((agendamento) => {
                return agendamento._id === _id
            })

            setTrash([...trash, agendamento])
        }
    }

    const handleCancel = async ({ _id }) => {
        const res = await fetch(`/api/agendamentos`, {
            method: 'PUT',
            body: JSON.stringify({ _id, status: 'cancelado' }),
        })
        const success = await res.json()

        if (!success) return
        const data = agendamentos.map((agendamento) => {
            if (agendamento._id === _id) {
                agendamento.status = 'cancelado'
            }
            return agendamento
        })
        setAgendamentos(data)
    }

    const handleConfirm = async ({ _id }) => {
        const res = await fetch(`/api/agendamentos`, {
            method: 'PUT',
            body: JSON.stringify({ _id, status: 'confirmado' }),
        })
        const success = await res.json()

        if (!success) return
        // update agendamentos
        const data = agendamentos.map((agendamento) => {
            if (agendamento._id === _id) {
                agendamento.status = 'confirmado'
            }
            return agendamento
        })

        setAgendamentos(data)
    }

    const handleRestoreDocument = async ({ _id }) => {
        const res = await fetch(`/api/agendamentos`, {
            method: 'PUT',
            body: JSON.stringify({ _id, documentStatus: 'ativo' }),
        })
        const success = await res.json()

        if (!success) return
        const data = trash.filter((agendamento) => {
            return agendamento._id !== _id
        })

        setTrash(data)

        const agendamento = trash.find((agendamento) => {
            return agendamento._id === _id
        })

        setAgendamentos([...agendamentos, agendamento])
    }

    const renderEdit = (agendamento) => {
        const now = new Date()
        if (new Date(agendamento.date) < now)
            return (
                <Tooltip
                    content="Não é possível editar agendamentos anteriores à hoje"
                    className="cursor-not-allowed"
                >
                    <FaPencil className="dark:text-[#202020] cursor-not-allowed" />
                </Tooltip>
            )
        return (
            <a href={'/panel/agendamentos/editar/' + agendamento._id}>
                <FaPencil />
            </a>
        )
    }

    const actions = [
        {
            key: 'edit',
            label: 'Editar',
            custom: true,
            render: renderEdit,
            showCondition: !showTrash,
        },
        {
            key: 'confirm',
            label: 'Confirmar',
            message: 'Agendamento confirmado com sucesso!',
            icon: (
                <FaCheckCircle className="text-[#0a0] dark:text-[#0f0] p-0 text-xl dark:drop-shadow-[0px_0px_8px_rgba(0,255,0,0.7)]" />
            ),
            handleAction: handleConfirm,
            showCondition: !showTrash,
        },
        {
            key: 'cancel',
            label: 'Cancelar',
            message: 'Agendamento cancelado com sucesso!',
            icon: (
                <FaTimesCircle className="text-[#a00] dark:text-[#f00] p-0 text-xl dark:drop-shadow-[0px_0px_4px_rgba(255,0,0,0.7)]" />
            ),
            handleAction: handleCancel,
            showCondition: !showTrash,
        },
        {
            key: 'restore',
            label: 'Restaurar',
            message: 'Agendamento restaurado com sucesso!',
            icon: (
                <GrRedo className="text-[#0a0] dark:text-[#0f0] p-0 text-xl dark:drop-shadow-[0px_0px_8px_rgba(255,0,0,0.7)]" />
            ),
            handleAction: handleRestoreDocument,
            showCondition: showTrash,
        },
        {
            key: showTrash ? 'delete' : 'trash',
            label: showTrash ? 'Deletar' : 'Lixeira',
            message: showTrash
                ? 'Agendamento excluído com sucesso!'
                : 'Agendamento enviado para lixeira com sucesso!',
            icon: (
                <BiTrashAlt className="text-[#c00] dark:text-[#f00] p-0 text-xl dark:drop-shadow-[0px_0px_8px_rgba(255,0,0,0.7)]" />
            ),
            handleAction: deleteAgendamento,
        },
    ]

    const handleStatusStyle = (status) => {
        switch (status) {
            case 'confirmado':
                return 'text-[#0a0] dark:text-[#0f0]'
            case 'cancelado':
                return 'text-[#a00] dark:text-[#f00]'
            default:
                return 'text-[#505050] dark:text-[#a0a0a0]'
        }
    }

    const columns = [
        { key: 'nome', label: 'Nome' },
        { key: 'email', label: 'Email' },
        { key: 'telefone', label: 'Telefone' },
        { key: 'date', label: 'Data', format: formatDatetime },
        { key: 'status', label: 'Status', formatStyle: handleStatusStyle },
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
                        : `Ativos (${agendamentos.length})`}
                </button>
                <button
                    className="btn btn-primary dark:text-white border-[1px] dark:border-white p-2 rounded"
                    onClick={() => router.push('/panel/agendamentos/novo')}
                >
                    Novo Agendamento
                </button>
            </div>
            <DynamicTable
                data={showTrash ? trash : agendamentos}
                columns={columns}
                actions={actions}
            />
        </div>
    )
}

export default AgendamentosList
