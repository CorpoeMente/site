import { NextRequest, NextResponse } from "next/server";
import { Servico } from "../../models";
import { getSession } from "next-auth/react";
import dbConnect from "../../utils/dbConnect";

// nome
// descricao
// type
// departamento

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

  const { nome, descricao, type, departamento } = await request.json();

  await dbConnect();

  const newServico = new Servico({
    nome,
    descricao,
    type,
    departamento,
  });

  try {
    await newServico.save();
    return new NextResponse("Servico has been created", {
      status: 201,
    });
  } catch (err) {
    return new NextResponse(err.message, {
      status: 500,
    });
  }
}

export async function GET(request) {
  await dbConnect();

  try {
    const servicos = await Servico.find({});
    return new NextResponse(JSON.stringify(servicos), {
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
  const { nome, descricao, type, departamento } = await request.json();

  await dbConnect();

  try {
    await Servico.findByIdAndUpdate(id, {
      nome,
      descricao,
      type,
      departamento,
    });
    return new NextResponse("Servico has been updated", {
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
    await Servico.findByIdAndDelete(id);
    return new NextResponse("Servico has been deleted", {
      status: 200,
    });
  } catch (err) {
    return new NextResponse(err.message, {
      status: 500,
    });
  }
}
