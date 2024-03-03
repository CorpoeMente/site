import mongoose from 'mongoose'

export async function backupDBConnect() {
    try {
        await mongoose.connect(process.env.MONGODB_BACKUP_URI)
    } catch (error) {
        throw new Error('Connection failed!')
    }
}

export async function backupDBClose() {
    try {
        await mongoose.disconnect()
    } catch (error) {
        return
    }
}
