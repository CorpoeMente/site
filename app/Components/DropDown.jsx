'use client'
import React from 'react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { RxPerson, RxChevronDown } from 'react-icons/rx'
import { useRouter } from 'next/navigation'

const Dropdown = ({ session }) => {
    const router = useRouter()

    const handleLogout = async () => {
        router.push('/logout')
    }

    const handleProfile = async () => {
        router.push('/panel/perfil')
    }

    const handleHome = async () => {
        router.push('/')
    }

    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
                <div className="cursor-pointer flex items-center justify-center gap-x-4 bg-[#fff] dark:bg-black rounded-lg py-2 px-4">
                    <RxPerson className="dark:text-white text-2xl" />
                    <h2 className="dark:text-white text-md">
                        {session.user.nome}
                    </h2>
                    <RxChevronDown className="dark:text-white text-2xl" />
                </div>
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
                <DropdownMenu.Content
                    className="min-w-[220px] text-black bg-[#f4f4f4] dark:bg-[#202020] rounded-md px-[5px] py-[15px] shadow-md dark:shadow-[0px_0px_12px_-4px_rgba(255,_255,_255,_0.15),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
                    sideOffset={5}
                >
                    <DropdownMenu.Item
                        onClick={handleHome}
                        className="group p-6 cursor-pointer text-md leading-none dark:text-white rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-white data-[highlighted]:text-black"
                    >
                        Página Inicial
                    </DropdownMenu.Item>
                    <DropdownMenu.Item
                        onClick={handleProfile}
                        className="group p-6 cursor-pointer text-md leading-none dark:text-white rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-white data-[highlighted]:text-black"
                    >
                        Perfil
                    </DropdownMenu.Item>
                    <DropdownMenu.Item
                        onClick={handleLogout}
                        className="group p-6 cursor-pointer text-md leading-none dark:text-white rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-white data-[highlighted]:text-black"
                    >
                        Sair
                    </DropdownMenu.Item>
                    <DropdownMenu.Arrow className="fill-[#f8f8f8] dark:fill-[#202020]" />
                </DropdownMenu.Content>
            </DropdownMenu.Portal>
        </DropdownMenu.Root>
    )
}

export default Dropdown
