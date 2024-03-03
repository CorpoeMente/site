import React from 'react'
import { FaUserDoctor } from 'react-icons/fa6'
import { LiaFileMedicalAltSolid } from 'react-icons/lia'
const ConsultaImage = ({ color, type }) => {
    return (
        <div
            className={`w-[48px] h-[48px] rounded-lg shadow-[1px_1px_4px_1px_rgba(0,0,0,0.25)] flex flex-col items-center justify-center`}
            style={{ backgroundColor: color }}
        >
            {type === 'servico' ? (
                <FaUserDoctor className="w-[32px] h-[32px] text-white drop-shadow-[0px_0px_4px_rgba(200,200,200,0.5)]" />
            ) : (
                <LiaFileMedicalAltSolid className="w-[32px] h-[32px] text-white drop-shadow-[0px_0px_4px_rgba(200,200,200,0.5)]" />
            )}
        </div>
    )
}

export default ConsultaImage
