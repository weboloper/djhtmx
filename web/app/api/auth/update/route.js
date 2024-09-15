import { NextResponse } from "next/server";

export async function POST(request, res) {
  const cookies = require("next/headers").cookies;
  const cookieList = cookies();
  const { value } = cookieList.get("access") ?? { value: null };
  if (!value)
    return NextResponse.json(
      { detail: "Kullanıcı girişi bulunamadı" },
      { status: 401 }
    );

  const formData = await request.formData();

  const formData2 = {
    profile: {
      bio: "herror",
    },
  };

  const response = await fetch(
    `${process.env.API_URL}/accounts/api/current_user/`,
    {
      method: "PUT",

      headers: {
        Authorization: `Bearer ${value}`,
      },
      body: formData,
    }
  );

  const data = await response.json();
  return NextResponse.json(data, { status: response.status });
}
