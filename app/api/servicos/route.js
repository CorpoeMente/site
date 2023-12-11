import { NextResponse } from "next/server";
import { Servico } from "../../models";
import dbConnect from "../../utils/dbConnect";
import handlePermissions from "../../utils/serverSession";

export async function POST(request) {
  if (await handlePermissions()) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

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
  if (await handlePermissions()) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { id, nome, descricao, type, departamento } = await request.json();

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
  if (await handlePermissions()) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  const data = await request.json();
  const { id } = data;

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
