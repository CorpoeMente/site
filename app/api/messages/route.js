import { NextResponse } from 'next/server'
import { Message } from '../../models'
import dbConnect from '../../utils/dbConnect'
import handlePermissions from '../../utils/serverSession'

export async function POST(request) {
    const { nome, telefone, email, mensagem } = await request.json()

    await dbConnect()

    const newMessage = new Message({
        nome,
        telefone,
        email,
        mensagem,
    })

    try {
        await newMessage.save()
        return new NextResponse('Message has been created', {
            status: 201,
        })
    } catch (err) {
        return new NextResponse(err.message, {
            status: 500,
        })
    }
}

export async function GET(request) {
    if (await handlePermissions()) {
        return new NextResponse('Unauthorized', { status: 401 })
    }

    try {
        const messages = await Message.find({})
        return new NextResponse(JSON.stringify(messages), {
            status: 200,
        })
    } catch (err) {
        return new NextResponse(err.message, {
            status: 500,
        })
    }
}

export async function DELETE(request) {
    if (await handlePermissions()) {
        return new NextResponse('Unauthorized', { status: 401 })
    }
    const data = await request.json()
    const { id } = data
    await dbConnect()

    try {
        await Message.findByIdAndDelete(id)
        const messages = await Message.find({})
        return new NextResponse(JSON.stringify(messages), {
            status: 200,
        })
    } catch (err) {
        return new NextResponse(err.message, {
            status: 500,
        })
    }
}
