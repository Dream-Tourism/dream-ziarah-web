import { NextResponse } from "next/server";

const BACKEND_URL = "http://192.168.68.127:8004";

export async function POST(request) {
  try {
    const body = await request.json();

    const response = await fetch(`${BACKEND_URL}/user/api/v1/user/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      credentials: "include",
    });

    const data = await response.json();

    // Create a new response to send back to the client
    const nextResponse = NextResponse.json(
      { user: data.user },
      { status: response.status }
    ); // Only send user data, not tokens

    // Handle accessToken from Django's JSON response and set it as an HTTP-only cookie
    if (data.accessToken) {
      nextResponse.cookies.set("accessToken", data.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Set to true in production with HTTPS
        sameSite: "lax", // Or 'strict' or 'none' (requires secure: true)
        path: "/",
        maxAge: 15 * 60, // Example: 15 minutes for access token
      });
    }

    // Forward the refreshToken cookie from Django to the client's browser
    const setCookieHeader = response.headers.get("set-cookie");
    if (setCookieHeader) {
      const cookieStrings = setCookieHeader.split(/, (?=[a-zA-Z0-9]+=)/); // Split by comma followed by a new cookie name
      cookieStrings.forEach((cookieString) => {
        const parts = cookieString.split(";");
        const [name, value] = parts[0].split("=");

        if (name && value && name.trim() === "refreshToken") {
          const cookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Set to true in production with HTTPS
            sameSite: "lax", // Or 'strict' or 'none' (requires secure: true)
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
    console.error("Login API proxy error:", error);
    return NextResponse.json(
      { detail: "Internal server error" },
      { status: 500 }
    );
  }
}
