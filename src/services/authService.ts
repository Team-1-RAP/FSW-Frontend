const setupSessionCleanup = () => {
    window.addEventListener("beforeunload", () => {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("activeSession");
    });
};

export const loginUser = async (username: string, password: string): Promise<string | null> => {
    try {
        const activeSession = sessionStorage.getItem("activeSession");

        if (activeSession === "true") {
            throw new Error("Ada sesi aktif di tab lain. Silakan tutup terlebih dahulu atau kembali ke tab tersebut.");
        }

        const response = await fetch(import.meta.env.VITE_API_BASE_URL + "api/v1/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
            if (response.status === 403) {
                throw { status: 403 };
            }
            throw new Error("Username atau Password Salah!");
        }

        const data = await response.json();
        console.log(data);

        if (data?.data?.accessToken) {
            sessionStorage.setItem("token", data.data.accessToken);
            sessionStorage.setItem("activeSession", "true");
            // Hanya panggil setupSessionCleanup sekali
            if (!sessionStorage.getItem("cleanupSetup")) {
                setupSessionCleanup();
                sessionStorage.setItem("cleanupSetup", "true");
            }
            return data.data.accessToken;
        } else {
            throw new Error("Login Gagal!");
        }
    } catch (error) {
        console.error("Login error:", error);
        throw error;
    }
};
