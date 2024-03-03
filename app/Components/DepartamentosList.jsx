'use client'
import React, { useState, useEffect } from 'react'
import { EditarDepartamento } from '../Components'
import { BiTrashAlt } from 'react-icons/bi'
import DynamicTable from './DynamicTable'
const DepartamentosList = () => {
    const [departamentos, setDepartamentos] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch('/api/departamentos')
            .then((res) => res.json())
            .then((res) => {
                if (res.error) {
                    //
                } else {
                    setDepartamentos(res.departamentos)
                    setLoading(false)
                }
            })
    }, [])

    const handleDelete = ({ _id }) => {
        fetch(`/api/departamentos`, {
            method: 'DELETE',
            body: JSON.stringify({ _id }),
        })
            .then((res) => res.json())
            .then((res) => {
                if (res.error) {
                    //
                } else {
                    //
                    setDepartamentos(
                        departamentos.filter((item) => item._id !== _id)
                    )
                }
            })
    }

    const formatResponsavel = (responsavel) => {
        return responsavel?.nome
    }

    const columns = [
        {
            key: 'name',
            label: 'Nome',
        },
        {
            key: 'responsavel',
            label: 'Responsável',
            format: formatResponsavel,
        },
    ]

    const actions = [
        {
            key: 'delete',
            label: 'Delete',
            message: 'Deletado com sucesso!',
            icon: (
                <BiTrashAlt className="text-[#c00] dark:text-[#f00] p-0 text-xl dark:drop-shadow-[0px_0px_8px_rgba(255,0,0,0.7)]" />
            ),
            handleAction: handleDelete,
        },
        {
            key: 'edit',
            label: 'Edit',
            custom: true,
            render: (departamento) => {
                return <EditarDepartamento departamento={departamento} />
            },
        },
    ]

    return (
        <DynamicTable
            data={departamentos}
            columns={columns}
            actions={actions}
        />
    )
}

export default DepartamentosList
