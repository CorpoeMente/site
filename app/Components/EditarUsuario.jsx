'use client'
import React, { useState } from 'react'
import { Modal } from '../Components'
import { FaPencil } from 'react-icons/fa6'
import InputMask from 'react-input-mask'

const EditarUsuario = ({ user }) => {
    const [nome, setNome] = useState(user.nome)
    const [email, setEmail] = useState(user.email)
    const [telefone, setTelefone] = useState(user.telefone)
    const [role, setRole] = useState(user.role)
    const [loading, setLoading] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()

        fetch('/api/users', {
            method: 'PUT',
            body: JSON.stringify({
                _id: user._id,
                nome,
                email,
                telefone,
                role,
            }),
        })
            .then((res) => res.json())
            .then((res) => {
                if (res.error) {
                    alert(res.message)
                } else {
                    window.location.reload()
                }
            })
    }

    return (
        <Modal
            buttonText={<FaPencil />}
            title={'Editar Usuário'}
            className={
                'w-auto !p-0 !m-0 !text-sm !bg-transparent hover:bg-transparent dark:hover:text-[#fff] dark:!text-[#fff] !text-[#f8be00]'
            }
        >
            <div className="flex flex-col w-full mt-auto gap-y-8 items-center justify-center">
                <form onSubmit={handleSubmit}>
                    <fieldset>
                        <input
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            type="text"
                            placeholder="Nome"
                            className="w-full border-2 border-primary dark:bg-black rounded-lg p-2 mb-4"
                            required
                            autoComplete="name"
                        />
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            placeholder="Email"
                            className="w-full border-2 border-primary dark:bg-black rounded-lg p-2 mb-4"
                            required
                            autoComplete="email"
                        />
                        <InputMask
                            value={telefone}
                            mask="(99) 99999-9999"
                            onChange={(e) => setTelefone(e.target.value)}
                            type="text"
                            placeholder="Telefone"
                            className="w-full border-2 border-primary dark:bg-black rounded-lg p-2 mb-4"
                            required
                            autoComplete="phone"
                        />
                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="w-full border-2 border-primary dark:bg-black rounded-lg p-2 mb-4"
                            required
                            autoComplete="role"
                        >
                            <option value="admin">Admin</option>
                            <option value="assistant">Atendimento</option>
                        </select>
                    </fieldset>
                    <button
                        type="submit"
                        className="w-full bg-primary text-white rounded-lg p-2 mb-4"
                    >
                        Salvar
                    </button>
                </form>
            </div>
        </Modal>
    )
}

export default EditarUsuario
