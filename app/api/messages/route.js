import { NextRequest, NextResponse } from "next/server";
import { Message } from "../../models";
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
  const { nome, telefone, email, mensagem } = await request.json();

  await dbConnect();

  const newMessage = new Message({
    nome,
    telefone,
    email,
    mensagem,
  });

  try {
    await newMessage.save();
    return new NextResponse("Message has been created", {
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
    const messages = await Message.find({});
    return new NextResponse(JSON.stringify(messages), {
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

  await dbConnect();

  try {
    await Message.findByIdAndDelete(id);
    return new NextResponse("Message has been deleted", {
      status: 200,
    });
  } catch (err) {
    return new NextResponse(err.message, {
      status: 500,
    });
  }
}
