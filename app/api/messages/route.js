import { NextResponse } from 'next/server'
import { Message } from '../../models'

import handlePermissions from '../../utils/serverSession'

import { dbConnect } from '@/app/utils/dbConnect'

export async function POST(request) {
    await dbConnect()
    const { nome, telefone, email, mensagem } = await request.json()

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
    await dbConnect()
    if (await handlePermissions(['admin'])) {
        return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), {
            status: 401,
        })
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
    await dbConnect()
    if (await handlePermissions(['admin'])) {
        return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), {
            status: 401,
        })
    }
    const data = await request.json()
    const { id } = data

    try {
        const message = await Message.findById(id)
        if (message.documentStatus === 'lixeira') {
            await Message.findByIdAndDelete(id)
            const messages = await Message.find({})

            return new NextResponse(JSON.stringify(messages), {
                status: 200,
            })
        }

        message.documentStatus = 'lixeira'
        await message.save()

        return new NextResponse(
            JSON.stringify({
                message: 'Message has been moved to trash',
            }),
            {
                status: 200,
            }
        )
    } catch (err) {
        return new NextResponse(err.message, {
            status: 500,
        })
    }
}
