import { validateAccountNumber } from "../utils/validation";

// Define types for API responses and function parameters
interface RecipientAccount {
    fullname: string;
    account_no: string;
}

interface BankDestination {
    name: string;
}

interface ApiResponse {
    code: number;
    data: {
        recipient_account: RecipientAccount;
        bank_destination: BankDestination;
    };
}

type NavigateFunction = (path: string, state?: object) => void;
type SetLoadingFunction = (loading: boolean) => void;
type SetErrorFunction = (error: string | null) => void;

export const validateAndFetchAccountData = async (accountNumber: string, token: string, navigate: NavigateFunction, setLoading: SetLoadingFunction, setError: SetErrorFunction) => {
    const error = validateAccountNumber(accountNumber);
    if (error) {
        setError(error);
        return;
    }

    setLoading(true);
    setError(null);

    try {
        const response = await fetch("http://35.208.108.76/v1/transfer/validation/bank", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                bank_id: 1,
                recipient_no_account: accountNumber,
            }),
        });

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error("Rekening tidak ditemukan");
            }
            const errorData = await response.json();
            console.error("API Error:", errorData);
            throw new Error("Terjadi kesalahan saat memvalidasi rekening.");
        }

        const data: ApiResponse = await response.json();
        console.log("API Data:", data);

        if (data.code === 200) {
            const { recipient_account, bank_destination } = data.data;
            const { fullname, account_no } = recipient_account;
            const { name } = bank_destination;

            navigate("/home/transfer/nominal", {
                state: {
                    accountNumber: account_no,
                    accountName: fullname,
                    bankName: name,
                },
            });
        } else {
            setError("Nomor rekening tidak valid.");
        }
    } catch (error) {
        // Type assertion to handle error
        const errorMessage = (error as Error).message;
        setError(errorMessage);
    } finally {
        setLoading(false);
    }
};
