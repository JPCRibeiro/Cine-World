import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10);
    await connectMongoDB();
    await User.create({ name, email, password: hashedPassword });

    return NextResponse.json(
      { message: "Usuário Registrado." }, 
      { status: 201 }
    )
  } catch (error) {
    return NextResponse.json(
      { message: "Ocorreu um erro ao registrar o usuário."},
      { status: 500 }
    )
  }
}