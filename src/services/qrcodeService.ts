interface DataCode {
  accountNo: string;
  amount: number;
  pin: string;
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

const handleError = async (
  response: Response,
  setAlert: SetAlertFunction,
  setIsAlertVisible: SetIsAlertVisibleFunction,
  setIsModalVisible: SetIsModalVisibleFunction
) => {
  let errorMessage = "Terjadi kesalahan saat melakukan transfer.";
  const data = await response.json();

  switch (response.status) {
    case 403:
      setIsModalVisible(true);
      resetAttemptCount();
      return;

    case 400:
      if (data.message.includes("PIN")) {
        // eslint-disable-next-line no-case-declarations
        const attempts = getAttemptCount();
        if (attempts === 0) {
          errorMessage = "PIN yang Anda masukkan salah.";
        } else if (attempts === 1) {
          errorMessage = "Anda memiliki 1 kali kesempatan lagi.";
        } else {
          errorMessage = "Percobaan PIN telah habis. Silakan coba lagi nanti.";
          resetAttemptCount();
        }
        incrementAttemptCount();
        break;
      } else if (data.message.includes("balance")) {
        errorMessage = "Saldo Anda tidak mencukupi.";
      } else {
        errorMessage = "Terjadi kesalahan saat memproses kode bayar.";
        console.log(data);
      }
      break;

    default:
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } catch {
        errorMessage = "Terjadi kesalahan saat memproses kode bayar.";
      }
      break;
  }

  setAlert(errorMessage);
  setIsAlertVisible(true);
  setTimeout(() => setIsAlertVisible(false), 3000);
};

export const generateCode = async (
  datacode: DataCode,
  token: string,
  navigate: NavigateFunction,
  setAlert: SetAlertFunction,
  setIsAlertVisible: SetIsAlertVisibleFunction,
  setIsModalVisible: SetIsModalVisibleFunction
) => {
  if (!token) {
    setAlert("Token tidak ditemukan. Silakan login kembali.");
    setIsAlertVisible(true);
    setTimeout(() => setIsAlertVisible(false), 3000);
    return;
  }

  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}api/v1/qris/generate-qr-code`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(datacode),
      }
    );

    if (!response.ok) {
      await handleError(
        response,
        setAlert,
        setIsAlertVisible,
        setIsModalVisible
      );
      return;
    }
    const dataResponse = await response.json();
    navigate("display", { state: { dataResponse } });
  } catch (error) {
    const errorMessage =
      (error as Error).message || "Terjadi kesalahan yang tidak diketahui.";
    setAlert(errorMessage);
    setIsAlertVisible(true);
    setTimeout(() => setIsAlertVisible(false), 3000);
  }
};
