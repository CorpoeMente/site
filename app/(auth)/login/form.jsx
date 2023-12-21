'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn, useSession } from 'next-auth/react'
import { Input } from '../../Components'
import { ImSpinner8 } from 'react-icons/im'

const Form = () => {
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const formSubmit = (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        signIn('credentials', {
            email,
            password,
            callbackUrl: `${window.location.origin}/panel`,
        }).then((res) => {
            if (res.error) {
                setError('Email e/ou senha incorretos')
            }
            setLoading(false)
        })
    }

    return (
        <form
            onSubmit={formSubmit}
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
            {loading ? (
                <ImSpinner8 className="animate-spin text-primary text-4xl" />
            ) : (
                <fieldset className="w-full flex flex-col items-center gap-y-8">
                    <Input
                        type="email"
                        label="Email"
                        state={email}
                        setState={setEmail}
                        className={'!max-w-[100%]'}
                        required
                    />
                    <Input
                        type="password"
                        label="Senha"
                        state={password}
                        setState={setPassword}
                        className={'!max-w-[100%]'}
                        required
                    />
                </fieldset>
            )}

            <button className="bg-primary hover:bg-secondary w-full max-w-[400px] py-3 rounded-lg text-white font-bold text-xl  transition duration-300 ease-in-out mt-6">
                Log In
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
