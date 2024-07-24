export const loginUser = async (username: string, password: string): Promise<string | null> => {
    try {
        if (localStorage.getItem("activeSession") === "true") {
            throw new Error("Ada sesi aktif di tab lain. Silakan tutup tab tersebut terlebih dahulu.");
        }
        const response = await fetch("https://simplebank-stg.koyeb.app/api/v1/auth/login", {
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
            sessionStorage.setItem("token", data.data.accessToken);
            localStorage.setItem("activeSession", "true");
            window.addEventListener("unload", () => {
                sessionStorage.removeItem("token");
                localStorage.removeItem("activeSession");
            });
            return data.data.accessToken;
        } else {
            throw new Error("Token tidak ditemukan di data respons");
        }
    } catch (error) {
        console.error("Login error:", error);
        throw error;
    }
};
