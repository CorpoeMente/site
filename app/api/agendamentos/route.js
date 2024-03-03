import { NextResponse } from 'next/server'
import { Agendamento } from '../../models'

import handlePermissions from '../../utils/serverSession'
import { validateCPF } from '@/app/utils/textUtils'
import { dbConnect } from '@/app/utils/dbConnect'

export async function POST(request) {
    await dbConnect()
    if (await handlePermissions(['admin'])) {
        return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), {
            status: 401,
        })
    }

    const { nome, telefone, email, servico, date, cpf, profissional } =
        await request.json()

    if (!nome || !telefone || !email || !servico || !date) {
        return new NextResponse(
            JSON.stringify({ error: 'Preencha todos os campos' }),
            {
                status: 400,
            }
        )
    }

    const agendamentoExists = await Agendamento.findOne({
        servico,
        date,
    })

    if (agendamentoExists) {
        return new NextResponse(
            JSON.stringify({
                error: 'Já existe um agendamento para este serviço neste horário. Tente outro horário',
            }),
            {
                status: 409,
            }
        )
    }
    if (!validateCPF(cpf)) {
        return new NextResponse(
            JSON.stringify({
                error: 'CPF inválido',
            }),
            {
                status: 400,
            }
        )
    }

    const newAgendamento = new Agendamento({
        nome,
        telefone,
        email,
        servico,
        date,
        cpf,
        profissional,
        status: 'agendado',
    })

    try {
        await newAgendamento.save()

        return new NextResponse(
            JSON.stringify({ message: 'Agendamento Criado com sucesso' }),
            {
                status: 201,
            }
        )
    } catch (err) {
        return new NextResponse(JSON.stringify({ error: err.message }), {
            status: 500,
        })
    }
}

const GET_BY_ID = async (id) => {
    try {
        const agendamento = await Agendamento.findById(id).populate('servico')

        return new NextResponse(JSON.stringify(agendamento), {
            status: 200,
        })
    } catch (err) {
        return new NextResponse(JSON.stringify({ error: err.message }), {
            status: 500,
        })
    }
}

const GET_BY_DATE = async (startTime, endTime) => {
    try {
        const agendamentos = await Agendamento.find({
            date: {
                $gte: startTime,
                $lte: endTime,
            },
        })
            .populate('servico')
            .sort({ date: -1 })

        return new NextResponse(JSON.stringify(agendamentos), {
            status: 200,
        })
    } catch (err) {
        return new NextResponse(JSON.stringify({ error: err.message }), {
            status: 500,
        })
    }
}

const GET_BY_DAY = async (date, profissional) => {
    const start = new Date(date + 'T00:00:00.000Z')
    const end = new Date(date + 'T23:59:59.999Z')

    try {
        const agendamentos = await Agendamento.find({
            date: {
                $gte: start,
                $lte: end,
            },
            profissional,
        })
            .populate('servico')
            .sort({ date: -1 })

        return new NextResponse(JSON.stringify(agendamentos), {
            status: 200,
        })
    } catch (err) {
        return new NextResponse(JSON.stringify({ error: err.message }), {
            status: 500,
        })
    }
}

export async function GET(request) {
    await dbConnect()
    // get optional query params
    const url = new URL(request.url)

    if (await handlePermissions(['admin'])) {
        return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), {
            status: 401,
        })
    }

    if (url.searchParams.get('id')) {
        return GET_BY_ID(url.searchParams.get('id'))
    }

    if (url.searchParams.get('startTime') && url.searchParams.get('endTime')) {
        return GET_BY_DATE(
            url.searchParams.get('startTime'),
            url.searchParams.get('endTime')
        )
    }

    if (url.searchParams.get('date') && url.searchParams.get('profissional')) {
        return GET_BY_DAY(
            url.searchParams.get('date'),
            url.searchParams.get('profissional')
        )
    }

    try {
        const agendamentos = await Agendamento.find({})
            .populate('servico')
            .populate('profissional')
            .sort({ date: -1 })

        return new NextResponse(JSON.stringify(agendamentos), {
            status: 200,
        })
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
        const agendamento = await Agendamento.findByIdAndUpdate(data._id, {
            ...data,
        })

        return new NextResponse(JSON.stringify(agendamento), {
            status: 200,
        })
    } catch (err) {
        return new NextResponse(JSON.stringify({ error: err.message }), {
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

    const { _id } = await request.json()

    try {
        const agendamento = await Agendamento.findById(_id)
        if (agendamento.documentStatus === 'lixeira') {
            await Agendamento.findByIdAndDelete(_id)

            return new NextResponse(
                JSON.stringify({ messagem: 'Agendamento has been deleted' }),
                {
                    status: 200,
                }
            )
        }

        agendamento.documentStatus = 'lixeira'
        await agendamento.save()

        return new NextResponse(
            JSON.stringify({ messagem: 'Agendamento has been deleted' }),
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
