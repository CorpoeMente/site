'use client'
import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Form from './form'
import GetTokenForm from './GetTokenForm'

const Page = () => {
    const searchParams = useSearchParams()
    const token = searchParams.get('token')
    const [loading, setLoading] = useState(true)

    return (
        <div className="bg-white flex flex-col items-center justify-center w-screen h-screen">
            {token ? <Form token={token} /> : <GetTokenForm />}
        </div>
    )
}

export default Page
