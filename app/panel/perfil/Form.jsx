'use client'
import { useState } from 'react'
import Input from './Input'
import { useSession } from 'next-auth/react'

const Form = ({ user }) => {
    const [nome, setNome] = useState(user.nome)
    const [email, setEmail] = useState(user.email)
    const [password, setPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmNewPassword, setConfirmNewPassword] = useState('')
    const [telefone, setTelefone] = useState(user.telefone || '')
    const { update } = useSession()
    const [error, setError] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()

        if (newPassword !== confirmNewPassword) {
            setError('As senhas não coincidem. Verifique a nova senha e a confirmação dela.')
            return
        }

        fetch('/api/users', {
            method: 'PUT',
            body: JSON.stringify({
                _id: user._id,
                nome,
                email,
                telefone,
                password,
                newPassword,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.error) {
                    setError(data.error)
                } else {
                    setError(false)
                    updateUser()
                }
            })
            .catch((err) => setError(err))
    }

    const updateUser = async () => {
        await update(
            {
                _id: user._id,
                nome,
                email,
                telefone,
                role: user.role,
            },
            true
        )

        window.location.href = '/panel'
    }
    return (
        <form
            className="grid grid-cols-2 grid-rols-auto gap-y-8 gap-x-8 w-full mt-8 relative"
            onSubmit={handleSubmit}
        >
            {error && <span className="text-[#f00] absolute -top-24 left-1/2 transform -translate-x-1/2 font-bold text-md">{error}</span>}
            <Input
                nome="Nome"
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
            />
            <Input
                nome="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <Input
                nome="Telefone"
                type="text"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
                mask={'(99) 99999-9999'}
            />

            <div className="col-span-2 h-[1px] bg-black"></div>
            <div className="col-span-2 flex flex-col items-start">
                <span className="dark:text-white text-lg">Alterar Senha</span>
                <small className="dark:text-[#a0a0a0] text-[#333] text-sm">
                    Caso desejado, preencha os campos abaixo para alterar sua
                    senha.
                </small>
            </div>
            <fieldset>
                <label className="dark:text-white text-bold">Senha Atual</label>
                <Input
                    nome="Senha Atual"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </fieldset>

            <br></br>
            <fieldset>
                <label className="dark:text-white text-bold">Nova Senha</label>
                <Input
                    nome="Nova senha"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />{' '}
            </fieldset>
            <fieldset>
                <label className="dark:text-white text-bold">Confirmar Nova Senha</label>
                <Input
                    nome="Confirmar nova senha"
                    type="password"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                />{' '}
            </fieldset>

            <button className="col-span-2 bg-primary dark:bg-secondary hover:scale-110 transition duration-300 ease-in-out text-white dark:text-white py-2 rounded-lg">
                Salvar
            </button>
        </form>
    )
}

export default Form
