import React from 'react'
import { SidePanel, PedidosList } from '@/app/Components'

const page = () => {
    return (
        <div className="flex items-center justify-center">
            <SidePanel />

            <div className="w-full h-screen  flex flex-col items-start justify-start bg-white p-12">
                <PedidosList />
            </div>
        </div>
    )
}

export default page
