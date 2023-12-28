import mongoose from 'mongoose'

const ValorServicoSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
            unique: true,
        },
    },
    { timestamps: true }
)

const ServicoSchema = new mongoose.Schema(
    {
        nome: {
            type: String,
            required: true,
        },
        descricao: {
            type: String,
            required: true,
            unique: true,
        },
        type: {
            type: String,
            required: true,
            enum: ['servico', 'exame'],
        },
        departamento: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Departamento',
            required: true,
        },
        valores: [ValorServicoSchema],
        valorSocial: {
            type: Boolean,
            required: true,
            default: false,
        },
    },
    { timestamps: true }
)

export default mongoose.models.Servico ||
    mongoose.model('Servico', ServicoSchema)
