export interface AccountType {
    id: number;
    code: string;
    type: string;
    created_at: string;
    updated_at: string;
}

export const fetchAccountTypes = async (): Promise<AccountType[]> => {
    try {
        const response = await fetch(import.meta.env.VITE_API_BASE_URL_NON_TRANSACTION + "account/type/accountTypes");
        if (!response.ok) throw new Error("Failed to fetch account types");
        const result = await response.json();
        return result.data;
    } catch (error) {
        console.error("Error fetching account types:", error);
        return [];
    }
};
