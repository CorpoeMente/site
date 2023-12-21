'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useSession } from 'next-auth/react'

const Form = () => {
    const router = useRouter()
    const session = useSession()

    if (session.status === 'authenticated') {
        router?.push('/my/dashboard')
    }

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: {
            nome: '',
            email: '',
            celular: '',
            password: '',
        },
    })

    const [message, setMessage] = useState('')

    const formSubmit = async (form) => {
        const { fullName, email, password } = form

        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nome,
                    email,
                    password,
                }),
            })
            res.status === 201 &&
                router.push('/login?success=Account has been created')
        } catch (err) {
            setMessage(err)
        }
    }

    return (
        <form
            onSubmit={handleSubmit(formSubmit)}
            autoComplete="off"
            className={`-mt-2 flex justify-center items-center flex-col`}
        >
            <fieldset className="w-full mx-4 flex justify-center items-center flex-col">
                <div className="w-full px-2">
                    <label className="text-sm">First Name</label>
                    <input
                        {...register('nome', {
                            required: 'Nome é obrigatório',
                        })}
                        type="text"
                        autoComplete="false"
                        className="p-3 w-full border-solid border-[1px] border-[#EAECEF]"
                    />
                    {errors.fullName?.message && (
                        <small className="block text-red-600">
                            {errors.nome.message}
                        </small>
                    )}
                </div>
                <div className="w-full px-2">
                    <label className="text-sm">Email</label>
                    <input
                        {...register('email', {
                            required: 'Email é obrigatório',
                            pattern: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                        })}
                        type="email"
                        autoComplete="off"
                        className="p-3 w-full border-solid border-[1px] border-[#EAECEF]"
                    />
                    {errors.email?.message && (
                        <small className="block text-red-600">
                            {errors.email.message}
                        </small>
                    )}
                </div>

                <div className="w-full px-2">
                    <label className="text-sm">Celular</label>
                    <input
                        {...register('celular', {
                            required: 'Celular é obrigatório',
                        })}
                        type="text"
                        autoComplete="off"
                        className="p-3 w-full border-solid border-[1px] border-[#EAECEF]"
                    />
                    {errors.celular?.message && (
                        <small className="block text-red-600">
                            {errors.celular.message}
                        </small>
                    )}
                </div>

                <div className="w-full px-2">
                    <label className="text-sm">Password</label>
                    <input
                        type="password"
                        {...register('senha', {
                            required: 'Digite sua senha!',
                        })}
                        autoComplete="new-password"
                        className="p-3 w-full border-solid border-[1px] border-[#EAECEF]"
                    />
                    {errors.senha?.message && (
                        <small className="block text-red-600">
                            {errors.senha.message}
                        </small>
                    )}
                </div>
            </fieldset>
            <div className="flex flex-col w-full items-center px-2">
                <p className="w-full text-left">
                    <Link
                        href="/login"
                        className="text-lightColor hover:text-primaryColor hover:underline"
                    >
                        {' '}
                        Login with an existing account
                    </Link>
                </p>
                {message && (
                    <small className="block text-red-600">{message}</small>
                )}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="text-center my-12 flex-1 w-full bg-green-700 hover:bg-white hover:text-green-700 hover:border-green-700 hover:border-[1px] hover:font-semibold rounded-md p-[1rem] px-4 mx-2  text-white cursor-pointer"
                >
                    Register
                </button>
            </div>
        </form>
    )
}

export default Form
