import React from 'react'
import { FaLocationArrow, FaPhoneAlt, FaEnvelope } from 'react-icons/fa'
import { BsInstagram, BsFacebook, BsWhatsapp } from 'react-icons/bs'
import { Map } from '.'
import Image from 'next/image'

const Footer = () => {
    return (
        <footer className="w-screen min-h-[650px] bg-primary px-[5%] xl:px-[10%] pt-[300px] flex flex-col items-center">
            <div className="flex flex-col gap-y-24 xl:flex-row xl:items-center items-start justify-between w-screen mb-8 xl:px-[15%] max-w-[90vw] sm:!max-w-[1900px]">
                <Map />
                <div className="flex flex-col items-center  text-white self-center xl:self-start gap-y-8 gap-x-2 w-full max-w-[80vw] xl:w-1/3 h-full">
                    <div className="flex items-center justify-center gap-x-2">
                        <Image
                            alt="Logo da Clínica Corpo e Mente"
                            src="/logo-white.svg"
                            className="w-24 h-24"
                            width={96}
                            height={96}
                            lazy="true"
                        />
                        <span className="text-2xl font-bold ">
                            Clínica Corpo e <br></br>Mente
                        </span>
                    </div>
                    <div className="flex items-center gap-x-8">
                        <FaLocationArrow className="text-xl " />
                        <span className="text-md font-bold">
                            Taguatinga Norte, QNG 32 Lote 21, Brasília - DF,
                            72130-320
                        </span>
                    </div>
                    <div className="flex items-center gap-x-8">
                        <FaPhoneAlt className="text-2xl" />
                        <span className="text-md font-bold">
                            (61) 99803-6582
                        </span>
                    </div>
                    <div className="flex items-center gap-x-8">
                        <FaEnvelope className="text-2xl" />
                        <span className="text-md font-bold">
                            contato@clinicacorpoemente.com
                        </span>
                    </div>

                    <div className="flex items-start gap-x-12 mt-auto mb-8">
                        <a
                            href="https://instagram.com/clinicacorpoemente_"
                            className="bg-white p-3 rounded-full text-primary cursor-pointer hover:bg-[#e0e0e0] transition duration-300 ease-in-out"
                            aria-label="Instagram"
                        >
                            <BsInstagram className="text-2xl" />
                        </a>

                        <a
                            href="https://api.whatsapp.com/send?phone=5561998036582"
                            className="bg-white p-3 rounded-full text-primary cursor-pointer hover:bg-[#e0e0e0] transition duration-300 ease-in-out"
                            aria-label="Whatsapp"
                        >
                            <BsWhatsapp className="text-2xl" />
                        </a>
                    </div>
                </div>
                <div className="grid grid-cols-2 self-center xl:self-start  text-white max-w-[80vw] h-full gap-x-12 xl:w-1/3">
                    <span className="col-span-2 font-bold text-3xl mb-8 text-center xl:text-start">
                        Horário de Funcionamento
                    </span>
                    <span className="text-md">Segunda-Feira</span>
                    <span className="text-md text-end mb-2">08:00 - 21:20</span>

                    <span className="text-md">Terça-Feira</span>
                    <span className="text-md text-end mb-2">08:00 - 21:20</span>

                    <span className="text-md">Quarta-Feira</span>
                    <span className="text-md text-end mb-2">08:00 - 18:00</span>

                    <span className="text-md">Quinta-Feira</span>
                    <span className="text-md text-end mb-2">08:00 - 23:10</span>

                    <span className="text-md">Sexta-Feira</span>
                    <span className="text-md text-end mb-2">08:00 - 18:00</span>

                    <span className="text-md">Sábado</span>
                    <span className="text-md text-end mb-2">08:00 - 13:00</span>

                    <span className="text-md">Domingo e Feriados</span>
                    <span className="text-md text-end mb-2">Fechado</span>
                </div>
            </div>

            <hr className="w-full h-[1px] text-white mt-24 xl:mt-auto" />
            <span className="text-white text-md text-center justify-end my-4">
                © Copyright 2023 All Rights Reserved by Espaço Clínico Corpo e
                Mente | Developed by{' '}
                <a
                    href="https://github.com/Joaoaalves"
                    className="underline text-bold  cursor-pointer"
                >
                    João Alves
                </a>
            </span>
        </footer>
    )
}

export default Footer
