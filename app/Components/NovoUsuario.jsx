'use client'
import React, { useState } from 'react'
import { Modal } from '.'
import InputMask from 'react-input-mask'

const NovoUsuario = () => {
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [telefone, setTelefone] = useState('')
    const [password, setSenha] = useState('')
    const [confirmarSenha, setConfirmarSenha] = useState('')
    const [role, setRole] = useState('')
    const [erro, setErro] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setErro('')
        if (password !== confirmarSenha) {
            setErro('Senhas não conferem')
            setLoading(false)
            return
        }
        const usuario = { nome, email, password, role, telefone }
        try {
            const res = await fetch('/api/users', {
                method: 'POST',
                body: JSON.stringify(usuario),
            })
            const json = await res.json()
            if (!res.ok) throw new Error(json.message)
            window.location.href = '/panel/usuarios'
        } catch (err) {
            setErro(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Modal
            buttonText={'Novo Usuário'}
            title={'Novo Usuário'}
            className="!mt-0 self-end mb-2 !py-2 !px-4 font-normal dark:bg-transparent dark:border-[1px] dark:border-[#fff] hover:dark:bg-[#202020] hover:dark:text-white hover:dark:scale-100"
        >
            <form
                onSubmit={handleSubmit}
                className="flex flex-col items-center justify-center gap-y-8"
            >
                {erro && (
                    <div className="text-center text-[#f00] mb-4" role="alert">
                        {erro}
                    </div>
                )}
                <input
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    type="text"
                    placeholder="Nome"
                    className="w-full dark:bg-black dark:text-white border-2 border-primary rounded-lg p-2 mb-4"
                    required
                    autoComplete="name"
                />
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="Email"
                    className="w-full dark:bg-black dark:text-white border-2 border-primary rounded-lg p-2 mb-4"
                    required
                    autoComplete="email"
                />
                <InputMask
                    value={telefone}
                    mask="(99) 99999-9999"
                    onChange={(e) => setTelefone(e.target.value)}
                    type="text"
                    placeholder="Telefone"
                    className="w-full dark:bg-black dark:text-white border-2 border-primary rounded-lg p-2 mb-4"
                    required
                    autoComplete="cellphone"
                />
                <input
                    value={password}
                    onChange={(e) => setSenha(e.target.value)}
                    type="password"
                    placeholder="Senha"
                    className="w-full dark:bg-black dark:text-white border-2 border-primary rounded-lg p-2 mb-4"
                    required
                    autoComplete="new-password"
                />
                <input
                    value={confirmarSenha}
                    onChange={(e) => setConfirmarSenha(e.target.value)}
                    type="password"
                    placeholder="Confirmar Senha"
                    className="w-full dark:bg-black dark:text-white border-2 border-primary rounded-lg p-2 mb-4"
                    required
                    autoComplete="new-password"
                />
                <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full dark:bg-black dark:text-white border-2 border-primary rounded-lg p-2 mb-4"
                    required
                    autoComplete="role"
                >
                    <option value="">Selecione um perfil</option>
                    <option value="admin">Administrador</option>
                    <option value="assistant">Atendimento</option>
                </select>

                <button
                    type="submit"
                    className="w-full bg-primary text-white rounded-lg p-2 mb-4"
                    disabled={loading}
                >
                    {loading ? 'Cadastrando...' : 'Cadastrar'}
                </button>
            </form>
        </Modal>
    )
}

export default NovoUsuario
