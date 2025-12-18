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

  const response = await fetch(endpoint, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || `Request failed: ${response.status}`);
  }

  return data;
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
