import mongoose from 'mongoose'

const PasswordRecoverySchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        token: {
            type: String,
            required: true,
        },
        expiresAt: {
            type: Date,
            default: Date.now,
            expires: 3600,
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

export default mongoose.models.PasswordRecovery ||
    mongoose.model('PasswordRecovery', PasswordRecoverySchema)
