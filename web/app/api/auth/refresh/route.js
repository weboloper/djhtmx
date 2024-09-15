import { NextResponse } from "next/server";
export async function GET(request, res) {
  const cookies = require("next/headers").cookies;
  const cookieList = cookies();
  const { value } = cookieList.get("refresh") ?? { value: null };
  if (!value)
    return NextResponse.json(
      { detail: "Refresh token not found!" },
      { status: 401 }
    );
  try {
    const body = JSON.stringify({
      refresh: value,
    });
    const response = await fetch(
      `${process.env.API_URL}/accounts/api/token/refresh/`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: body,
      }
    );

    const data = await response.json();

    if (response.status === 200) {
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
        axAge: 60 * 60 * 24,
      });
    } else {
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
    }

    return NextResponse.json({ ...data }, { status: response.status });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ detail: error.message }, { status: 500 });
  }
}
