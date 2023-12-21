import { authOptions } from '../utils/auth'
import { getServerSession } from 'next-auth'
import { SidePanel } from '../Components'
export default async function Dashboard() {
    const session = await getServerSession(authOptions)

    return (
        <main className="flex items-center justify-between">
            <SidePanel />
            <main className="w-4/5 h-screen  bg-white"></main>
        </main>
    )
}
