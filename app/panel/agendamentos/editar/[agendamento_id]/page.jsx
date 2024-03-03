import { NextAuthProvider } from '@/app/Provider'
import { ThemeProvider } from '@/app/Components'
import { getServerSession } from 'next-auth'
import { Login, PanelNavBar, AdminPanel } from '@/app/Components'
import EditarAgendamento from './EditarAgendamento'
import { authOptions } from '@/app/utils/auth'

export default async function page({ params: { agendamento_id } }) {
    const session = await getServerSession(authOptions)
    if (!session) return <Login />
    if (session.user.role !== 'admin') return <Login />

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
                            <EditarAgendamento
                                agendamento_id={agendamento_id}
                            />
                        </main>
                    </NextAuthProvider>
                </ThemeProvider>
            </body>
        </html>
    )
}
