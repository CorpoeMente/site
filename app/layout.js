import { Urbanist } from 'next/font/google'
import './globals.css'

const urbanist = Urbanist({
    subsets: ['latin'],
    weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
    variable: '--',
})

export const metadata = {
    title: 'Clínica Corpo e Mente',
    description: 'Clínica Especializada em Psicologia e Neuropsicologia',
    openGraph: {
        type: 'website',
        locale: 'pt_BR',
        url: 'https://clinicacorpoemente.com.br/',
        title: 'Clínica Corpo e Mente',
        description: 'Clinica Especializada em Psicologia e Neuropsicologia',
        image: 'https://clinicacorp0oemente.com.br/favicon.ico',
    },
}

export default function RootLayout({ children }) {
    return (
        <html lang="pt-br">
            <body className={`${urbanist.className}`}>{children}</body>
        </html>
    )
}
