import { NextResponse } from 'next/server'
import { Agendamento } from '../../models'

import handlePermissions from '../../utils/serverSession'
import { getServerSession } from 'next-auth'

const GET_BY_ID = async (user_id, id) => {
    try {
        const agendamento = await Agendamento.findById(id, {
            profissional: user_id,
        }).populate('servico')

        return new NextResponse(JSON.stringify(agendamento), {
            status: 200,
        })
    } catch (err) {
        return new NextResponse(JSON.stringify({ error: err.message }), {
            status: 500,
        })
    }
}

const GET_BY_DATE = async (user_id, startTime, endTime) => {
    try {
        const agendamentos = await Agendamento.find({
            date: {
                $gte: startTime,
                $lte: endTime,
            },
            profissional: user_id,
        }).populate('servico')

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

    if (await handlePermissions(['profissional'])) {
        return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), {
            status: 401,
        })
    }
    const data = await getServerSession(authOptions)
    const user_id = data.user._id
    if (url.searchParams.get('id')) {
        return GET_BY_ID(user_id, url.searchParams.get('id'))
    }

    if (url.searchParams.get('startTime') && url.searchParams.get('endTime')) {
        return GET_BY_DATE(
            user_id,
            url.searchParams.get('startTime'),
            url.searchParams.get('endTime')
        )
    }

    try {
        const agendamentos = await Agendamento.find({ profissional: user_id })
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
