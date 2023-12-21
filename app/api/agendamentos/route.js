import { NextResponse } from 'next/server'
import { Agendamento } from '../../models'
import dbConnect from '../../utils/dbConnect'
import handlePermissions from '../../utils/serverSession'

export async function POST(request) {
    if (await handlePermissions()) {
        return new NextResponse('Unauthorized', { status: 401 })
    }

    const { nome, telefone, email, servico, startTime, endTime } =
        await request.json()

    await dbConnect()

    const newAgendamento = new Agendamento({
        nome,
        telefone,
        email,
        servico,
        startTime,
        endTime,
    })

    try {
        await newAgendamento.save()
        return new NextResponse('Agendamento has been created', {
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
    await dbConnect()

    try {
        const agendamentos = await Agendamento.find({})
        return new NextResponse(JSON.stringify(agendamentos), {
            status: 200,
        })
    } catch (err) {
        return new NextResponse(err.message, {
            status: 500,
        })
    }
}

export async function PUT(request) {
    if (await handlePermissions()) {
        return new NextResponse('Unauthorized', { status: 401 })
    }

    const { id } = request.query
    const { nome, telefone, email, servico, startTime, endTime } =
        await request.json()

    await dbConnect()

    try {
        await Agendamento.findByIdAndUpdate(id, {
            nome,
            telefone,
            email,
            servico,
            startTime,
            endTime,
        })
        return new NextResponse('Agendamento has been updated', {
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

    const { id } = request.query

    await dbConnect()

    try {
        await Agendamento.findByIdAndDelete(id)
        return new NextResponse('Agendamento has been deleted', {
            status: 200,
        })
    } catch (err) {
        return new NextResponse(err.message, {
            status: 500,
        })
    }
}
