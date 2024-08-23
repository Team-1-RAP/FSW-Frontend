interface UploadDocumentsResponse {
    message: string;
}

interface ErrorResponse {
    message: string;
}

export const uploadDocuments = async (formData: FormData): Promise<UploadDocumentsResponse> => {
    try {
        // Log the FormData contents for debugging
        formData.forEach((value, key) => {
            if (value instanceof File) {
                console.log(`${key}: File - ${value.name}`);
            } else {
                console.log(`${key}: ${value}`);
            }
        });

        const response = await fetch(import.meta.env.VITE_API_BASE_URL_NON_TRANSACTION + "registration/customer/profile", {
            method: "POST",
            body: formData,
        });

        // Check if the response status is OK
        if (!response.ok) {
            const errorData: ErrorResponse = await response.json();
            console.error("API Error:", errorData.message);
            throw new Error(errorData.message || "An unknown error occurred");
        }

        // Parse and return the response JSON
        return (await response.json()) as UploadDocumentsResponse;
    } catch (error) {
        // Handle network or parsing errors
        if (error instanceof Error) {
            console.error("Error submitting registration:", error.message);
            throw new Error(error.message || "An unexpected error occurred.");
        } else {
            console.error("Unknown error:", error);
            throw new Error("An unexpected error occurred.");
        }
    }
};
