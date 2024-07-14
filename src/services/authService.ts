export const loginUser = async (username: string, password: string): Promise<string | null> => {
    try {
        const response = await fetch("https://cautious-noelyn-ridho-71c54445.koyeb.app/api/v1/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        });
        if (!response) {
            throw new Error("Login Gagal");
        }
        const data = await response.json();
        if (data) {
            localStorage.setItem("token", data.data.accessToken);
            return data.data.accessToken;
        } else {
            throw new Error("Kredensial tidak sesuai");
        }
    } catch (error) {
        throw new Error("An error occurred during login");
    }
};
