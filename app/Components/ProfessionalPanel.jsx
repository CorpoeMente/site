'use client'
import { CiLogout, CiTimer, CiBoxList } from 'react-icons/ci'
import { RxComponent2 } from 'react-icons/rx'
import { useRouter } from 'next/navigation'
export default function AdminPanel() {
    const { push } = useRouter()

    const handleLogout = () => {
        push('/logout')
    }

    const handleAgendamentos = () => {
        push('/panel/agendamentos')
    }

    const handleDashboard = () => {
        push('/panel')
    }

    const handleAgenda = () => {
        push('/panel/agenda')
    }
    return (
        <aside className="rounded-lg row-span-1 row-start-2 w-72 flex flex-col items-center justify-between bg-[#f4f4f4] dark:bg-[#202020] card-shadow">
            <nav className="w-full my-auto">
                <ul className="flex flex-col items-center justify-center dark:text-white gap-y-2">
                    <li
                        onClick={handleDashboard}
                        className={`flex items-center justify-start gap-x-4 px-12 py-2 focus:outline-none outline-none hover:bg-[#e0e0e0] hover:text-black transition duration-300 ease-in-out w-full text-md font-semibold cursor-pointer`}
                    >
                        <RxComponent2 />
                        Painel
                    </li>
                    <li
                        onClick={handleAgenda}
                        className={`flex items-center justify-start gap-x-4 px-12 py-2 focus:outline-none outline-none hover:bg-[#e0e0e0] hover:text-black transition duration-300 ease-in-out w-full text-md font-semibold cursor-pointer`}
                    >
                        <CiBoxList />
                        Minha Agenda
                    </li>
                    <li
                        onClick={handleAgendamentos}
                        className={`flex items-center justify-start gap-x-4 px-12 py-2 focus:outline-none outline-none hover:bg-[#e0e0e0] hover:text-black transition duration-300 ease-in-out w-full text-md font-semibold cursor-pointer`}
                    >
                        <CiTimer />
                        Meus Agendamentos
                    </li>
                </ul>
            </nav>

            <div className="w-full">
                <hr className="w-3/4 border-black dark:border-[#e0e0e0] mx-auto mb-4"></hr>
                <button
                    className="flex items-center justify-center dark:text-white py-2 hover:bg-[#e0e0e0] hover:text-black transition duration-300 ease-in-out w-full text-lg font-semibold cursor-pointer mb-4"
                    onClick={handleLogout}
                >
                    <CiLogout />
                    <span className="ms-2">Sair</span>
                </button>
            </div>
        </aside>
    )
}
