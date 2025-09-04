import { BASE_URL } from "@/constant/constants";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    // Get both access and refresh tokens from the incoming request cookies (HTTP-only)
    const accessToken = request.cookies.get("accessToken")?.value;
    const refreshToken = request.cookies.get("refreshToken")?.value;

    if (!refreshToken) {
      // If refresh token is missing, clear client-side cookies and return 401
      const response = NextResponse.json(
        { message: "Refresh token missing" },
        { status: 401 }
      );
      response.cookies.set("accessToken", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 0,
      });
      response.cookies.set("refreshToken", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 0,
      });
      return response;
    }

    // Forward request to Django backend with both tokens in the Cookie header
    const headers = {
      "Content-Type": "application/json", // Ensure content type is set
      Cookie: `accessToken=${accessToken}; refreshToken=${refreshToken}`,
    };

    const response = await fetch(
      `${BASE_URL}/user/api/v1/user/token/refresh/`,
      {
        method: "POST",
        headers: headers,
        credentials: "include", // Important for Django to read cookies
      }
    );

    const data = await response.json();

    const nextResponse = NextResponse.json(data, { status: response.status });

    if (!response.ok) {
      // If refresh failed (e.g., refresh token expired/invalid), clear client-side cookies
      nextResponse.cookies.set("accessToken", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 0,
      });
      nextResponse.cookies.set("refreshToken", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 0,
      });
    } else {
      // If refresh successful, forward any updated tokens from Django
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
    }

    return nextResponse;
  } catch (error) {
    console.error("Refresh token proxy error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
