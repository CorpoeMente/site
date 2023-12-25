'use client'
import React, { useState, useEffect } from 'react'
import { Table, TableRow, EditarProfissional } from '../Components'

const ProfissionaisList = () => {
    const [profissionais, setProfissionais] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch('/api/profissionais')
            .then((res) => res.json())
            .then((res) => {
                if (res.error) {
                    alert(res.message)
                } else {
                    console.log(res)
                    setProfissionais(res.profissionais)
                    setLoading(false)
                }
            })
    }, [])

    const handleDelete = (id) => {
        fetch('/api/profissionais', {
            method: 'DELETE',
            body: JSON.stringify({ id }),
        })
            .then((res) => res.json())
            .then((res) => {
                if (res.error) {
                    alert(res.message)
                } else {
                    setProfissionais(
                        profissionais.filter((profissional) => {
                            return profissional._id !== id
                        })
                    )
                }
            })
    }

    return (
        <Table headers={['Nome', 'Cargo', 'Ações']} className="w-full">
            {loading ? (
                <TableRow>
                    <td>Carregando...</td>
                </TableRow>
            ) : (
                profissionais.map((profissional, index) => {
                    return (
                        <TableRow key={index}>
                            <td className="text-center">{profissional.nome}</td>
                            <td className="text-center">
                                {profissional.cargo}
                            </td>
                            <td className="text-center h-full flex items-center justify-center gap-x-4 py-4">
                                <EditarProfissional
                                    profissional={profissional}
                                />
                                <button
                                    onClick={() =>
                                        handleDelete(profissional._id)
                                    }
                                    className="bg-[#f00] text-white py-1 px-3 rounded"
                                >
                                    Remover
                                </button>
                            </td>
                        </TableRow>
                    )
                })
            )}
        </Table>
    )
}

export default ProfissionaisList
