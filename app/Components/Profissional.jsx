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
                <div className="w-full h-1/2 lg:h-full lg:w-1/2 lg:rounded-l-xl lg:rounded-r-none rounded-t-xl  relative z-10 object-cover object-top bg-top lg:object-center  no-repeat bg-cover bg-no-repeat lg:bg-center z-10 bg-[#d0d0d0] animate-pulse"></div>
                <div className="flex flex-col items-center justify-center lg:w-1/2 h-full p-8 bg-white border-[1px] border-[#f4f4f4] rounded-b-xl lg:rounded-r-xl z-10">
                    <FaSpinner className="animate-spin text-primary text-4xl" />
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
                    <IoPersonSharp className="text-[#a0a0a0] text-[400px]" />
                </div>
            )}
            <div className="flex flex-col lg:items-end lg:justify-start lg:w-1/2 h-full p-8 bg-white border-[1px] border-[#f4f4f4] rounded-b-xl lg:rounded-r-xl z-10">
                <h1 className="text-[#606060] text-2xl xl:text-4xl font-bold mb-2">
                    {profissional.nome}
                </h1>
                <span className="text-primary text-lg xl:text-xl mb-8">
                    {profissional.cargo}
                </span>
                <p className="lg:max-w-[85%] lg:text-right text-sm lg:text-md xl:text-xl mb-8">
                    {profissional.descricao}
                </p>

                <Curriculo profissional={profissional.curriculo} />
            </div>
        </div>
    )
}

export default Profissional
