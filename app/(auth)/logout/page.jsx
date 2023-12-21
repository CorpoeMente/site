'use client'
import { signOut } from 'next-auth/react'

const page = () => {
    signOut(
        {
            callbackUrl: '/login',
        },
        { redirect: false }
    )
    return
}

export default page
