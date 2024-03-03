import { NextResponse } from 'next/server'
import { Servico } from '../../models'

import handlePermissions from '../../utils/serverSession'

import { dbConnect } from '@/app/utils/dbConnect'

export async function POST(request) {
    await dbConnect()
    if (await handlePermissions(['admin'])) {
        return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), {
            status: 401,
        })
    }

    const { nome, descricao, type, departamento, valores, valorSocial } =
        await request.json()

    const newServico = new Servico({
        nome,
        descricao,
        type,
        departamento,
        valores,
        valorSocial,
        documentStatus: 'ativo',
    })

    try {
        await newServico.save()

        return new NextResponse(
            JSON.stringify({
                message: 'Serviço has been created',
            }),
            {
                status: 201,
            }
        )
    } catch (err) {
        return new NextResponse(
            JSON.stringify({
                message: err.message,
            }),
            {
                status: 500,
            }
        )
    }
}

export async function GET(request) {
    await dbConnect()
    await dbConnect()
    // Get params from request
    const { query } = request
    if (query) {
        const { search, departamento_id, type } = query
        if (search) {
            const servicos = await Servico.find({
                $or: [
                    { nome: { $regex: search, $options: 'i' } },
                    { descricao: { $regex: search, $options: 'i' } },
                ],

                ...(departamento_id && { departamento: departamento_id }),
                ...(type && { type }),
            })

            return new NextResponse(JSON.stringify(servicos), {
                status: 200,
            })
        }
    }

    try {
        const servicos = await Servico.find({})
            .populate('departamento')
            .populate('profissionais')
            .exec()

        return new NextResponse(JSON.stringify(servicos), {
            status: 200,
        })
    } catch (err) {
        return new NextResponse(
            JSON.stringify({
                message: err.message,
            }),
            {
                status: 500,
            }
        )
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
        await Servico.findByIdAndUpdate(data.id, {
            ...data,
        })

        return new NextResponse(
            JSON.stringify({
                message: 'Serviço has been updated',
            }),
            {
                status: 200,
            }
        )
    } catch (err) {
        return new NextResponse(JSON.stringify({ error: err }), {
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
    const { _id } = data

    try {
        const servico = await Servico.findById(_id)
        if (servico.documentStatus === 'lixeira') {
            await Servico.findByIdAndDelete(_id)

            return new NextResponse(
                JSON.stringify({
                    message: 'Serviço has been deleted',
                }),
                {
                    status: 200,
                }
            )
        }
        servico.documentStatus = 'lixeira'
        await servico.save()

        return new NextResponse(
            JSON.stringify({
                message: 'Serviço has been moved to trash',
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
