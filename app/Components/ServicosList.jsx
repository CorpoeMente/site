'use client'
import React, { useState, useEffect } from 'react'
import { Table, TableRow, EditarServico } from '../Components'
import { FaTrashAlt } from 'react-icons/fa'

const ServicosList = () => {
    const [servicos, setServicos] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        fetch('/api/servicos')
            .then((response) => response.json())
            .then((data) => setServicos(data))
            .then(() => setLoading(false))
    }, [])

    const handleDelete = (id) => {
        fetch(`/api/servicos`, {
            method: 'DELETE',
            body: JSON.stringify({ id }),
        }).then((res) => {
            if (res.error) {
                alert(res.message)
            } else {
                setServicos(servicos.filter((item) => item._id !== id))
            }
        })
    }

    return (
        <Table className="w-full" headers={['Nome', 'Tipo', '']}>
            {loading ? (
                <TableRow>
                    <td className="p-2 text-center" colSpan={3}>
                        Carregando...
                    </td>
                </TableRow>
            ) : (
                servicos.map((servico, index) => (
                    <TableRow key={index}></TableRow>
                ))
            )}
            {!loading &&
                servicos.map((servico, index) => (
                    <TableRow key={index}>
                        <td className="p-2 text-center">{servico.nome}</td>
                        <td className="p-2 text-center">{servico.type}</td>
                        <td className="p-2 text-center flex items-center justify-center gap-x-4">
                            <EditarServico servico={servico} />
                            <button
                                className="text-white p-2 rounded-md bg-[#f00] text-lg hover:scale-110 transition duration-300 ease-in-out"
                                onClick={() => handleDelete(servico._id)}
                            >
                                <FaTrashAlt />
                            </button>
                        </td>
                    </TableRow>
                ))}
        </Table>
    )
}

export default ServicosList
