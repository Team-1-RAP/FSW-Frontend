export const registerProfile = async (email: string, username: string, password: string, confirmPassword: string) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL_NON_TRANSACTION}registration/customer/account`, {
            method: "POST",
            headers: {
                accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, username, password, confirmPassword }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            let errorMessage = "Registrasi gagal.";

            if (response.status === 400 && errorData.message) {
                if (errorData.message.includes("Invalid email format")) {
                    errorMessage = "Format email salah!";
                } else if (errorData.message.includes("Email is already taken")) {
                    errorMessage = "Email sudah digunakan.";
                } else if (errorData.message.includes("Username is already taken")) {
                    errorMessage = "Demi keamanan, gunakan username unik.";
                } else {
                    errorMessage = errorData.message;
                }
            } else if (response.status === 403) {
                errorMessage = "Akses ditolak.";
            }

            throw new Error(errorMessage);
        }

        const data = await response.json();

        return {
            username: data.data.data_customer.username,
            email: data.data.data_customer.email,
            otp: data.data.registration.otp_code,
        };
    } catch (error) {
        console.error("Error registering profile:", error);
        throw error;
    }
};
