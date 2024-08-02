// src/services/transferService.ts

interface TransferData {
    accountNo: string;
    recipientAccountNo: string;
    recipientBankName: string;
    amount: number;
    pin: string;
    description: string;
    senderFullName: string;
}

interface TransferResponse {
    noRef: string;
    date: string;
    recipientFullName: string;
    recipientBankName: string;
    recipientBankAccountNo: string;
    amount: number;
}

type NavigateFunction = (path: string, state?: object) => void;
type SetAlertFunction = (message: string | null) => void;
type SetIsAlertVisibleFunction = (visible: boolean) => void;

export const submitTransfer = async (transferData: TransferData, token: string, navigate: NavigateFunction, setAlert: SetAlertFunction, setIsAlertVisible: SetIsAlertVisibleFunction) => {
    try {
        const response = await fetch("https://simplebank-stg.koyeb.app/api/v1/bank-transfers", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(transferData),
        });

        if (response.ok) {
            const { data }: { data: TransferResponse } = await response.json();
            navigate("/home/transfer/success", {
                state: {
                    noRef: data.noRef,
                    date: data.date,
                    recipientFullName: data.recipientFullName,
                    recipientBankName: data.recipientBankName,
                    recipientBankAccountNo: data.recipientBankAccountNo,
                    amount: data.amount,
                    senderAccountNo: transferData.accountNo,
                    senderFullName: transferData.senderFullName,
                },
            });
        } else {
            const errorData = await response.json();
            throw new Error(errorData.message || "Terjadi kesalahan saat melakukan transfer.");
        }
    } catch (error) {
        setAlert((error as Error).message);
        setIsAlertVisible(true);
        setTimeout(() => setIsAlertVisible(false), 3000);
    }
};
