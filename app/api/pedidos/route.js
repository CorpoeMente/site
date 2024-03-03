import { NextResponse } from 'next/server'
import { PedidoAgendamento } from '../../models'

import handlePermissions from '../../utils/serverSession'

import { dbConnect } from '@/app/utils/dbConnect'

export async function POST(request) {
    await dbConnect()
    const { nome, telefone, email, servico, data, mensagem, cpf } =
        await request.json()

    const newPedidoAgendamento = new PedidoAgendamento({
        nome,
        telefone,
        email,
        servico,
        data,
        cpf,
        mensagem,
    })

    try {
        await newPedidoAgendamento.save()

        return new NextResponse('PedidoAgendamento has been created', {
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
        const PedidoAgendamentos = await PedidoAgendamento.find({})
            .populate('servico')
            .sort({ date: -1 })
        return new NextResponse(JSON.stringify(PedidoAgendamentos), {
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
        const pedido = await PedidoAgendamento.findById(id)
        if (pedido.documentStatus === 'lixeira') {
            await PedidoAgendamento.findByIdAndDelete(id)

            return new NextResponse(
                JSON.stringify({ message: 'Pedido foi removido com sucesso!' }),
                {
                    status: 200,
                }
            )
        }
        pedido.documentStatus = 'lixeira'
        await pedido.save()

        return new NextResponse(
            JSON.stringify({ message: 'Pedido foi movido para a lixeira!' }),
            {
                status: 200,
            }
        )
    } catch (err) {
        return new NextResponse(JSON.stringify({ error: err.message }), {
            status: 500,
        })
    }
}

export async function PUT(request) {
    await dbConnect()
    if (await handlePermissions(['admin'])) {
        return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), {
            status: 401,
        })
    }
    const data = await request.json()

    try {
        await PedidoAgendamento.findByIdAndUpdate(data._id, {
            ...data,
        })

        return new NextResponse(
            JSON.stringify({ message: 'Pedido foi atualizado com sucesso!' }),
            {
                status: 200,
            }
        )
    } catch (err) {
        return new NextResponse(JSON.stringify({ error: err.message }), {
            status: 500,
        })
    }
}
