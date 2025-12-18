const TOKEN_KEY = "carbontrackr-token";

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

async function apiRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = getToken();

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(endpoint, {
      ...options,
      headers,
    });

    const contentType = response.headers.get("content-type") || "";

    let data: any = null;

    if (contentType.includes("application/json")) {
      try {
        data = await response.json();
      } catch (parseError) {
        throw new Error("Failed to parse JSON response");
      }
    } else {
      const text = await response.text();
      if (!response.ok) {
        throw new Error(`Request failed: ${response.status} - ${text}`);
      }
      throw new Error("Unexpected non-JSON response from server");
    }

    if (!response.ok) {
      const message = (data && data.message) || `Request failed: ${response.status}`;
      throw new Error(message);
    }

    return data as T;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Network request failed");
  }
}

export const api = {
  login: (credentials: { email?: string; username?: string; password: string }) =>
    apiRequest<{ message: string; token: string }>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    }),

  register: (data: { fullName: string; username: string; email: string; password: string }) =>
    apiRequest<{ message: string }>("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  validateToken: () =>
    apiRequest<{ valid: boolean }>("/api/auth/validate", {
      method: "GET",
    }),
};
