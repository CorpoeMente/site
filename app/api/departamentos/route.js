import { NextResponse } from 'next/server'
import { Departamento } from '../../models'
import handlePermissions from '../../utils/serverSession'

import { dbConnect } from '@/app/utils/dbConnect'

export async function POST(request) {
    await dbConnect()
    if (await handlePermissions(['admin'])) {
        return new NextResponse(JSON.stringify({ message: 'Unauthorized' }), {
            status: 401,
        })
    }

    const { name, color, img } = await request.json()

    const newDepartamento = new Departamento({
        name,
        color,
        img,
    })

    try {
        await newDepartamento.save()

        return new NextResponse(
            JSON.stringify({ message: 'Departamento has been created' }),
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

    try {
        const departamentos = await Departamento.find({}).populate(
            'responsavel'
        )

        return new NextResponse(JSON.stringify({ departamentos }), {
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
        return new NextResponse(JSON.stringify({ message: 'Unauthorized' }), {
            status: 401,
        })
    }

    const { id, name, color, img, responsavel } = await request.json()

    try {
        await Departamento.findByIdAndUpdate(
            id,
            {
                name,
                color,
                img,
                responsavel,
            },
            { strict: false }
        )

        return new NextResponse(
            JSON.stringify({ message: 'Departamento has been updated' }),
            {
                status: 200,
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

export async function DELETE(request) {
    await dbConnect()
    if (await handlePermissions(['admin'])) {
        return new NextResponse(JSON.stringify({ message: 'Unauthorized' }), {
            status: 401,
        })
    }
    const data = await request.json()
    const { _id } = data

    try {
        const departamento = await Departamento.findById
        if (departamento.documentStatus === 'lixeira') {
            await Departamento.findByIdAndDelete(_id)

            return new NextResponse(
                JSON.stringify({ message: 'Departamento has been deleted' }),
                {
                    status: 200,
                }
            )
        }

        departamento.documentStatus = 'lixeira'
        await departamento.save()

        return new NextResponse(
            JSON.stringify({ message: 'Departamento has been moved to trash' }),
            {
                status: 200,
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
