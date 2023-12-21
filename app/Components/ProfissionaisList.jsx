'use client'
import React, { useState, useEffect } from 'react'
import { Table, TableRow } from '../Components'

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
                            <td className="text-center">
                                <button className="bg-[#f00] text-white py-1 px-3 rounded my-4 self-end">
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
