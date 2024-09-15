import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req) {
  const code = req.nextUrl.searchParams.get("code");

  const response = await fetch(
    `${process.env.API_URL}/accounts/api/google_auth_callback/`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code: code }),
    }
  );
  const data = await response.json();
  if (response.ok) {
    cookies().set({
      name: "access",
      value: data.access,
      httpOnly: true,
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 30,
    });
    cookies().set({
      name: "refresh",
      value: data.refresh,
      httpOnly: true,
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24,
    });
    return NextResponse.redirect(new URL("/", req.url));
  } else {
    console.error("Failed to authenticate with Google");
    // Handle failed authentication
  }
  return NextResponse.json(data, { status: response.status });
}
