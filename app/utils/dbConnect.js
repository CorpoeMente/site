import mongoose from 'mongoose'

export async function dbConnect() {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
    } catch (error) {
        throw new Error('Connection failed!')
    }
}

export async function dbClose() {
    await mongoose.disconnect()
}
