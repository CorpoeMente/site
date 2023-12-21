'use client'
import React, { useState, useEffect } from 'react'
import { Table, TableRow, EditarDepartamento } from '../Components'
import { FaTrashAlt } from 'react-icons/fa'

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

    const handleDelete = (id) => {
        fetch(`/api/departamentos`, {
            method: 'DELETE',
            body: JSON.stringify({ id: id }),
        })
            .then((res) => res.json())
            .then((res) => {
                if (res.error) {
                    //
                } else {
                    //
                    setDepartamentos(
                        departamentos.filter((item) => item._id !== id)
                    )
                }
            })
    }
    return (
        <Table className="w-full" headers={['Nome', 'imagem', '']}>
            {loading ? (
                <TableRow>
                    <td colSpan={3}>Carregando...</td>
                </TableRow>
            ) : (
                departamentos.map((departamento, index) => (
                    <TableRow key={index}>
                        <td className="p-2 text-center">{departamento.name}</td>
                        <td className="p-2 text-center">{departamento.img}</td>
                        <td className="p-2 text-center flex items-center justify-center gap-x-4">
                            <button
                                className="text-white p-2 rounded-md bg-[#f00] text-lg hover:scale-110 transition duration-300 ease-in-out"
                                onClick={() => handleDelete(departamento._id)}
                            >
                                <FaTrashAlt />
                            </button>

                            <EditarDepartamento departamento={departamento} />
                        </td>
                    </TableRow>
                ))
            )}
        </Table>
    )
}

export default DepartamentosList
