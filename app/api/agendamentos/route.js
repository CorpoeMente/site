import { NextRequest, NextResponse } from "next/server";
import { Agendamento } from "../../models";
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

  const { nome, telefone, email, servico, startTime, endTime } =
    await request.json();

  await dbConnect();

  const newAgendamento = new Agendamento({
    nome,
    telefone,
    email,
    servico,
    startTime,
    endTime,
  });

  try {
    await newAgendamento.save();
    return new NextResponse("Agendamento has been created", {
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
  if (response) return response;

  await dbConnect();

  try {
    const agendamentos = await Agendamento.find({});
    return new NextResponse(JSON.stringify(agendamentos), {
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
  if (response) return response;

  const { id } = request.query;
  const { nome, telefone, email, servico, startTime, endTime } =
    await request.json();

  await dbConnect();

  try {
    await Agendamento.findByIdAndUpdate(id, {
      nome,
      telefone,
      email,
      servico,
      startTime,
      endTime,
    });
    return new NextResponse("Agendamento has been updated", {
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
  if (response) return response;

  const { id } = request.query;

  await dbConnect();

  try {
    await Agendamento.findByIdAndDelete(id);
    return new NextResponse("Agendamento has been deleted", {
      status: 200,
    });
  } catch (err) {
    return new NextResponse(err.message, {
      status: 500,
    });
  }
}
