'use client'
import React, { useState } from 'react'
import { Nav, Footer } from '../Components'
import { FaSearch } from 'react-icons/fa'
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
        <>
            <Nav />

            <div className="flex flex-col items-center mt-[80px] px-8 xl:px-24 py-12">
                <div className="relative group flex w-2/3 mt-4 mb-16 outline-none">
                    <FaSearch className="absolute left-8 top-1/2 transform -translate-y-1/2 text-primary text-2xl cursor-pointer group-focus:text-secondary group-hover:text-secondary" />
                    <input
                        type="text"
                        placeholder="Pesquise seu plano de saúde..."
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value)
                            filterPlanos(e.target.value)
                        }}
                        className="peer border-b-2 border-t-0 border-l-0 border-r-0 border-primary ps-20 py-2 text-md md:text-lg xl:text-xl font-bold text-primary bg-[#ffffff00] focus:text-primary focus:border-secondary outline-none focus:outline-none transition duration-300 ease-in-out w-full focus:ring-0"
                    />
                </div>
                {planosFiltered.length === 0 && (
                    <span className="text-primary text-lg mb-8">
                        Nenhum plano encontrado!
                    </span>
                )}
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
            <Footer />
        </>
    )
}

export default Planos
