import { connectToDB } from "@/utils/db";
import Customers from "@/models/userData";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDB();

    const users = await Customers.find({}).sort({ CustomerId: 1 });

    return NextResponse.json({ success: true, data: users }, { status: 200 });
  } catch (error) {
    console.error("❌ Error fetching users:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
