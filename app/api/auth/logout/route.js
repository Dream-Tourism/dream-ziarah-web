import { NextResponse } from "next/server";

export async function POST() {
  // Added log
  const response = NextResponse.json({ message: "Logged out successfully" });

  // Clear both accessToken and refreshToken cookies by setting their maxAge to 0
  response.cookies.set("accessToken", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Consistent secure flag
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });

  response.cookies.set("refreshToken", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Consistent secure flag
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });

  return response;
}
