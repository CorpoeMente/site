'use client'
import React, { useState, useEffect } from 'react'
import { EditarServico } from '../Components'
import { BiTrashAlt } from 'react-icons/bi'
import DynamicTable from './DynamicTable'
import { useRouter } from 'next/navigation'
import { NovoServico } from '.'
import { GrRedo } from 'react-icons/gr'

const ServicosList = () => {
    const [servicos, setServicos] = useState([])
    const [trash, setTrash] = useState([])
    const [showTrash, setShowTrash] = useState(false)
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        const getServicos = async () => {
            const res = await fetch('/api/servicos')
            const data = await res.json()
            setServicos(
                data.filter((servico) => {
                    return servico.documentStatus === 'ativo'
                })
            )
            setTrash(
                data.filter((servico) => {
                    return servico.documentStatus === 'lixeira'
                })
            )
            setLoading(false)
        }
        getServicos()
    }, [])

    const handleDelete = async ({ _id, documentStatus }) => {
        const response = await fetch(`/api/servicos`, {
            method: 'DELETE',
            body: JSON.stringify({ _id }),
        })

        const success = await response.json()
        if (!success) return

        if (documentStatus === 'lixeira') {
            setTrash(trash.filter((servico) => servico._id !== _id))
        } else {
            setServicos(servicos.filter((servico) => servico._id !== _id))
            setTrash([
                ...trash,
                servicos.find((servico) => servico._id === _id),
            ])
        }
    }

    const handleRestoreDocument = ({ _id }) => {
        fetch(`/api/servicos`, {
            method: 'PUT',
            body: JSON.stringify({ _id, documentStatus: 'ativo' }),
        }).then((res) => {
            if (res.error) {
                alert(res.message)
            } else {
                setTrash(trash.filter((item) => item._id !== _id))
                setServicos([
                    ...servicos,
                    trash.find((item) => item._id === _id),
                ])
            }
        })
    }

    const renderEdit = (servico) => {
        return <EditarServico servico={servico} />
    }

    const formatProfissionais = (profissionais) => {
        return profissionais.length
    }

    const columns = [
        {
            key: 'nome',
            label: 'Nome',
        },
        {
            key: 'profissionais',
            label: 'Profissionais',
            format: formatProfissionais,
        },
    ]

    const actions = [
        {
            key: 'delete',
            label: showTrash ? 'Deletar' : 'Lixeira',
            message: showTrash ? 'Deletado com sucesso' : 'Movido para lixeira',
            icon: (
                <BiTrashAlt className="text-[#c00] dark:text-[#f00] p-0 text-xl dark:drop-shadow-[0px_0px_8px_rgba(255,0,0,0.7)]" />
            ),
            handleAction: handleDelete,
        },
        {
            key: 'edit',
            label: 'Editar',
            custom: true,
            render: renderEdit,
            showCondition: !showTrash,
        },
        {
            key: 'restore',
            label: 'Restaurar',
            message: 'Restaurado com sucesso',
            icon: (
                <GrRedo className="text-[#0a0] dark:text-[#0f0] p-0 text-xl dark:drop-shadow-[0px_0px_8px_rgba(255,0,0,0.7)]" />
            ),
            handleAction: handleRestoreDocument,
            showCondition: showTrash,
        },
    ]

    return (
        <div className="col-span-4 flex flex-col items-start justify-start text-black bg-[#f4f4f4] dark:bg-black p-12 rounded-lg card-shadow">
            <div className="flex items-center justify-between w-full">
                <button
                    className="btn btn-primary dark:text-white border-[1px] border-[#404040] dark:border-white p-2 rounded"
                    onClick={() => setShowTrash(!showTrash)}
                >
                    {!showTrash
                        ? `Lixeira (${trash.length})`
                        : `Ativos (${servicos.length})`}
                </button>
                <NovoServico />
            </div>
            <DynamicTable
                data={showTrash ? trash : servicos}
                columns={columns}
                actions={actions}
            />
        </div>
    )
}

export default ServicosList
