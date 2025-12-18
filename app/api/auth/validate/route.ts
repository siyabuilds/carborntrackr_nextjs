import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_API_URL || "http://localhost:3001";

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("Authorization");

    if (!authHeader) {
      return NextResponse.json(
        { valid: false, message: "No authorization header" },
        { status: 401 }
      );
    }

    const response = await fetch(`${BACKEND_URL}/api/validate`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: authHeader,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { valid: false, message: data.message || "Validation failed" },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Validate proxy error:", error);
    return NextResponse.json(
      { valid: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
