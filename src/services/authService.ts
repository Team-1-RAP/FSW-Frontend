const setupSessionCleanup = () => {
    window.addEventListener("beforeunload", () => {
        sessionStorage.removeItem("token");
        localStorage.removeItem("activeSession");
    });
};

export const loginUser = async (username: string, password: string): Promise<string | null> => {
    try {
        if (localStorage.getItem("activeSession") === "true") {
            throw new Error("Ada sesi aktif di tab lain. Silakan tutup terlebih dahulu atau kembali ke tab tersebut.");
        }
        const response = await fetch(import.meta.env.VITE_API_BASE_URL + "api/v1/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        });

        if (response.status === 400) {
            const errorData = await response.json();
            let errorMessage = "Login gagal.";

            if (errorData.message && errorData.message.includes("Your invalid username or password has been attempted")) {
                if (errorData.message.includes("1 times")) {
                    errorMessage = "Password yang Anda masukkan salah. ";
                } else if (errorData.message.includes("2 times")) {
                    errorMessage = "Password yang Anda masukkan salah. Anda memiliki 1x percobaan sebelum password terblokir otomatis oleh sistem ";
                }
            } else {
                errorMessage = errorData.message || "Terjadi kesalahan saat melakukan login.";
            }

            throw new Error(errorMessage);
        } else if (response.status === 403) {
            throw { status: response.status };
        }

        if (!response.ok) {
            throw new Error("Username atau Password Salah!");
        }

        const data = await response.json();
        console.log(data);

        if (data?.data?.accessToken) {
            sessionStorage.setItem("token", data.data.accessToken);
            localStorage.setItem("activeSession", "true");
            if (!sessionStorage.getItem("cleanupSetup")) {
                setupSessionCleanup();
                sessionStorage.setItem("cleanupSetup", "true");
            }
            sessionStorage.removeItem("errorCount");
            return data.data.accessToken;
        } else {
            throw new Error("Login Gagal!");
        }
    } catch (error) {
        console.error("Login error:", error);
        throw error;
    }
};
