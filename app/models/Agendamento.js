import mongoose from 'mongoose'
const AgendamentoSchema = new mongoose.Schema(
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
            required: true,
        },
        profissional: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Profissional',
            required: true,
        },
        date: {
            type: Date,
            required: true,
        },
        status: {
            type: String,
            enum: ['agendado', 'confirmado', 'cancelado'],
            required: true,
            default: 'agendado',
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

export default mongoose.models.Agendamento ||
    mongoose.model('Agendamento', AgendamentoSchema)
