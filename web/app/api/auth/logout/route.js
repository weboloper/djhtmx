import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request, res) {
  cookies().set({
    name: "access",
    value: "",
    httpOnly: true,
    sameSite: "strict",
    path: "/",
    expires: new Date(0),
  });

  cookies().set({
    name: "refresh",
    value: "",
    httpOnly: true,
    sameSite: "strict",
    path: "/",
    expires: new Date(0),
  });

  return NextResponse.json({}, { status: 200 });
}
