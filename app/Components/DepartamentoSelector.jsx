import React from 'react'
import { Icone } from '.'

const DepartamentoSelector = ({ deps, active, setActive }) => {
    return (
        <div className="flex items-start overflow-x-auto md:self-start gap-4 lg:gap-8 max-w-[80vw] scrollbar-hidden py-2 px-2">
            {deps.map((departamento, index) => (
                <Icone
                    key={index}
                    departamento={departamento}
                    setActive={setActive}
                    active={active}
                    Icone={departamento.Icone}
                />
            ))}
        </div>
    )
}

export default DepartamentoSelector
