export const loginUser = async (username: string, password: string): Promise<string | null> => {
    try {
        if (localStorage.getItem("activeSession") === "true") {
            throw new Error("Ada sesi aktif di tab lain. Silakan tutup terlebih dahulu atau kembali ke tab tersebut.");
        }
        const response = await fetch("https://simplebank-stg.koyeb.app/api/v1/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
            if (response.status === 403) {
                throw new Error("Percobaan sudah 3 kali gagal, Akun anda terblokir!");
            }
            throw new Error("Username atau Password Salah!");
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
            throw new Error("Login Gagal!");
        }
    } catch (error) {
        console.error("Login error:", error);
        throw error;
    }
};
