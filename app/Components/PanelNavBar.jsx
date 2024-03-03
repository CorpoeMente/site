'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import { DropDown } from '.'
import { useTheme } from 'next-themes'
import { ThemeSelector } from '.'
const PanelNavBar = ({ session }) => {
    const router = useRouter()
    const { theme } = useTheme()
    const handleDashboard = () => {
        router.push('/panel')
    }

    return (
        <div className="col-span-5 h-16 bg-[#f4f4f4] card-shadow dark:bg-[#202020] rounded-lg flex items-center justify-between px-10 py-4">
            <div
                className="flex items-center justify-center py-8 cursor-pointer"
                onClick={handleDashboard}
            >
                {theme === 'dark' ? (
                    <img
                        src="/logo-white.svg"
                        alt="Logo do Espaço Clínico Corpo e Mente"
                        className="w-10 me-4"
                    />
                ) : (
                    <img
                        src="/logo-primary.svg"
                        alt="Logo do Espaço Clínico Corpo e Mente"
                        className="w-10 me-4"
                    />
                )}
                <h2 className="text-primary dark:text-white font-semibold font-urbanist text-lg">
                    Corpo e Mente
                </h2>
            </div>
            <div className="flex items-center justify-center gap-x-4">
                <ThemeSelector />
                <DropDown session={session} />
            </div>
        </div>
    )
}

export default PanelNavBar
