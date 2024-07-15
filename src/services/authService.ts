export const loginUser = async (username: string, password: string): Promise<string | null> => {
    try {
        const response = await fetch("https://cautious-noelyn-ridho-71c54445.koyeb.app/api/v1/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error("Username tidak ditemukan!");
            } else {
                throw new Error("Username atau Password Salah!");
            }
        }

        const data = await response.json();

        if (data?.data?.accessToken) {
            localStorage.setItem("token", data.data.accessToken);
            return data.data.accessToken;
        } else {
            throw new Error("Token tidak ditemukan di data respons");
        }
    } catch (error) {
        console.error("Login error:", error);
        throw error;
    }
};
