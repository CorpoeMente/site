'use client'
import React from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { FaTimes } from 'react-icons/fa'

const Modal = ({
    buttonText,
    title,
    children,
    className,
    variant = 'button',
    close = null,
}) => {
    return (
        <Dialog.Root>
            <Dialog.Trigger asChild>
                {
                    {
                        button: (
                            <button
                                className={`text-white bg-primary font-bold mt-8 lg:mt-auto py-2 lg:py-4 text-xl  rounded-lg shadow-lg hover:from-0% hover:scale-110 hover:bg-secondary hover:text-primary transition ease-in-out duration-300 ${className} `}
                            >
                                {buttonText}
                            </button>
                        ),
                        link: (
                            <a className={className} href="#">
                                {buttonText}
                            </a>
                        ),
                    }[variant]
                }
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className="backdrop-blur bg-[#00000020] z-40 fixed top-0 left-0 bottom-0 right-0" />
                <Dialog.Content className="bg-white dark:bg-[#202020] w-[800px] h-[800px] max-h-[90vh] overflow-y-auto max-w-[90vw] lg:max-w-[80vw] rounded-xl shadow-xl z-40 fixed left-1/2 top-1/2 transform -translate-y-1/2 -translate-x-1/2 z-50 p-8">
                    <Dialog.Title className="text-2xl text-primary dark:text-white font-bold  mb-12">
                        {title}
                    </Dialog.Title>

                    {children}

                    <Dialog.Close asChild>
                        {close ? (
                            close
                        ) : (
                            <button
                                className="text-[#000] dark:text-white absolute top-6 right-6 hover:scale-150 transition duration-300 ease-in-out"
                                aria-label="Close"
                            >
                                <FaTimes />
                            </button>
                        )}
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}

export default Modal
