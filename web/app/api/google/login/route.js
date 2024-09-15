import { NextRequest, NextResponse } from "next/server";

export async function GET(req) {
  const apiUrl = process.env.API_URL;

  try {
    // Perform a preliminary check to see if the server is reachable
    const response = await fetch(apiUrl, { method: "HEAD" });

    // If server is reachable, proceed with redirection
    return NextResponse.redirect(`${apiUrl}/accounts/api/google_auth`, req.url);
  } catch (error) {
    return NextResponse.json("External Server Error. Please try again later", {
      status: 500,
    });
  }
}
