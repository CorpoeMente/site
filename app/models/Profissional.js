import mongoose from 'mongoose'

const ExperienciaProfissionalSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        text: {
            type: String,
            required: true,
        },
        date: {
            type: String,
        },
    },
    { _id: false } // Para evitar a criação de um novo ObjectId para cada experiência profissional
)

const ProfissionalSchema = new mongoose.Schema(
    {
        nome: {
            type: String,
            required: true,
        },
        cargo: {
            type: String,
            required: true,
        },
        imagem: {
            type: String,
            required: true,
        },
        descricao: {
            type: String,
            required: true,
        },
        curriculo: [ExperienciaProfissionalSchema],
        email: {
            type: String,
            required: true,
            unique: true,
        },
        telefone: {
            type: String,
            required: true,
        },
        departamento: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Departamento',
        },
    },
    { timestamps: true }
)

export default mongoose.models.Profissional ||
    mongoose.model('Profissional', ProfissionalSchema)
