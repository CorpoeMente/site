import { NextResponse } from "next/server";
import User from "../../models/User";
import dbConnect from "../../utils/dbConnect";
import handlePermissions from "../../utils/serverSession";
import bcrypt from "bcryptjs";

export async function POST(request) {
  if (await handlePermissions()) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { nome, email, telefone, password } = await request.json();

  const hashedPassword = await bcrypt.hash(password, 10);

  await dbConnect();

  const newUser = new User({
    nome,
    email,
    telefone,
    password: hashedPassword,
    role: "admin",
  });

  try {
    await newUser.save();
    return new NextResponse("User has been created", {
      status: 201,
    });
  } catch (err) {
    return new NextResponse(err.message, {
      status: 500,
    });
  }
}

export async function GET(request) {
  if (await handlePermissions()) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  await dbConnect();

  try {
    const users = await User.find({});
    return new NextResponse(JSON.stringify(users), {
      status: 200,
    });
  } catch (err) {
    return new NextResponse(err.message, {
      status: 500,
    });
  }
}

export async function PUT(request) {
  if (await handlePermissions()) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { id } = request.query;
  const { nome, email, telefone, password } = await request.json();

  await dbConnect();

  try {
    await User.findByIdAndUpdate(id, {
      nome,
      email,
      telefone,
      password,
    });
    return new NextResponse("User has been updated", {
      status: 200,
    });
  } catch (err) {
    return new NextResponse(err.message, {
      status: 500,
    });
  }
}

export async function DELETE(request) {
  if (await handlePermissions()) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { id, nome, email, telefone, password } = await request.json();

  await dbConnect();

  try {
    await User.findByIdAndDelete(id, {
      nome,
      email,
      telefone,
      password,
    });
    return new NextResponse("User has been deleted", {
      status: 200,
    });
  } catch (err) {
    return new NextResponse(err.message, {
      status: 500,
    });
  }
}
