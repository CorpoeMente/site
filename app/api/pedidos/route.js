import { NextResponse } from "next/server";
import { PedidoAgendamento } from "../../models";
import dbConnect from "../../utils/dbConnect";
import handlePermissions from "../../utils/serverSession";

export async function POST(request) {
  const { nome, telefone, email, servico, data, mensagem } =
    await request.json();

  await dbConnect();

  const newPedidoAgendamento = new PedidoAgendamento({
    nome,
    telefone,
    email,
    servico,
    data,
    mensagem,
  });

  try {
    await newPedidoAgendamento.save();
    return new NextResponse("PedidoAgendamento has been created", {
      status: 201,
    });
  } catch (err) {
    return new NextResponse(err.message, {
      status: 500,
    });
  }
}

export async function GET(request) {
  const permission = handlePermissions();
  await dbConnect();

  try {
    const PedidoAgendamentos = await PedidoAgendamento.find({});
    return new NextResponse(JSON.stringify(PedidoAgendamentos), {
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
    await PedidoAgendamento.findByIdAndDelete(id);
    return new NextResponse("PedidoAgendamento has been deleted", {
      status: 200,
    });
  } catch (err) {
    return new NextResponse(err.message, {
      status: 500,
    });
  }
}
