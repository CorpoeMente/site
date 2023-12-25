'use client'
import React from 'react'

// create a fetch post to create an admin user

const Hero = () => {
    return (
        <section
            className="w-screen grid grid-cols-1 lg:grid-cols-2 place-content-center place-items-center justify-between px-[5%] py-[15%] lg:py-[200px] mt-[70px] relative bg-crop bg-start bg-no-repeat overflow-hidden"
            style={{ backgroundImage: `url(/background.webp)` }}
        >
            <div className="relative center-grid flex flex-col items-center xl:items-center justify-center gap-12 px-[10%] xl:px-[15%] slide-bottom z-30">
                <h1 className="text-4xl lg:text-6xl w-full xl:w-3/4 font-black text-white text-center xl:text-start drop-shadow-[0_4px_1px_rgba(0,0,0,0.35)]">
                    Cuidar do <span className="text-secondary">Corpo</span> e
                    <span className="text-secondary"> Mente</span> em um só
                    lugar
                </h1>

                <p className="text-center w-full text-white  font-regular text-lg xl:text-xl drop-shadow-[0_4px_1px_rgba(0,0,0,0.35)] xl:w-3/4 xl:text-start">
                    Encontre equilíbrio e bem-estar através de cuidados
                    especializados em
                    <span className="text-secondary font-semibold">
                        {' '}
                        psicologia, neuropsicologia e nutrição
                    </span>
                    . Nossa clínica oferece um ambiente acolhedor para apoiar
                    você em sua jornada de autocuidado.
                </p>

                <div className="flex flex-col lg:flex-row items-start gap-12 w-full xl:w-4/5">
                    <a
                        href="#contato"
                        className="bg-secondary text-white py-4 rounded-xl font-bold cursor-pointer hover:scale-110 w-full xl:w-72 text-center"
                    >
                        Entre em Contato
                    </a>
                    <a
                        href="#servicos"
                        className="border-secondary border text-white py-4  rounded-xl font-bold cursor-pointer hover:bg-secondary w-full xl:w-72 text-center"
                    >
                        Conheça Nossos Serviços
                    </a>
                </div>
            </div>

            <img
                src="logo-white.svg"
                alt=""
                className="opacity-[0.4] justify-self-center self-start center-grid pointer-events-none drop-shadow-[0_4px_1px_rgba(0,0,0,0.35)] slide-left w-2/3"
            />
        </section>
    )
}

export default Hero
