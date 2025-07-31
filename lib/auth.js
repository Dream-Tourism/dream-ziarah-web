"use client";

// These functions are now pure API call wrappers.
// They do not interact with Redux or sessionStorage directly.

export async function loginUser(username, password) {
  try {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok) {
      return { success: true, user: data.user };
    } else {
      return { success: false, error: data.detail || "Login failed" };
    }
  } catch (error) {
    console.error("Login API call error:", error);
    return { success: false, error: "Network error. Please try again." };
  }
}

export async function verifySession() {
  try {
    const response = await fetch("/api/auth/verify", {
      method: "GET",
    });

    if (response.ok) {
      const data = await response.json();
      return data.user;
    }
    return null;
  } catch (error) {
    console.error("Session verification API call error:", error);
    return null;
  }
}

export async function refreshToken() {
  try {
    const response = await fetch("/api/auth/refresh", {
      method: "POST",
    });

    const data = await response.json();

    if (response.ok) {
      return data.user;
    }
    return null;
  } catch (error) {
    console.error("Token refresh API call error:", error);
    return null;
  }
}

export async function logout() {
  try {
    await fetch("/api/auth/logout", {
      method: "POST",
    });
    return { success: true };
  } catch (error) {
    console.error("Logout API call error:", error);
    return { success: false, error: "Logout failed on server." };
  }
}
