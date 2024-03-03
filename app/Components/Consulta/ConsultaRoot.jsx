import React from 'react'

const ConsultaRoot = ({ children }) => {
    return (
        <div className="flex flex-col items-center justify-center 2xl:grid grid-cols-6 grid-rows-1 items-center gap-4 bg-[#fff] shadow-sm dark:bg-[#000] dark:shadow-[0px_0px_8px_2px_rgba(255,255,255,0.3)] p-4 rounded-lg w-full">
            {children}
        </div>
    )
}

export default ConsultaRoot
