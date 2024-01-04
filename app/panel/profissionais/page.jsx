import {
    SidePanel,
    NovoProfissional,
    ProfissionaisList,
} from '../../Components'
import { authOptions } from '@/app/utils/auth'
import { getServerSession } from 'next-auth'
import Login from '../../(auth)/login/page'
export default async function page() {
    const session = await getServerSession(authOptions)
    if (!session) return <Login />
    return (
        <main className="flex items-center justify-between">
            <SidePanel />
            <div className="w-full h-screen  flex flex-col items-start justify-start bg-white p-12">
                <NovoProfissional />
                <ProfissionaisList />
            </div>
        </main>
    )
}
