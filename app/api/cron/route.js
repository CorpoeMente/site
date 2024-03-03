import { backupDBConnect, backupDBClose } from '@/app/utils/backupConnect'
import { dbConnect, dbClose } from '@/app/utils/dbConnect'
import {
    Agendamento,
    Departamento,
    Message,
    PedidoAgendamento,
    Profissional,
    Servico,
    User,
} from '@/app/models'
import { NextResponse } from 'next/server'

async function getAgendamentos() {
    const agendamentos = await Agendamento.find()
    return agendamentos
}
async function getDepartamentos() {
    const departamentos = await Departamento.find()
    return departamentos
}
async function getMessages() {
    const messages = await Message.find()
    return messages
}

async function getPedidos() {
    const pedidos = await PedidoAgendamento.find()
    return pedidos
}

async function getProfissionais() {
    const profissionais = await Profissional.find()
    return profissionais
}

async function getServicos() {
    const servicos = await Servico.find()
    return servicos
}

async function getUsers() {
    const users = await User.find()
    return users
}

export async function GET(request) {
    await dbConnect()
    const agendamentos = await getAgendamentos()
    const departamentos = await getDepartamentos()
    const pedidos = await getPedidos()
    const messages = await getMessages()
    const profissionais = await getProfissionais()
    const servicos = await getServicos()
    const users = await getUsers()
    await dbClose()
    try {
        await backupDBConnect()
        if (agendamentos.length > 0) {
            await Agendamento.deleteMany({})
            await Agendamento.insertMany([...agendamentos])
        }
        if (departamentos) {
            await Departamento.deleteMany({})
            await Departamento.insertMany([...departamentos])
        }

        if (messages) {
            await Message.deleteMany({})
            await Message.insertMany([...messages])
        }

        // if(pedidos) {
        //     await PedidoAgendamento.deleteMany({})
        //     await PedidoAgendamento.insertMany([...pedidos])
        //   }

        if (profissionais) {
            await Profissional.deleteMany({})
            await Profissional.insertMany([...profissionais])
        }

        if (servicos) {
            await Servico.deleteMany({})
            await Servico.insertMany([...servicos])
        }

        if (users) {
            await User.deleteMany({})
            await User.insertMany([...users])
        }
        await backupDBClose()
        return new NextResponse(JSON.stringify({ message: agendamentos }), {
            status: 200,
        })
    } catch (error) {
        await backupDBClose()
        return new NextResponse(
            JSON.stringify({ error: 'Ocorreu um erro ao fazer o backup' }),
            { status: 500 }
        )
    }
}
