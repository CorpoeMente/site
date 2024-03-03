import { NextAuthProvider } from '@/app/Provider'
import { ThemeProvider } from '@/app/Components'
import { getServerSession } from 'next-auth'
import { Login, PanelNavBar, AdminPanel, Input } from '@/app/Components'
import { authOptions } from '@/app/utils/auth'
import Form from './Form'
import { getCsrfToken } from 'next-auth/react'

export default async function page() {
    const session = await getServerSession(authOptions)
    if (!session) return <Login />

    return (
        <html lang="pt-br">
            <body>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <NextAuthProvider>
                        <main className="grid grid-cols-[288px_minmax(0,1fr)] grid-rows-[64px_minmax(0,1fr)] gap-4	p-4 h-screen bg-white dark:bg-black">
                            <PanelNavBar session={session} />
                            <AdminPanel />
                            <div className="col-span-4 flex flex-col items-start justify-start text-black bg-[#fff] dark:bg-[#202020] card-shadow p-12 rounded-lg">
                                <h1 className="text-4xl font-bold dark:text-white">
                                    Perfil
                                </h1>
                                <Form user={session.user} />
                            </div>
                        </main>
                    </NextAuthProvider>
                </ThemeProvider>
            </body>
        </html>
    )
}
