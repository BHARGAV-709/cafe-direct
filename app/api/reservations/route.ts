import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, phone, date, time, guests, userId } = body;

    if (!name || !phone || !date || !time || !guests) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    const reservation = await prisma.reservation.create({
      data: {
        name,
        phone,
        date,
        time,
        guests: guests.toString(),
        userId: userId || null,
      },
    });

    return NextResponse.json({ message: "Reservation confirmed", reservation }, { status: 201 });
  } catch (error) {
    console.error("Reservation Error:", error);
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}
