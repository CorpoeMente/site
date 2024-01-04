import React from 'react'

const Icone = ({ departamento, setActive, active, Icone = null }) => {
    const handleClick = () => {
        setActive(departamento._id)
        const profissionaisDiv = document.getElementById('profissional')
        profissionaisDiv.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <div
            className={`flex flex-row items-center justify-start text-lg  font-light  bg-[#fcfcfc]  gap-4 cursor-pointer p-4 rounded-xl w-auto border-2 border-[#a0a0a] relative z-30   ${
                active === departamento._id
                    ? `text-primary !bg-secondary shadow-[0px_0px_4px_2px_rgba(0,0,0,0.2)] hover:text-white border-secondary`
                    : 'text-primary'
            } hover:bg-[#e1e9eC] hover:text-primary transition-all`}
            onClick={handleClick}
        >
            <div
                className={`rounded-lg shadow w-16 h-16 relative`}
                style={{ backgroundColor: departamento.color }}
            >
                {Icone ? (
                    <Icone className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 text-6xl text-white drop-shadow-xl" />
                ) : (
                    <img
                        src={departamento.img}
                        alt={departamento.name}
                        className="absolute !min-w-32 top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 pointer-events-none"
                    />
                )}
            </div>
            <span
                className={`text-xl font-bold mx-auto whitespace-nowrap ${
                    active === departamento._id
                        ? 'drop-shadow-[0px_0px_2px_rgba(255,255,255,0.2)]'
                        : ''
                }`}
            >
                {departamento.name}
            </span>
        </div>
    )
}

export default Icone
