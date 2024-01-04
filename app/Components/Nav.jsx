'use client'
import React from 'react'
import { RxHamburgerMenu, RxCross2 } from 'react-icons/rx'
import * as Dialog from '@radix-ui/react-dialog'
import { FaRegUser } from 'react-icons/fa'
import Image from 'next/image'

const Nav = () => {
    const handleHomeNavigate = () => {
        window.location.href = '/'
    }
    return (
        <nav className="fixed grid grid-cols-1 place-content-center place-items-center top-0 left-0 w-screen flex items-center justify-between bg-[#fffffffc] px-[10%] 2xl:px-[15%] h-[70px] z-40 shadow-xl">
            <div className="flex items-center justify-between w-full max-w-[90vw] sm:!max-w-[1900px]">
                <div
                    className="flex items-center justify-start gap-4 min-w-[50%] lg:min-w-[20%] cursor-pointer"
                    onClick={handleHomeNavigate}
                >
                    <Image
                        src="/logo-primary.svg"
                        alt="Logo da Clínica Corpo e Mente"
                        className="w-12 pointer-events-none"
                        width={48}
                        height={48}
                    />
                    <span className="lg:block text-sm lg:text-lg xl:text-2xl text-primary font-bold  drop-shadow text-center">
                        Corpo{' '}
                        <span className="text-md lg:text-lg  xl:text-xl font-medium">
                            e
                        </span>{' '}
                        Mente
                    </span>
                </div>
                <div className="invisible lg:visible flex items-center justify-between lg:text-md xl:text-lg text-primary font-bold w-2/3 max-w-[630px] 2xl:w-1/3 z-10 gap-x-8 me-[10%]">
                    <a href="/#departamentos" className="nav-btn">
                        Departamentos
                    </a>
                    <a href="/#contato" className="nav-btn">
                        Contato
                    </a>

                    <a href="/planos" className="nav-btn">
                        Planos
                    </a>
                    <a href="/#servicos" className="nav-btn text-primary">
                        Agendamentos
                    </a>
                    <a
                        href="/login"
                        className="z-10 py-2 px-4 rounded-lg bg-primary shadow-[1px_1px_4px_1px_rgba(0,0,0,0.2)] text-white text-lg !font-thin hover:bg-secondary hover:text-primary transition ease-in-out duration-300 flex items-center justify-center gap-x-2"
                    >
                        <FaRegUser className="text-xl" />
                        Entrar
                    </a>
                </div>

                <Dialog.Root>
                    <Dialog.Trigger
                        className="lg:invisible absolute right-[10%]"
                        asChild
                    >
                        <button
                            className="Button violet"
                            aria-label="Botão para expandir menu de navegação"
                        >
                            <RxHamburgerMenu className="lg:invisible text-4xl text-white cursor-pointer bg-primary rounded p-2 w-10 h-10" />
                        </button>
                    </Dialog.Trigger>
                    <Dialog.Portal>
                        <Dialog.Overlay className="DialogOverlay" />
                        <Dialog.Content className="DialogContent !h-[500px] !w-[400px]">
                            <Dialog.Title className="text-2xl font-bold  text-center">
                                Links
                            </Dialog.Title>
                            <ul className="flex flex-col items-center justify-center gap-8 list-none mt-24 font-bold text-xl">
                                <li>
                                    <Dialog.Close asChild>
                                        <a
                                            href="/#departamentos"
                                            className="nav-btn"
                                            aria-label="Close"
                                        >
                                            Departamentos
                                        </a>
                                    </Dialog.Close>
                                </li>
                                <li>
                                    <Dialog.Close asChild>
                                        <a
                                            href="/#contato"
                                            className="nav-btn"
                                            aria-label="Close"
                                        >
                                            Contato
                                        </a>
                                    </Dialog.Close>
                                </li>

                                <li>
                                    <Dialog.Close asChild>
                                        <a href="/planos" className="nav-btn">
                                            Planos
                                        </a>
                                    </Dialog.Close>
                                </li>
                                <li>
                                    <Dialog.Close asChild>
                                        <a
                                            href="/#servicos"
                                            className="nav-btn"
                                            aria-label="Close"
                                        >
                                            Agendamentos
                                        </a>
                                    </Dialog.Close>
                                </li>
                                <li>
                                    <Dialog.Close asChild>
                                        <a
                                            href="/login"
                                            className="z-10 p-2 rounded-lg bg-white shadow-[0px_0px_3px_1px_rgba(0,0,0,0.3)] text-primary hover:scale-110 transition ease-in-out duration-300"
                                            aria-label="Close"
                                        >
                                            <FaRegUser className="text-xl" />
                                        </a>
                                    </Dialog.Close>
                                </li>
                            </ul>
                            <Dialog.Close asChild>
                                <button
                                    className="IconButton"
                                    aria-label="Close"
                                >
                                    <RxCross2 className="text-[#f00] text-2xl hover:text-white hover:bg-[#f00] rounded-lg" />
                                </button>
                            </Dialog.Close>
                        </Dialog.Content>
                    </Dialog.Portal>
                </Dialog.Root>
            </div>
        </nav>
    )
}

export default Nav
