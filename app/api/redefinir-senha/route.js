import { NextResponse } from 'next/server'
import User from '../../models/User'
import PasswordRecovery from '../../models/PasswordRecovery'

import bcrypt from 'bcryptjs'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

import { dbConnect } from '@/app/utils/dbConnect'

export async function POST(request) {
    await dbConnect()
    const { email } = await request.json()

    const user = await User.findOne({ email })
    if (!user) {
        return new NextResponse(JSON.stringify({ error: 'User not found' }), {
            status: 400,
        })
    }
    // generate token with 24 characters
    const token = generateAuthToken(24)
    const passwordRecovery = new PasswordRecovery({ user: user._id, token })
    await passwordRecovery.save()

    await sendPasswordRecoveryEmail(user.email, token)

    return new NextResponse(
        JSON.stringify({ message: 'Email has been sent' }),
        {
            status: 200,
        }
    )
}

export async function PUT(request) {
    await dbConnect()
    const { token, password } = await request.json()

    const passwordRecovery = await PasswordRecovery.findOne({ token })
        .populate('user')
        .exec()

    if (!passwordRecovery || passwordRecovery.expiresAt < new Date()) {
        return new NextResponse(JSON.stringify({ error: 'Invalid token' }), {
            status: 400,
        })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await User.findById(passwordRecovery.user._id)

    user.password = hashedPassword
    await user.save()

    // Delete password recovery
    const data = await PasswordRecovery.deleteOne({ _id: passwordRecovery._id })

    return new NextResponse(
        JSON.stringify({ message: 'Password has been updated', data: data }),
        {
            status: 200,
        }
    )
}

const Email = ({ token }) => {
    return (
        <div>
            <h1>Recuperação de senha</h1>
            <p>
                Clique no link abaixo para recuperar sua senha:{' '}
                <a
                    href={`http://localhost:3000/redefinir-senha?token=${token}`}
                >
                    Recuperar senha
                </a>
            </p>

            <p>
                Se você não solicitou a recuperação de senha, ignore este email.
            </p>
        </div>
    )
}

function generateAuthToken(length) {
    const charset =
        'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    const tokenArray = []

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length)
        tokenArray.push(charset.charAt(randomIndex))
    }

    return tokenArray.join('')
}

async function sendPasswordRecoveryEmail(email, token) {
    const data = await resend.emails.send({
        from: 'senhas@clinicacorpoemente.com',
        to: email,
        subject: 'Recuperação de senha',
        react: <Email token={token} />,
    })
    return data
}
