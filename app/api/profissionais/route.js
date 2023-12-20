import { NextResponse } from "next/server";
import { Profissional } from "../../models";
import dbConnect from "../../utils/dbConnect";
import handlePermissions from "../../utils/serverSession";

export async function POST(request) {
  if (await handlePermissions()) {
    return new NextResponse(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
    });
  }

  const {
    nome,
    cargo,
    imagem,
    descricao,
    departamento,
    email,
    telefone,
    curriculo,
  } = await request.json();

  await dbConnect();

  console.log(curriculo);

  const newProfissional = new Profissional({
    nome,
    cargo,
    imagem,
    descricao,
    email,
    telefone,
    departamento,
    curriculo,
  });

  try {
    await newProfissional.save();
    return new NextResponse(
      JSON.stringify({ message: "Profissional has been created" }),
      {
        status: 201,
      }
    );
  } catch (err) {
    return new NextResponse(
      JSON.stringify({
        message: err.message,
      }),
      {
        status: 500,
      }
    );
  }
}

export async function GET(request) {
  await dbConnect();

  try {
    if (request.query) {
      if (request.query.id) {
        const { id } = request.query;
        const profissional = await Profissional.findById(id);
        return new NextResponse(JSON.stringify({ profissional }), {
          status: 200,
        });
      }
      if (request.query.departamento) {
        const { departamento } = request.query;
        const profissionais = await Profissional.find({ departamento });
        return new NextResponse(JSON.stringify({ profissionais }), {
          status: 200,
        });
      }
    }

    const profissionais = await Profissional.find({});
    return new NextResponse(JSON.stringify({ profissionais: profissionais }), {
      status: 200,
    });
  } catch (err) {
    return new NextResponse(
      JSON.stringify({
        message: err.message,
      }),
      {
        status: 500,
      }
    );
  }
}

export async function PUT(request) {
  if (await handlePermissions()) {
    return new NextResponse(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
    });
  }

  const { id, nome, cargo, imagem, descricao, email, telefone, curriculo } =
    await request.json();

  await dbConnect();

  try {
    await Profissional.findByIdAndUpdate(id, {
      nome,
      cargo,
      imagem,
      descricao,
      email,
      telefone,
      curriculo,
    });
    return new NextResponse(
      JSON.stringify({ message: "Profissional has been updated" }),
      {
        status: 200,
      }
    );
  } catch (err) {
    return new NextResponse(
      JSON.stringify({
        message: err.message,
      }),
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(request) {
  if (await handlePermissions()) {
    return new NextResponse(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
    });
  }
  const data = await request.json();
  const { id } = data;

  await dbConnect();

  try {
    await Profissional.findByIdAndDelete(id);
    return new NextResponse(
      JSON.stringify({ message: "Profissional has been deleted" }),
      {
        status: 200,
      }
    );
  } catch (err) {
    return new NextResponse(
      JSON.stringify({
        message: err.message,
      }),
      {
        status: 500,
      }
    );
  }
}
