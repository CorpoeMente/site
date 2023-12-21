import { Inter, Urbanist } from 'next/font/google'
import './globals.css'

const inter = Inter({
    subsets: ['latin'],
    weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
    variable: '--font-inter',
})

const urbanist = Urbanist({
    subsets: ['latin'],
    weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
    variable: '--',
})

export const metadata = {
    title: 'Clinica Corpo e Mente',
    description: '',
}

export default function RootLayout({ children }) {
    return (
        <html lang="pt-br">
            <body className={`${urbanist.className} ${inter.className} `}>
                {children}
            </body>
        </html>
    )
}
