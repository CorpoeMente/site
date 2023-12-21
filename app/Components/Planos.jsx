'use client'
import React, { useState } from 'react'
import { Modal } from '.'

const Planos = () => {
    const [search, setSearch] = useState('')
    const [planos, setPlanos] = useState([
        'AFEB',
        'ALLIANZ',
        'BACEN',
        'BNDES',
        'CAESAN',
        'CAPESESP',
        'CASEMBRAPA',
        'CBMDF',
        'CODEVASP',
        'CONAB',
        'E-VIDA',
        'EMBRATEL/TELOS',
        'FEPES/BNDES',
        'FASCAL',
        'FUSEX',
        'GAMA SAÚDE',
        'INAS',
        'NOTREDAME/INTERMÉDICA',
        'OMINT',
        'PLAN ASSISTE (MPDFT/MPF/MPM/MPT)',
        'POSTAL SAÚDE',
        'PROASA',
        'REAL GRANDEZA',
        'SAMP/AGMP',
        'SIS',
        'SERPRO',
        'STF-MED',
        'STM-PLAS/JMU',
        'TJDF PRO SAÚDE',
        'TRE',
        'TRE PRO SOCIAL',
        'TRT',
        'TST',
        'UNAFISCO',
        'UNIMEDV TRP',
    ])

    const [planosFiltered, setPlanosFiltered] = useState(planos)

    const filterPlanos = (search) => {
        const filtered = planos.filter((plano) =>
            plano.toLowerCase().includes(search.toLowerCase())
        )
        setPlanosFiltered(filtered)
    }

    return (
        <Modal
            title="Planos de saúde que atendemos"
            buttonText="Planos"
            variant="link"
            className="nav-btn"
        >
            <div className="flex flex-col items-center w-w-[800px] h-[800px] max-w-[90vw] lg:max-w-[80vw] h-full">
                <input
                    type="text"
                    placeholder="Pesquise por um plano..."
                    className="w-full h-12 border-[1px] border-[#f4f4f4] rounded-lg p-4 mb-8"
                    onChange={(e) => {
                        setSearch(e.target.value)
                        filterPlanos(e.target.value)
                    }}
                    value={search}
                />
                <ul className="w-full h-3/4 overflow-y-auto px-4">
                    {planosFiltered.map((plano, index) => (
                        <li
                            key={index}
                            className="border-b-[1px] border-[#a0a0a090] w-full p-4"
                        >
                            <span className="text-primary text-lg ">
                                {plano}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </Modal>
    )
}

export default Planos
