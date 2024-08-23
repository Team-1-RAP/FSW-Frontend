import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RegisterContext } from "../../../context/RegisterContext";
import FormField from "../../../components/elements/form/FormRegister";
import { fetchAccountPurposes, isOver17YearsOld, AccountPurpose } from "../../../utils/fetchAccountPurpouse";
import Alert from "../../../components/fragments/Alert";

const VerifyBiodataPage: React.FC = () => {
    const navigate = useNavigate();
    const context = useContext(RegisterContext);
    const [accountPurposes, setAccountPurposes] = useState<AccountPurpose[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [isAlertVisible, setIsAlertVisible] = useState<boolean>(false);
    const [formData, setFormData] = useState({
        fullname: context?.fullname || "",
        nik: context?.nik || "",
        bornDate: context?.born_date || "",
        address: context?.address || "",
        accountPurposeId: context?.accountPurpose_id || null,
    });

    useEffect(() => {
        const loadAccountPurposes = async () => {
            const purposes = await fetchAccountPurposes();
            setAccountPurposes(purposes);
            setLoading(false);
        };

        loadAccountPurposes();
    }, []);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        // Validation checks
        if (!isOver17YearsOld(formData.bornDate)) {
            setErrorMessage("Anda harus berusia lebih dari 17 tahun untuk mendaftar.");
            return;
        }

        if (formData.accountPurposeId === null) {
            setErrorMessage("Anda harus memilih tujuan membuka rekening.");
            setIsAlertVisible(true);
            return;
        }

        setErrorMessage("");
        if (context) {
            context.setFullname(formData.fullname);
            context.setNik(formData.nik);
            context.setBornDate(formData.bornDate);
            context.setAddress(formData.address);
            context.setAccountPurposeId(formData.accountPurposeId);
        }
        setErrorMessage("");
        setIsAlertVisible(false);
        navigate("/register/upload-persyaratan");
    };

    return (
        <div className="flex flex-col items-center justify-center w-[340px] mb-10">
            <h1 className="text-[28px] font-medium">Formulir Data Diri</h1>
            <form className="w-full mt-8 space-y-6" onSubmit={handleSubmit}>
                <FormField id="nama" label="Nama Lengkap" type="text" minLength={5} value={formData.fullname} onChange={(e) => setFormData({ ...formData, fullname: e.target.value.replace(/[^a-zA-Z\s]/g, "") })} />
                <FormField id="nik" label="NIK" type="text" value={formData.nik} minLength={16} onChange={(e) => setFormData({ ...formData, nik: e.target.value.replace(/\D/g, "") })} />
                <div className="space-y-1">
                    <label htmlFor="tanggalLahir" className="block text-xs font-light">
                        Tanggal Lahir
                    </label>
                    <input type="date" id="tanggalLahir" value={formData.bornDate} onChange={(e) => setFormData({ ...formData, bornDate: e.target.value })} className="w-full p-3 border rounded-lg border-[#C4C4C4]" />
                </div>
                <FormField id="alamat" label="Alamat Domisili" type="text" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} />
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
                            value={formData.accountPurposeId !== null ? formData.accountPurposeId : ""}
                            onChange={(e) => setFormData({ ...formData, accountPurposeId: Number(e.target.value) || null })}
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
                    <Link to="/register/tipe-rekening" className="py-3 border-[#055287] rounded-lg text-[#055287] w-1/2 border text-center">
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

export default VerifyBiodataPage;
