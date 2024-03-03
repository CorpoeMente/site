import { NextResponse } from 'next/server'
import { Profissional } from '../../models'

import handlePermissions from '../../utils/serverSession'
import handleFileSave from '@/app/utils/handleFile'

import { dbConnect } from '@/app/utils/dbConnect'

export async function POST(request) {
    await dbConnect()
    if (await handlePermissions(['admin'])) {
        return new NextResponse(JSON.stringify({ message: 'Unauthorized' }), {
            status: 401,
        })
    }

    const data = await request.json()

    const newProfissional = new Profissional({
        ...data,
        curriculo: JSON.parse(data.curriculo),
        jornada: JSON.parse(data.jornada),
    })

    try {
        await newProfissional.save()

        return new NextResponse(
            JSON.stringify({ message: 'Profissional has been created' }),
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
        if (request.query) {
            if (request.query.id) {
                const { id } = request.query
                const profissional = await Profissional.findById(id)

                return new NextResponse(JSON.stringify({ profissional }), {
                    status: 200,
                })
            }
            if (request.query.departamento) {
                const { departamento } = request.query
                const profissionais = await Profissional.find({ departamento })

                return new NextResponse(JSON.stringify({ profissionais }), {
                    status: 200,
                })
            }
        }

        const profissionais = await Profissional.find({})

        return new NextResponse(JSON.stringify([...profissionais]), {
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

    const formData = await request.formData()
    const fields = Array.from(formData).reduce((acc, [name, value]) => {
        acc[name] = value
        return acc
    }, {})

    const data = fields
    const { _id } = data
    var imagem = formData.get('imagem')
    if (typeof imagem != 'string') {
        imagem = await handleFileSave(imagem)
    }

    if (!_id) {
        return new NextResponse(JSON.stringify({ message: 'Missing ID' }), {
            status: 400,
        })
    }

    try {
        const curriculoAsObject = JSON.parse(data.curriculo)

        await Profissional.findByIdAndUpdate(_id, {
            ...data,
            jornada: JSON.parse(data.jornada),
            curriculo: curriculoAsObject,
        })

        return new NextResponse(
            JSON.stringify({ message: 'Profissional has been updated' }),
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
    const { id } = data

    try {
        const profissional = await Profissional.findById(id)
        if (profissional.documentStatus === 'lixeira') {
            await Profissional.findByIdAndDelete(id)

            return new NextResponse(
                JSON.stringify({ message: 'Profissional has been deleted' }),
                {
                    status: 200,
                }
            )
        }
        profissional.documentStatus = 'lixeira'
        await profissional.save()

        return new NextResponse(
            JSON.stringify({ message: 'Profissional has been deleted' }),
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
