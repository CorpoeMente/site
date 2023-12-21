import { NextResponse } from 'next/server'
import { Departamento } from '../../models'
import dbConnect from '../../utils/dbConnect'
import handlePermissions from '../../utils/serverSession'

export async function POST(request) {
    if (await handlePermissions()) {
        return new NextResponse(JSON.stringify({ message: 'Unauthorized' }), {
            status: 401,
        })
    }

    const { name, color, img } = await request.json()

    await dbConnect()

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
        const departamentos = await Departamento.find({})
        return new NextResponse(
            JSON.stringify({ departamentos: departamentos }),
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

export async function PUT(request) {
    if (await handlePermissions()) {
        return new NextResponse(JSON.stringify({ message: 'Unauthorized' }), {
            status: 401,
        })
    }

    const { id, name, color, img, responsavel } = await request.json()
    await dbConnect()

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
    if (await handlePermissions()) {
        return new NextResponse(JSON.stringify({ message: 'Unauthorized' }), {
            status: 401,
        })
    }
    const data = await request.json()
    const { id } = data

    await dbConnect()

    try {
        await Departamento.findByIdAndDelete(id)
        return new NextResponse(
            JSON.stringify({ message: 'Departamento has been deleted' }),
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
