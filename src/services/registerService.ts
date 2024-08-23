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
            throw new Error("Error registering profile");
        }

        const data = await response.json();
        // console.log(data);

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
