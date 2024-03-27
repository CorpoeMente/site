import { Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

const urbanist = Inter({ subsets: ['latin'] })
import { Toaster } from '@/components/ui/sonner'

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
            <head>
                <Script
                    id="tag-manager"
                    strategy="lazyOnload"
                    src={
                        'https://www.googletagmanager.com/gtag/js?id=AW-11464321993'
                    }
                />
                <Script id="gtag" strategy="lazyOnload">
                    {`
                    window.dataLayer = window.dataLayer || [];

                    function gtag() {
                        dataLayer.push(arguments);
                    }
                    gtag('js', new Date());

                    gtag('config', 'AW-11464321993');
                    `}
                </Script>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossorigin
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Urbanist:wght@100;200;300;400;500;600;700;800;900&display=swap"
                    rel="stylesheet"
                />
            </head>
            <body className={`${urbanist.className}`}>
                {children}
                <Toaster />
            </body>
        </html>
    )
}
