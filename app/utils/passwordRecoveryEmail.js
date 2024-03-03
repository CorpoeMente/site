import { Resend } from 'resend'

const resend = new Resend({
    apiKey: process.env.RESEND_API_KEY,
})

const Email = ({ token }) => {
    return (
        <div>
            <h1>Recuperação de senha</h1>
            <p>
                Clique no link abaixo para recuperar sua senha:
                <a
                    href={`https://clinicacorpoemente.com/redefinir-senhar&token=${token}`}
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

export const sendPasswordRecoveryEmail = async (email, token) => {
    const message = {
        from: 'senhas@clinicacorpoemente.com',
        to: [email],
        subject: 'Recuperação de senha',
        react: <Email token={token} />,
    }
}
