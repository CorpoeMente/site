import mongoose from 'mongoose'
import Servico from './Servico'
const PedidoAgendamentoSchema = new mongoose.Schema(
    {
        nome: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        telefone: {
            type: String,
            required: true,
        },
        cpf: {
            type: String,
            required: true,
        },
        servico: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Servico',
        },
        mensagem: {
            type: String,
            required: true,
        },
        data: {
            type: Date,
            required: true,
        },
        documentStatus: {
            type: String,
            enum: ['ativo', 'lixeira'],
            required: true,
            default: 'ativo',
        },
    },
    { timestamps: true }
)

export default mongoose.models.PedidoAgendamento ||
    mongoose.model('PedidoAgendamento', PedidoAgendamentoSchema)
