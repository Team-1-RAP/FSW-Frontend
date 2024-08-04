const MAX_LOGIN_ATTEMPTS = 2; // Maksimal percobaan login

const getLoginAttemptCount = (): number => {
    const attempts = sessionStorage.getItem("login_attempts");
    return attempts ? parseInt(attempts, 10) : 0;
};

const incrementLoginAttemptCount = (): void => {
    const attempts = getLoginAttemptCount();
    sessionStorage.setItem("login_attempts", (attempts + 1).toString());
};

const resetLoginAttemptCount = (): void => {
    sessionStorage.removeItem("login_attempts");
};

const setupSessionCleanup = () => {
    window.addEventListener("beforeunload", () => {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("activeSession");
    });
};

export const loginUser = async (username: string, password: string): Promise<string | null> => {
    try {
        const attempts = getLoginAttemptCount();
        if (attempts >= MAX_LOGIN_ATTEMPTS) {
            throw new Error("Jumlah percobaan login telah melebihi batas. Silakan coba lagi nanti.");
        }

        const response = await fetch(import.meta.env.VITE_API_BASE_URL + "api/v1/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        });

        if (response.status === 403) {
            // Menangani status 403 dengan modal
            throw { status: 403 };
        }

        if (!response.ok) {
            incrementLoginAttemptCount();
            if (getLoginAttemptCount() >= MAX_LOGIN_ATTEMPTS) {
                throw new Error("Jumlah percobaan login telah melebihi batas. Silakan coba lagi nanti.");
            }
            throw new Error("Username atau Password Salah!");
        }

        const data = await response.json();
        console.log(data);

        if (data?.data?.accessToken) {
            sessionStorage.setItem("token", data.data.accessToken);
            sessionStorage.setItem("activeSession", "true");
            if (!sessionStorage.getItem("cleanupSetup")) {
                setupSessionCleanup();
                sessionStorage.setItem("cleanupSetup", "true");
            }
            resetLoginAttemptCount(); // Reset percobaan login setelah login berhasil
            return data.data.accessToken;
        } else {
            throw new Error("Login Gagal!");
        }
    } catch (error) {
        console.error("Login error:", error);
        throw error;
    }
};
