import User from "../../../models/User";
import dbConnect from "../../../utils/dbConnect";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  const { nome, email, telefone, password } = await request.json();

  await dbConnect();

  const hashedPassword = await bcrypt.hash(password, 10);

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
};
