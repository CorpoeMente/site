import { NextRequest, NextResponse } from "next/server";
import User from "../../models/User";
import { getSession } from "next-auth/react";
import dbConnect from "../../utils/dbConnect";

const handlePermissions = async (request) => {
  const session = await getSession({ req: request });

  if (!session || !session.user || session.user.role !== "admin") {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  return null; // Permissões concedidas
};

export async function POST(request) {
  const response = handlePermissions(request);
  if (response) return response;

  const { nome, email, telefone, password } = await request.json();

  await dbConnect();

  const newUser = new User({
    nome,
    email,
    telefone,
    password,
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
  const response = handlePermissions(request);

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
  const response = handlePermissions(request);

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
  const response = handlePermissions(request);

  const { id } = request.query;
  const { nome, email, telefone, password } = await request.json();

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
