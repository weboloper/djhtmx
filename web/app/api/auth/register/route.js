import { NextResponse } from "next/server";

export async function POST(req, res) {
  try {
    const body = await req.json();
    const response = await fetch(
      `${process.env.API_URL}/accounts/api/register/`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );
    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      { detail: "Bir şeyler ters gitti.Lütfen daha sonra deneyiniz" },
      { status: 500 }
    );
  }
}
