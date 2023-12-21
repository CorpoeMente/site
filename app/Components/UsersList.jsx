'use client'
import React, { useEffect, useState } from 'react'
import { Table, TableRow } from '.'
import { FaTrashAlt } from 'react-icons/fa'

const UsersList = () => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        const getUsers = async () => {
            const res = await fetch('/api/users')
            const usersJson = await res.json()
            setUsers(usersJson)
            console.log(usersJson)
        }
        getUsers()
    }, [])

    const deleteUser = async (id) => {
        const res = await fetch(`/api/users`, {
            method: 'DELETE',
            body: JSON.stringify({ id }),
        })
        const data = await res.json()
        setUsers(data)
    }

    return (
        <Table
            headers={['Nome', 'Email', 'Telefone', 'Função', '']}
            className="w-full"
        >
            {users &&
                users.map((user, index) => {
                    return (
                        <TableRow key={index}>
                            <td className="px-4 py-2 text-center">
                                {user.nome}
                            </td>
                            <td className="px-4 py-2 text-center">
                                {user.email}
                            </td>
                            <td className="px-4 py-2 text-center">
                                {user.telefone}
                            </td>
                            <td className="px-4 py-2 text-center">
                                {user.role.toUpperCase()}
                            </td>
                            <td className="flex items-center justify-center p-4">
                                <button
                                    className="text-white p-2 rounded-md bg-[#f00] text-lg hover:scale-110 transition duration-300 ease-in-out"
                                    onClick={() => deleteUser(user._id)}
                                >
                                    <FaTrashAlt />
                                </button>
                            </td>
                        </TableRow>
                    )
                })}
        </Table>
    )
}

export default UsersList
