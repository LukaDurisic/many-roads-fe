import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: Request) {
  const body = await req.json();

  const response = await axios.post(
    process.env.NEXT_PUBLIC_MANY_ROADS_BACKEND + "/accounts/login/",
    body,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return NextResponse.json(response.data);
}
