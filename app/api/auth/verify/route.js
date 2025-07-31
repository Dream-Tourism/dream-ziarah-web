import { NextResponse } from "next/server";

// Use the hardcoded IP for consistency with other routes and to resolve the 'undefined' error
const BACKEND_URL = "http://192.168.68.127:8004";

export async function GET(req) {
  try {
    // Get both access and refresh tokens from the incoming request cookies (HTTP-only)
    const accessToken = req.cookies.get("accessToken")?.value;
    const refreshToken = req.cookies.get("refreshToken")?.value;

    if (!accessToken) {
      return NextResponse.json({ message: "No access token" }, { status: 401 });
    }

    // Forward request to Django backend with both tokens in the Cookie header
    const headers = {
      "Content-Type": "application/json", // Ensure content type is set
      Cookie: `accessToken=${accessToken}; refreshToken=${refreshToken}`,
    };

    const response = await fetch(
      `${BACKEND_URL}/user/api/v1/user/session/verify/`,
      {
        method: "GET",
        headers: headers,
        credentials: "include", // Important for Django to read cookies
      }
    );

    const data = await response.json();

    const nextResponse = NextResponse.json(data, { status: response.status });

    // If Django's verify endpoint also sets/updates cookies (e.g., refresh token), forward them
    const setCookieHeader = response.headers.get("set-cookie");
    if (setCookieHeader) {
      const cookieStrings = setCookieHeader.split(/, (?=[a-zA-Z0-9]+=)/);
      cookieStrings.forEach((cookieString) => {
        const parts = cookieString.split(";");
        const [name, value] = parts[0].split("=");
        if (
          name &&
          value &&
          (name.trim() === "refreshToken" || name.trim() === "accessToken")
        ) {
          const cookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
          };
          const maxAgePart = parts.find((part) =>
            part.trim().startsWith("Max-Age=")
          );
          if (maxAgePart) {
            const maxAge = Number.parseInt(maxAgePart.split("=")[1], 10);
            if (!isNaN(maxAge)) {
              cookieOptions.maxAge = maxAge;
            }
          }
          nextResponse.cookies.set(name.trim(), value.trim(), cookieOptions);
        }
      });
    }

    return nextResponse;
  } catch (error) {
    console.error("Verify session proxy error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
