import { authOptions } from '@/app/utils/auth'
import { getServerSession } from 'next-auth'

const handlePermissions = async (roles) => {
    const data = await getServerSession(authOptions)
    return !data || !data.user || roles.indexOf(data.user.role) === -1
}

export default handlePermissions
