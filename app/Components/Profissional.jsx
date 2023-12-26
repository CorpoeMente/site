import React from 'react'
import { Curriculo } from '.'
import { FaSpinner } from 'react-icons/fa'
import { IoPersonSharp } from 'react-icons/io5'
const Profissional = ({ profissional }) => {
    if (!profissional) {
        return (
            <div
                className="w-full max-w-[80vw] flex flex-col lg:flex-row items-center justify-center h-[800px] lg:h-[800px] mt-16 rounded-xl card-shadow relative self-center"
                id="profissional"
            >
                <img
                    src="./dots.svg"
                    className="absolute top-[-12%] right-[-7%] pointer-events-none"
                />
                <div className="w-full grid grid-rows-1 grid-cols-1 bg-[#d0d0d0] place-items-center h-1/2 lg:h-full lg:w-1/2 lg:rounded-l-xl lg:rounded-r-none rounded-t-xl  relative z-10">
                    <img
                        src="./logo-white.svg"
                        className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 w-2/3 opacity-[0.2]"
                    />
                </div>
                <div className="flex flex-col items-center justify-start lg:w-1/2 h-full py-8 px-4 lg:p-8 bg-white border-[1px] border-[#f4f4f4] rounded-b-xl lg:rounded-r-xl z-10">
                    <h2 className="text-xl xl:text-3xl text-primary font-bold w-full text-center">
                        Em breve contaremos com profissionais para atender
                        outras especialidades.
                    </h2>
                    <p className="text-primary font-regular mt-16 w-full">
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Descubra
                        a diversidade de especialidades em nossa clínica! Além
                        dos serviços de psicologia, neuropsicologia e psicologia
                        infantil, estamos expandindo para oferecer em breve
                        atendimentos em{' '}
                        <b className="text-secondary">fonoaudiologia</b>,{' '}
                        <b className="text-secondary">nutrição</b>,{' '}
                        <b className="text-secondary">fisioterapia</b>,{' '}
                        <b className="text-secondary">psiquiatria</b> e{' '}
                        <b className="text-secondary">curativos de feridas</b>.
                    </p>
                    <p className="text-primary font-regular mt-4 w-full text-center">
                        <a
                            href="https://instagram.com/clinicacorpoemente_"
                            target="_blank"
                            className="text-primary font-bold"
                        >
                            Nos acompanhe nas redes sociais para ficar por
                            dentro das novidades!
                        </a>
                    </p>
                </div>
            </div>
        )
    }

    return (
        <div
            className="w-full max-w-[80vw] flex flex-col lg:flex-row items-center justify-center h-[800px] lg:h-[800px] mt-16 rounded-xl card-shadow relative self-center"
            id="profissional"
        >
            <img
                src="./dots.svg"
                className="absolute top-[-12%] right-[-7%] pointer-events-none"
            />
            {profissional.imagem ? (
                <div
                    className="w-full h-1/2 lg:h-full lg:w-1/2 lg:rounded-l-xl lg:rounded-r-none rounded-t-xl  relative z-10 object-cover object-top bg-top lg:object-center  no-repeat bg-cover bg-no-repeat lg:bg-center z-10"
                    style={{
                        backgroundImage: `url(${profissional.imagem})`,
                    }}
                ></div>
            ) : (
                <div className="w-full grid grid-rows-1 grid-cols-1 bg-[#d0d0d0] place-items-center h-1/2 lg:h-full lg:w-1/2 lg:rounded-l-xl lg:rounded-r-none rounded-t-xl  relative z-10">
                    <img
                        src="./logo-white.svg"
                        className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 w-2/3 opacity-[0.2]"
                    />
                </div>
            )}
            <div className="flex flex-col lg:items-start lg:justify-start lg:w-1/2 h-full p-8 xl:p-12 bg-white border-[1px] border-[#f4f4f4] rounded-b-xl lg:rounded-r-xl z-10">
                <h1 className="text-[#606060] text-2xl xl:text-4xl font-bold mb-2">
                    {profissional.nome}
                </h1>
                <span className="text-primary text-lg xl:text-xl mb-8">
                    {profissional.cargo}
                </span>
                <p
                    className="lg:max-w-full lg:text-left text-sm lg:text-lg mb-8"
                    dangerouslySetInnerHTML={{ __html: profissional.descricao }}
                ></p>

                <Curriculo profissional={profissional} />
            </div>
        </div>
    )
}

export default Profissional
