import { NextResponse } from 'next/server'
import User from '../../models/User'

import handlePermissions from '../../utils/serverSession'
import bcrypt from 'bcryptjs'

import { dbConnect } from '@/app/utils/dbConnect'

export async function POST(request) {
    await dbConnect()
    if (await handlePermissions(['admin'])) {
        return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), {
            status: 401,
        })
    }

    const { nome, email, telefone, password, role } = await request.json()
    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = new User({
        nome,
        email,
        telefone,
        password: hashedPassword,
        role: role,
    })

    try {
        await newUser.save()

        return new NextResponse(
            JSON.stringify({ message: 'User has been created' }),
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

export async function GET(request) {
    await dbConnect()
    if (await handlePermissions(['admin'])) {
        return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), {
            status: 401,
        })
    }

    try {
        const users = await User.find({})

        return new NextResponse(JSON.stringify(users), {
            status: 200,
        })
    } catch (err) {
        return new NextResponse(JSON.stringify({ error: err.message }), {
            status: 500,
        })
    }
}

const UpdateUserWithNewPassword = async (data) => {
    const user = await User.findById(data._id)
    if ( await bcrypt.compare(data.password, user.password)) {
        const hashedPassword = await bcrypt.hash(data.newPassword, 10)
        try {
            await User.findByIdAndUpdate(data._id, {
                name: data.name,
                email: data.email,
                telefone: data.telefone,
                password: hashedPassword,
            })

            return new NextResponse(
                JSON.stringify({ message: 'User has been updated' }),
                {
                    status: 200,
                }
            )
        } catch (err) {
            return new NextResponse(JSON.stringify({ error: err.message }), {
                status: 500,
            })
        }
    } else {
        return new NextResponse(
            JSON.stringify({ error: 'Senha atual incorreta.' }),
            {
                status: 401,
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

    // check if password is being updated
    if (data.password) {
        return await UpdateUserWithNewPassword(data)
    }

    try {
        data.pop('password')
        await User.findByIdAndUpdate(data._id, {
            ...data,
        })

        return new NextResponse(
            JSON.stringify({ message: 'User has been updated' }),
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

export async function DELETE(request) {
    await dbConnect()
    if (await handlePermissions(['admin'])) {
        return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), {
            status: 401,
        })
    }

    const { _id } = await request.json()

    try {
        const user = await User.findById(_id)
        if (user.documentStatus === 'lixeira') {
            await User.findByIdAndDelete(id)

            return new NextResponse(
                JSON.stringify({ message: 'User has been deleted' }),
                {
                    status: 200,
                }
            )
        }
        user.documentStatus = 'lixeira'
        await user.save()

        return new NextResponse(
            JSON.stringify({ message: 'User has been moved to trash' }),
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
