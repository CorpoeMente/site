import React from 'react'
import { SidePanel, AgendamentosList } from '@/app/Components'
import { authOptions } from '@/app/utils/auth'
import { getServerSession } from 'next-auth'
import Login from '../../(auth)/login/page'
export default async function page() {
    const session = await getServerSession(authOptions)
    if (!session) return <Login />
    return (
        <div className="flex items-center justify-center">
            <SidePanel />

            <div className="w-full h-screen  flex flex-col items-start justify-start bg-white p-12">
                <AgendamentosList />
            </div>
        </div>
    )
}
