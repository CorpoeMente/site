import mongoose from 'mongoose'
import Servico from './Servico'
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
        servico: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Servico',
            required: true,
        },
        startTime: {
            type: Date,
            required: true,
        },
        endTime: {
            type: Date,
            required: true,
        },
    },
    { timestamps: true }
)

export default mongoose.models.Agendamento ||
    mongoose.model('Agendamento', AgendamentoSchema)
