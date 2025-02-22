import { connectToDB } from "@/utils/db";
import Customer from "@/models/userData";
import { NextResponse } from "next/server";

export async function POST(req, { params }) {
  try {
    const { id } = (await params).id;

    if (!id) {
      return new Response(
        { success: false, message: "Invalid id" },
        { status: 400 }
      );
    }

    await connectToDB();

    const userData = await Customer.findById(id);
    console.log(userData);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: error },
      { status: 500 }
    );
  }
}
