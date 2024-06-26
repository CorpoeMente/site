import mongoose from 'mongoose'

const DepartamentoSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        color: {
            type: String,
            required: true,
        },
        img: {
            type: String,
            required: true,
        },
        responsavel: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Profissional',
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

export default mongoose.models.Departamento ||
    mongoose.model('Departamento', DepartamentoSchema)
