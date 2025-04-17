import { NextResponse } from "next/server";
import axios from "axios";

export async function GET() {
  const response = await axios.get(
    process.env.NEXT_PUBLIC_MANY_ROADS_BACKEND + "/routes",
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return NextResponse.json(response.data);
}
