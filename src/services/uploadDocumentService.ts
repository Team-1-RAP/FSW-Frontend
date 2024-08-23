interface UploadDocumentsResponse {
    message: string;
}

interface ErrorResponse {
    message: string;
}

export const uploadDocuments = async (formData: FormData): Promise<UploadDocumentsResponse> => {
    try {
        const response = await fetch("https://simplebank.my.id/v1/registration/customer/profile", {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            const errorData: ErrorResponse = await response.json();
            throw new Error(errorData.message || "An unknown error occurred");
        }

        return (await response.json()) as UploadDocumentsResponse;
    } catch (error) {
        console.error("Error submitting registration:", error);
        // Rethrow a generic error message for the caller
        throw new Error("An unexpected error occurred.");
    }
};
