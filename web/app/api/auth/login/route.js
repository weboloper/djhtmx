import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req, res) {
  try {
    const body = await req.json();
    const response = await fetch(`${process.env.API_URL}/accounts/api/token/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    // Check if the response is ok (status in the range 200-299)

    if (response.ok) {
      const data = await response.json();

      cookies().set({
        name: "access",
        value: data.access,
        httpOnly: true,
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 30,
        secure: process.env.NODE_ENV === "production",
      });
      cookies().set({
        name: "refresh",
        value: data.refresh,
        httpOnly: true,
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24,
        secure: process.env.NODE_ENV === "production",
      });

      return NextResponse.json(data, { status: response.status });
    } else {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }
  } catch (error) {
    // Handle network errors or other unexpected issues
    console.error("Login error:", error.message);
    return NextResponse.json(
      {
        detail:
          "Unable to reach the authentication service. Please try again later.",
      },
      { status: 500 }
    );
  }
}
