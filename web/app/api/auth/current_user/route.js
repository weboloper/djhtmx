import { NextResponse } from "next/server";

export async function GET(request, res) {
  const cookies = require("next/headers").cookies;
  const cookieList = cookies();
  const { value } = cookieList.get("access") ?? { value: null };
  try {
    if (!value)
      return NextResponse.json(
        { detail: "Kullanıcı girişi bulunamadı" },
        { status: 401 }
      );

    const response = await fetch(
      `${process.env.API_URL}/accounts/api/current_user/`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${value}`,
        },
      }
    );
    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ detail: error.message }, { status: 500 });
  }
}
