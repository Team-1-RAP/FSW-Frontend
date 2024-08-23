import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RegisterContext } from "../../../context/RegisterContext";

interface AccountPurpose {
    id: number;
    type: string;
}

const VerifyBiodataPage: React.FC = () => {
    const navigate = useNavigate();
    const context = useContext(RegisterContext);
    const [accountPurposes, setAccountPurposes] = useState<AccountPurpose[]>(
        []
    );
    const [loading, setLoading] = useState<boolean>(true);
    const [errorMessage, setErrorMessage] = useState<string>("");

    if (!context) {
        return <div>Loading...</div>;
    }

    const {
        username,
        email,
        otp,
        accountTypeId,
        fullname,
        nik,
        born_date,
        address,
        accountPurpose_id,
        setFullname,
        setNik,
        setBornDate,
        setAddress,
        setAccountPurposeId,
    } = context;

    // Initialize local state with context values if available
    const [localFullname, setLocalFullname] = useState<string>(fullname || "");
    const [localNik, setLocalNik] = useState<string>(nik || "");
    const [localBornDate, setLocalBornDate] = useState<string>(born_date || "");
    const [localAddress, setLocalAddress] = useState<string>(address || "");
    const [localAccountPurposeId, setLocalAccountPurposeId] = useState<
        number | null
    >(accountPurpose_id || null);

    useEffect(() => {
        const fetchAccountPurposes = async () => {
            try {
                const response = await fetch(
                    "https://simplebank.my.id/v1/account/purposes/accountPurposes"
                );
                const result = await response.json();
                if (result.status) {
                    setAccountPurposes(result.data);
                } else {
                    console.error("Failed to fetch account purposes");
                }
            } catch (error) {
                console.error("Error fetching account purposes:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAccountPurposes();
    }, []);

    const isOver17YearsOld = (birthDate: string): boolean => {
        const currentDate = new Date();
        const birth = new Date(birthDate);
        const age = currentDate.getFullYear() - birth.getFullYear();
        const monthDiff = currentDate.getMonth() - birth.getMonth();

        if (
            monthDiff < 0 ||
            (monthDiff === 0 && currentDate.getDate() < birth.getDate())
        ) {
            return age - 1 >= 17;
        }
        return age >= 17;
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        if (!isOver17YearsOld(localBornDate)) {
            setErrorMessage(
                "Anda harus berusia lebih dari 17 tahun untuk mendaftar."
            );
            return;
        }

        // Clear error message if validation passes
        setErrorMessage("");

        // Update context with local state values
        setFullname(localFullname);
        setNik(localNik);
        setBornDate(localBornDate);
        setAddress(localAddress);
        setAccountPurposeId(localAccountPurposeId);

        console.log("User Details:", {
            username,
            email,
            otp,
            accountTypeId,
            fullname,
            nik,
            born_date,
            address,
            accountPurpose_id,
        });
        navigate("/register/upload-persyaratan");
    };

    return (
        <div className="flex flex-col items-center justify-center w-[340px] mb-10">
            <h1 className="text-[28px] font-medium">Formulir Data Diri</h1>
            <form className="w-full mt-8 space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-1">
                    <label htmlFor="nama" className="block text-xs font-light">
                        Nama Lengkap
                    </label>
                    <input
                        type="text"
                        id="nama"
                        placeholder="Nama Lengkap"
                        value={localFullname}
                        onChange={(e) => setLocalFullname(e.target.value)}
                        className="w-full p-3 border rounded-lg border-[#C4C4C4]"
                    />
                </div>
                <div className="space-y-1">
                    <label htmlFor="nik" className="block text-xs font-light">
                        NIK
                    </label>
                    <input
                        type="text"
                        id="nik"
                        placeholder="NIK"
                        value={localNik}
                        onChange={(e) => setLocalNik(e.target.value)}
                        className="w-full p-3 border rounded-lg border-[#C4C4C4]"
                    />
                </div>
                <div className="space-y-1">
                    <label
                        htmlFor="tanggalLahir"
                        className="block text-xs font-light"
                    >
                        Tanggal Lahir
                    </label>
                    <input
                        type="date"
                        id="tanggalLahir"
                        value={localBornDate}
                        onChange={(e) => setLocalBornDate(e.target.value)}
                        className="w-full p-3 border rounded-lg border-[#C4C4C4]"
                    />
                </div>
                {errorMessage && (
                    <p className="text-sm text-red-500">{errorMessage}</p>
                )}
                <div className="space-y-1">
                    <label
                        htmlFor="alamat"
                        className="block text-xs font-light"
                    >
                        Alamat Domisili
                    </label>
                    <input
                        type="text"
                        id="alamat"
                        placeholder="Alamat Domisili"
                        value={localAddress}
                        onChange={(e) => setLocalAddress(e.target.value)}
                        className="w-full p-3 border rounded-lg border-[#C4C4C4]"
                    />
                </div>
                <div className="space-y-1">
                    <label
                        htmlFor="rekening"
                        className="block text-xs font-light"
                    >
                        Tujuan Membuka Rekening
                    </label>
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        <select
                            name="rekening"
                            id="rekening"
                            value={
                                localAccountPurposeId !== null
                                    ? localAccountPurposeId
                                    : ""
                            }
                            onChange={(e) =>
                                setLocalAccountPurposeId(
                                    Number(e.target.value) || null
                                )
                            }
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
                <div className="flex flex-row w-full space-x-4 text-base font-bold">
                    <Link
                        to="/register/tipe-rekening"
                        className="py-3 border-[#055287] rounded-lg text-[#055287] w-1/2 border text-center"
                    >
                        Kembali
                    </Link>
                    <button
                        type="submit"
                        className="py-3 bg-[#055287] rounded-lg text-white w-1/2"
                    >
                        Selanjutnya
                    </button>
                </div>
            </form>
        </div>
    );
};

export default VerifyBiodataPage;
