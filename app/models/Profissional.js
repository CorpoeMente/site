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

const JornadaSemanaSchema = new mongoose.Schema(
    {
        segunda: {
            inicio: {
                type: String,
                required: true,
            },
            fim: {
                type: String,
                required: true,
            },
        },
        terca: {
            inicio: {
                type: String,
                required: true,
            },
            fim: {
                type: String,
                required: true,
            },
        },
        quarta: {
            inicio: {
                type: String,
                required: true,
            },
            fim: {
                type: String,
                required: true,
            },
        },
        quinta: {
            inicio: {
                type: String,
                required: true,
            },
            fim: {
                type: String,
                required: true,
            },
        },
        sexta: {
            inicio: {
                type: String,
                required: true,
            },
            fim: {
                type: String,
                required: true,
            },
        },
        sabado: {
            inicio: {
                type: String,
                required: true,
            },
            fim: {
                type: String,
                required: true,
            },
        },
        domingo: {
            inicio: {
                type: String,
                required: true,
            },
            fim: {
                type: String,
                required: true,
            },
        },
    },
    { _id: false } // Para evitar a criação de um novo ObjectId para a jornada
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
        jornada: {
            type: JornadaSemanaSchema,
            required: true,
            default: {
                segunda: { inicio: '', fim: '' },
                terca: { inicio: '', fim: '' },
                quarta: { inicio: '', fim: '' },
                quinta: { inicio: '', fim: '' },
                sexta: { inicio: '', fim: '' },
                sabado: { inicio: '', fim: '' },
                domingo: { inicio: '', fim: '' },
            },
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

export default mongoose.models.Profissional ||
    mongoose.model('Profissional', ProfissionalSchema)
