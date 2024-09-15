import { NextResponse } from "next/server";

export async function GET(req, res) {
  const cookies = require("next/headers").cookies;
  const cookieList = cookies();
  const { value } = cookieList.get("access") ?? { value: null };
  if (!value)
    return NextResponse.json(
      { detail: "User token not found!" },
      { status: 401 }
    );
  try {
    const body = JSON.stringify({
      token: value,
    });
    const response = await fetch(
      `${process.env.API_URL}/accounts/api/token/verify/`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: body,
      }
    );
    // Check if the response is ok (status in the range 200-299)
    if (!response.ok) {
      const errorData = await response.json();

      return NextResponse.json(
        {
          message: errorData.detail || "Failed to authenticate.",
        },
        { status: response.status }
      );
    }

    return NextResponse.json({}, { status: res.status });
  } catch (error) {
    console.error("Authenticate error:", error.message);
    return NextResponse.json(
      {
        detail:
          "Unable to reach the authentication service. Please try again later.",
      },
      { status: 500 }
    );
  }
}
