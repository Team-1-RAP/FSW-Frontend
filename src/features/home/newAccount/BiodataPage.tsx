import React, { useContext, useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AccountContext } from "../../../context/AccountContext";
import FormField from "../../../components/elements/form/FormRegister";
import { fetchAccountPurposes, AccountPurpose } from "../../../utils/fetchAccountPurpouse";
import Alert from "../../../components/fragments/Alert";
import { format } from "date-fns";
import { useAuth } from "../../../hooks/useAuth";

const Biodata: React.FC = () => {
    const navigate = useNavigate();
    const { fullname } = useAuth();
    const { accountDetails, user, fetchUserInfo } = useContext(AccountContext)!;
    const [accountPurposes, setAccountPurposes] = useState<AccountPurpose[]>([]);
    const [formData, setFormData] = useState<FormData>({
        address: accountDetails?.address || "",
        accountPurposeId: null,
    });
    const [loading, setLoading] = useState<boolean>(true);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [isAlertVisible, setIsAlertVisible] = useState<boolean>(false);
    const [userProfileFetched, setUserProfileFetched] = useState<boolean>(false);

    // Define the formData type
    interface FormData {
        address: string;
        accountPurposeId: number | null;
    }

    // Fetch user info and account purposes
    const fetchData = useCallback(async () => {
        try {
            const token = sessionStorage.getItem("token");
            if (token && !userProfileFetched) {
                await fetchUserInfo(token);
                setUserProfileFetched(true);
            }
            const purposes = await fetchAccountPurposes();
            setAccountPurposes(purposes);
        } catch (error) {
            console.error("Error fetching data:", error);
            setErrorMessage("Terjadi kesalahan saat memuat data.");
            setIsAlertVisible(true);
        } finally {
            setLoading(false);
        }
    }, [fetchUserInfo, userProfileFetched]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    // Validate form data
    const validateFormData = () => {
        if (!formData.address || formData.accountPurposeId === null) {
            setErrorMessage("Data tidak lengkap. Mohon lengkapi semua field.");
            setIsAlertVisible(true);
            return false;
        }
        return true;
    };

    // Handle form submission
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!validateFormData()) return;

        const token = sessionStorage.getItem("token");

        if (!accountDetails || accountDetails.accountTypeId === undefined) {
            setErrorMessage("Account type ID tidak tersedia.");
            setIsAlertVisible(true);
            return;
        }

        const requestBody = {
            accountTypeId: accountDetails.accountTypeId,
            address: formData.address,
            accountPurposeId: formData.accountPurposeId,
        };

        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL_NON_TRANSACTION}account/new/accountType`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(requestBody),
            });

            if (!response.ok) {
                const errorResponse = await response.json();
                throw new Error(errorResponse.message || "Gagal mengirim data ke API");
            }

            navigate("/new-account/finish");
        } catch (error) {
            setErrorMessage("Terjadi kesalahan saat mengirim data.");
            setIsAlertVisible(true);
        }
    };

    const formattedBornDate = user?.bornDate ? format(new Date(user.bornDate), "yyyy-MM-dd") : "Tanggal lahir tidak tersedia";

    return (
        <div className="flex flex-col items-center justify-center w-[340px] mb-10">
            <h1 className="text-[28px] font-medium">Formulir Data Diri</h1>
            <form className="w-full mt-8 space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-1">
                    <label htmlFor="nama" className="block text-xs font-light">
                        Nama Lengkap
                    </label>
                    <p id="nama" className="w-full p-3 border rounded-lg border-[#C4C4C4]">
                        {fullname || "Nama tidak tersedia"}
                    </p>
                </div>
                <div className="space-y-1">
                    <label htmlFor="nik" className="block text-xs font-light">
                        NIK
                    </label>
                    <p id="nik" className="w-full p-3 border rounded-lg border-[#C4C4C4]">
                        {user?.nik || "NIK tidak tersedia"}
                    </p>
                </div>
                <div className="space-y-1">
                    <label htmlFor="tanggalLahir" className="block text-xs font-light">
                        Tanggal Lahir
                    </label>
                    <p id="tanggalLahir" className="w-full p-3 border rounded-lg border-[#C4C4C4]">
                        {formattedBornDate}
                    </p>
                </div>
                <FormField id="alamat" label="Alamat Domisili" type="text" value={formData.address} onChange={(e) => setFormData((prev) => ({ ...prev, address: e.target.value }))} />
                <div className="space-y-1">
                    <label htmlFor="rekening" className="block text-xs font-light">
                        Tujuan Membuka Rekening
                    </label>
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        <select
                            name="rekening"
                            id="rekening"
                            value={formData.accountPurposeId !== null ? formData.accountPurposeId.toString() : ""}
                            onChange={(e) => setFormData({ ...formData, accountPurposeId: e.target.value ? Number(e.target.value) : null })}
                            className="w-full p-3 border rounded-lg border-[#C4C4C4]"
                        >
                            <option value="" disabled hidden>
                                Pilih Tujuan
                            </option>
                            {accountPurposes.map((purpose) => (
                                <option key={purpose.id} value={purpose.id}>
                                    {purpose.type}
                                </option>
                            ))}
                        </select>
                    )}
                </div>
                <Alert message={errorMessage} isVisible={isAlertVisible} />
                <div className="flex flex-row w-full space-x-4 text-base font-bold">
                    <Link to="/new-account/" className="py-3 border-[#055287] rounded-lg text-[#055287] w-1/2 border text-center">
                        Kembali
                    </Link>
                    <button type="submit" className="py-3 bg-[#055287] rounded-lg text-white w-1/2">
                        Selanjutnya
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Biodata;
