'use client'
import { useState } from 'react'
import { Input } from '../../Components'

const Form = ({ token }) => {
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const [error, setError] = useState('')

    const handlePasswordRecovery = (e) => {
        e.preventDefault()

        if (password !== passwordConfirmation) {
            setError('As senhas não coincidem')
            return
        }

        fetch('/api/redefinir-senha', {
            method: 'PUT',
            body: JSON.stringify({ password, token }),
        })
            .then((res) => res.json())
            .then((res) => {
                if (res.error) {
                    setError(res.error)
                } else {
                    window.location.href = '/login'
                }
            })
    }

    return (
        <form
            onSubmit={handlePasswordRecovery}
            className={` flex justify-center items-center flex-col gap-y-8 px-6 py-12 shadow-[0_0px_40px_-5px_rgba(0,0,0,0.3)] rounded-md w-full max-w-[400px]`}
        >
            <a
                href="/"
                className="flex flex-col items-center justify-center w-full"
            >
                <img
                    src="/logo-primary.svg"
                    alt="Logo do Espaço Clínico Corpo e Mente"
                    className="w-20"
                />
                <h1 className="text-2xl font-bold text-primary mt-2">
                    Corpo e Mente
                </h1>
            </a>
            <fieldset className="w-full flex flex-col items-center gap-y-8">
                <Input
                    type="password"
                    label="Senha"
                    state={password}
                    setState={setPassword}
                    className={'!max-w-[100%]'}
                    required
                />

                <Input
                    type="password"
                    label="Confirme sua senha"
                    state={passwordConfirmation}
                    setState={setPasswordConfirmation}
                    className={'!max-w-[100%]'}
                    required
                />
            </fieldset>

            <button className="bg-primary hover:bg-secondary w-full max-w-[400px] py-3 rounded-lg text-white font-bold text-xl  transition duration-300 ease-in-out mt-6">
                Redefinir Senha
            </button>
            {error && (
                <small className="block w-full px-2 text-red-600">
                    {error}
                </small>
            )}
        </form>
    )
}

export default Form
