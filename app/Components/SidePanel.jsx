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
import { FaUserDoctor } from 'react-icons/fa6'
import { useRouter } from 'next/navigation'
import { CgWorkAlt } from 'react-icons/cg'
export default function SidePanel() {
    const router = useRouter()

    const handleLogout = () => {
        router.push('/logout')
    }

    const handleAgendamentos = () => {
        router.push('/panel/agendamentos')
    }

    const handleMensagens = () => {
        router.push('/panel/mensagens')
    }

    const handleUsuarios = () => {
        router.push('/panel/usuarios')
    }

    const handleDashboard = () => {
        router.push('/panel')
    }

    const handlePedidos = () => {
        router.push('/panel/pedidos')
    }

    const handleServicos = () => {
        router.push('/panel/servicos')
    }

    const handleDepartamentos = () => {
        router.push('/panel/departamentos')
    }

    const handleProfissionais = () => {
        router.push('/panel/profissionais')
    }

    return (
        <aside className="w-72 h-screen flex flex-col items-center justify-between bg-[#202020] shadow-[2px_0px_16px_4px_rgba(0,0,0,0.3)]">
            <div
                className="flex items-center justify-center py-8 cursor-pointer"
                onClick={handleDashboard}
            >
                <img
                    src="/logo-white.svg"
                    alt="Logo do Espaço Clínico Corpo e Mente"
                    className="w-10 me-4"
                />
                <h2 className="text-white font-black text-lg">Corpo e Mente</h2>
            </div>

            <nav className="w-full">
                <ul className="flex flex-col items-center justify-center text-white gap-y-2">
                    <li
                        onClick={handleAgendamentos}
                        className="flex items-center justify-start gap-x-4 px-12 py-2 hover:bg-[#e0e0e0] hover:text-black transition duration-300 ease-in-out w-full text-md font-semibold cursor-pointer"
                    >
                        <CiTimer />
                        Agendamentos
                    </li>
                    <li
                        onClick={handlePedidos}
                        className="flex  items-center justify-start gap-x-4 px-12 py-2 hover:bg-[#e0e0e0] hover:text-black transition duration-300 ease-in-out w-full text-md font-semibold cursor-pointer"
                    >
                        <CiBoxList />
                        Pedidos
                    </li>
                    <li
                        onClick={handleMensagens}
                        className="flex items-center justify-start gap-x-4 px-12 py-2 hover:bg-[#e0e0e0] hover:text-black transition duration-300 ease-in-out w-full text-md font-semibold cursor-pointer"
                    >
                        <CiChat2 />
                        Mensagens
                    </li>
                    <li
                        onClick={handleUsuarios}
                        className="flex items-center justify-start gap-x-4 px-12 py-2 hover:bg-[#e0e0e0] hover:text-black transition duration-300 ease-in-out w-full text-md font-semibold cursor-pointer"
                    >
                        <CiUser />
                        Usuários
                    </li>
                    <li
                        onClick={handleServicos}
                        className="flex items-center justify-start gap-x-4 px-12 py-2 hover:bg-[#e0e0e0] hover:text-black transition duration-300 ease-in-out w-full text-md font-semibold cursor-pointer"
                    >
                        <CiWavePulse1 />
                        Serviços
                    </li>
                    <li
                        onClick={handleDepartamentos}
                        className="flex items-center justify-start gap-x-4 px-12 py-2 hover:bg-[#e0e0e0] hover:text-black transition duration-300 ease-in-out w-full text-md font-semibold cursor-pointer"
                    >
                        <CiBank />
                        Departamentos
                    </li>
                    <li
                        onClick={handleProfissionais}
                        className="flex items-center justify-start gap-x-4 px-12 py-2 hover:bg-[#e0e0e0] hover:text-black transition duration-300 ease-in-out w-full text-md font-semibold cursor-pointer"
                    >
                        <FaUserDoctor className="text-sm" />
                        Profissionais
                    </li>
                </ul>
            </nav>

            <div className="w-full">
                <hr className="w-3/4 bg-[#e0e0e0] mx-auto mb-4"></hr>
                <button
                    className="flex items-center justify-center text-white py-2 hover:bg-[#e0e0e0] hover:text-black transition duration-300 ease-in-out w-full text-lg font-semibold cursor-pointer mb-4"
                    onClick={handleLogout}
                >
                    <CiLogout />
                    <span className="ms-2">Sair</span>
                </button>
            </div>
        </aside>
    )
}
