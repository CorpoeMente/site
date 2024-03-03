'use client'
import { useRouter } from 'next/navigation'
import { formatDateToHTML } from '../utils/textUtils'
const NovoAgendamento = ({ pedido }) => {
    const router = useRouter()
    const handleAgendamento = () => {
        const query = {
            id: pedido._id,
            nome: pedido.nome,
            email: pedido.email,
            telefone: pedido.telefone,
            cpf: pedido.cpf,
            data: formatDateToHTML(pedido.data),
            servico: pedido.servico,
        }

        router.push(
            '/panel/agendamentos/novo?' + new URLSearchParams(query).toString()
        )
    }

    return (
        <button
            onClick={handleAgendamento}
            className="dark:text-[#0f0] text-primary font-medium"
        >
            Agendar Consulta
        </button>
    )
}

export default NovoAgendamento
