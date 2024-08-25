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
type SetIsModalVisibleFunction = (visible: boolean) => void;

const getAttemptCount = (): number => {
    const attempts = localStorage.getItem("pin_attempts");
    return attempts ? parseInt(attempts, 10) : 0;
};

const incrementAttemptCount = (): void => {
    const attempts = getAttemptCount();
    localStorage.setItem("pin_attempts", (attempts + 1).toString());
};

const resetAttemptCount = (): void => {
    localStorage.removeItem("pin_attempts");
};

const handleError = async (response: Response, setAlert: SetAlertFunction, setIsAlertVisible: SetIsAlertVisibleFunction, setIsModalVisible: SetIsModalVisibleFunction) => {
    if (response.status === 403) {
        setIsModalVisible(true);
        return;
    }

    if (response.status === 400) {
        const attempts = getAttemptCount();
        let errorMessage = "Terjadi kesalahan saat melakukan transfer.";

        if (attempts === 0) {
            errorMessage = "PIN yang Anda masukkan salah.";
        } else if (attempts === 1) {
            errorMessage = "Anda memiliki 1 kali kesempatan lagi.";
        } else {
            errorMessage = "Percobaan PIN telah habis. Silakan coba lagi nanti.";
            resetAttemptCount(); // Reset count after showing the final message
        }

        incrementAttemptCount();
        setAlert(errorMessage);
    } else {
        const errorData = await response.json();
        setAlert(errorData.message || "Terjadi kesalahan saat melakukan transfer.");
    }

    setIsAlertVisible(true);
    setTimeout(() => setIsAlertVisible(false), 3000);
};

export const submitTransfer = async (
    transferData: TransferData,
    token: string,
    navigate: NavigateFunction,
    setAlert: SetAlertFunction,
    setIsAlertVisible: SetIsAlertVisibleFunction,
    setIsModalVisible: SetIsModalVisibleFunction
): Promise<void> => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}api/v1/bank-transfers`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(transferData),
        });

        if (!response.ok) {
            await handleError(response, setAlert, setIsAlertVisible, setIsModalVisible);
            return;
        }

        // Reset attempt count on successful transfer
        resetAttemptCount();

        // Proses sukses
        const { data }: { data: TransferResponse } = await response.json();
        navigate("/transfer/success", {
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
    } catch (error) {
        const errorMessage = (error as Error).message || "Terjadi kesalahan yang tidak diketahui.";
        setAlert(errorMessage);
        setIsAlertVisible(true);
        setTimeout(() => setIsAlertVisible(false), 3000);
    }
};
