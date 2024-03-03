'use client'
import React, { useState, useEffect } from 'react'
import { EditarProfissional, NovoProfissional } from '../Components'
import { BiTrashAlt } from 'react-icons/bi'
import DynamicTable from './DynamicTable'
import { useRouter } from 'next/navigation'

const ProfissionaisList = () => {
    const [profissionais, setProfissionais] = useState([])
    const [loading, setLoading] = useState(true)
    const [trash, setTrash] = useState([])
    const [showTrash, setShowTrash] = useState(false)

    const router = useRouter()

    useEffect(() => {
        fetch('/api/profissionais')
            .then((res) => res.json())
            .then((res) => {
                if (res.error) {
                    //
                } else {
                    setProfissionais(res)
                    setLoading(false)
                }
            })
    }, [])

    const handleDelete = (id) => {
        if (confirm('Tem certeza que deseja remover este profissional?')) {
            fetch('/api/profissionais', {
                method: 'DELETE',
                body: JSON.stringify({ id }),
            })
                .then((res) => res.json())
                .then((res) => {
                    if (res.error) {
                        //
                    } else {
                        setProfissionais(
                            profissionais.filter((profissional) => {
                                return profissional._id !== id
                            })
                        )
                    }
                })
        }
    }

    const columns = [
        {
            key: 'nome',
            label: 'Nome',
        },
        {
            key: 'cargo',
            label: 'Cargo',
        },
    ]

    const actions = [
        {
            key: 'edit',
            label: 'Editar',
            custom: true,
            render: (profissional) => {
                return <EditarProfissional profissional={profissional} />
            },
        },
        {
            key: 'delete',
            label: 'Lixeira',
            message: 'Profissional removido com sucesso!',
            icon: (
                <BiTrashAlt className="dark:text-[#f00] text-[#a00] text-xl" />
            ),
            handleAction: handleDelete,
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
                        : `Ativos (${agendamentos.length})`}
                </button>

                <NovoProfissional />
            </div>
            <DynamicTable
                columns={columns}
                data={profissionais}
                actions={actions}
            />
        </div>
    )
}

export default ProfissionaisList
