'use client'
import {
    CiLogout,
    CiTimer,
    CiChat2,
    CiUser,
    CiBoxList,
    CiWavePulse1,
    CiBank,
} from 'react-icons/ci'
import { RxComponent2 } from 'react-icons/rx'
import { FaUserDoctor } from 'react-icons/fa6'
import { useRouter } from 'next/navigation'
export default function AdminPanel() {
    const { push } = useRouter()

    const handleLogout = () => {
        push('/logout')
    }

    const handleAgendamentos = () => {
        push('/panel/agendamentos')
    }

    const handleMensagens = () => {
        push('/panel/mensagens')
    }

    const handleUsuarios = () => {
        push('/panel/usuarios')
    }

    const handlePedidos = () => {
        push('/panel/pedidos')
    }

    const handleServicos = () => {
        push('/panel/servicos')
    }

    const handleDepartamentos = () => {
        push('/panel/departamentos')
    }

    const handleProfissionais = () => {
        push('/panel/profissionais')
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
                        <CiTimer />
                        Agenda
                    </li>
                    <li
                        onClick={handleAgendamentos}
                        className={`flex items-center justify-start gap-x-4 px-12 py-2 focus:outline-none outline-none hover:bg-[#e0e0e0] hover:text-black transition duration-300 ease-in-out w-full text-md font-semibold cursor-pointer`}
                    >
                        <CiTimer />
                        Agendamentos
                    </li>
                    <li
                        onClick={handlePedidos}
                        className={`flex items-center justify-start gap-x-4 px-12 py-2 focus:outline-none outline-none hover:bg-[#e0e0e0] hover:text-black transition duration-300 ease-in-out w-full text-md font-semibold cursor-pointer`}
                    >
                        <CiBoxList />
                        Pedidos de Agendamentos
                    </li>
                    <li
                        onClick={handleMensagens}
                        className={`flex items-center justify-start gap-x-4 px-12 py-2 focus:outline-none outline-none hover:bg-[#e0e0e0] hover:text-black transition duration-300 ease-in-out w-full text-md font-semibold cursor-pointer`}
                    >
                        <CiChat2 />
                        Mensagens
                    </li>
                    <li
                        onClick={handleUsuarios}
                        className={`flex items-center justify-start gap-x-4 px-12 py-2 focus:outline-none outline-none hover:bg-[#e0e0e0] hover:text-black transition duration-300 ease-in-out w-full text-md font-semibold cursor-pointer`}
                    >
                        <CiUser />
                        Usuários
                    </li>
                    <li
                        onClick={handleServicos}
                        className={`flex items-center justify-start gap-x-4 px-12 py-2 focus:outline-none outline-none hover:bg-[#e0e0e0] hover:text-black transition duration-300 ease-in-out w-full text-md font-semibold cursor-pointer`}
                    >
                        <CiWavePulse1 />
                        Serviços
                    </li>
                    <li
                        onClick={handleDepartamentos}
                        className={`flex items-center justify-start gap-x-4 px-12 py-2 focus:outline-none outline-none hover:bg-[#e0e0e0] hover:text-black transition duration-300 ease-in-out w-full text-md font-semibold cursor-pointer`}
                    >
                        <CiBank />
                        Departamentos
                    </li>
                    <li
                        onClick={handleProfissionais}
                        className={`flex items-center justify-start gap-x-4 px-12 py-2 focus:outline-none outline-none hover:bg-[#e0e0e0] hover:text-black transition duration-300 ease-in-out w-full text-md font-semibold cursor-pointer`}
                    >
                        <FaUserDoctor className="text-sm" />
                        Profissionais
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
