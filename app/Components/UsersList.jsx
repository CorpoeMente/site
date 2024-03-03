'use client'
import React, { useEffect, useState } from 'react'
import DynamicTable from './DynamicTable'
import { BiTrashAlt } from 'react-icons/bi'
import { EditarUsuario } from '.'
import { formatPhone } from '../utils/textUtils'

const UsersList = () => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        const getUsers = async () => {
            const res = await fetch('/api/users')
            const usersJson = await res.json()
            setUsers(usersJson)
        }
        getUsers()
    }, [])

    const deleteUser = async ({ _id }) => {
        const res = await fetch(`/api/users`, {
            method: 'DELETE',
            body: JSON.stringify({ _id }),
        })
        const data = await res.json()

        // filter out the deleted user
        const filteredUsers = users.filter((user) => user._id !== _id)
        setUsers(filteredUsers)
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
            format: formatPhone,
        },
        {
            key: 'role',
            label: 'Role',
        },
    ]
    const renderEdit = (user) => <EditarUsuario user={user} />

    const actions = [
        {
            key: 'edit',
            label: 'Editar',
            message: 'Usuário editado com sucesso!',
            render: renderEdit,
            custom: true,
        },
        {
            key: 'delete',
            label: 'Deletar',
            message: 'Usuário excluido com sucesso!',
            icon: (
                <BiTrashAlt className="dark:text-[#f00] text-[#a00] text-xl" />
            ),
            handleAction: deleteUser,
        },
    ]

    return <DynamicTable columns={columns} data={users} actions={actions} />
}

export default UsersList
