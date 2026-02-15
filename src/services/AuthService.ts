export const CURRENT_ERROR_MODE = "inline" as const;

export interface LoginResponse {
  success: boolean;
  message?: string;
  data?: {
    token: string;
    user: {
      id: string;
      name: string;
      email: string;
    };
  };
}

export async function handleLogin(
  username: string,
  password: string
): Promise<[boolean, LoginResponse]> {
  // Mock login - replace with actual API call
  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (username === "test" && password === "123") {
    return [
      true,
      {
        success: true,
        message: "Login berhasil",
        data: {
          token: "mock-token-123",
          user: {
            id: "1",
            name: "Test User",
            email: "test@example.com",
          },
        },
      },
    ];
  }

  return [
    false,
    {
      success: false,
      message: "Username atau password salah",
    },
  ];
}
