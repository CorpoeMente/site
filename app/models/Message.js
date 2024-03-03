import mongoose from 'mongoose'

const MessageSchema = new mongoose.Schema(
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
        mensagem: {
            type: String,
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

export default mongoose.models.Message ||
    mongoose.model('Message', MessageSchema)
