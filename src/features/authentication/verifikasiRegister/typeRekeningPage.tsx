import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { RegisterContext } from "../../../context/RegisterContext";
import AccountTypeRadio from "../../../components/fragments/AccountType";
import { fetchAccountTypes } from "../../../utils/fetchAccountType";
import { AccountType } from "../../../components/fragments/AccountType/type";
import Alert from "../../../components/fragments/Alert";

const TypeRekeningPage: React.FC = () => {
    const navigate = useNavigate();
    const context = useContext(RegisterContext);
    const [accountTypes, setAccountTypes] = useState<AccountType[]>([]);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [isAlertVisible, setIsAlertVisible] = useState<boolean>(false);

    const { accountTypeId = null, setAccountTypeId = () => {}, username, email, otp } = context || {};

    useEffect(() => {
        const loadAccountTypes = async () => {
            try {
                const types = await fetchAccountTypes();
                setAccountTypes(types);
            } catch (error) {
                console.error("Failed to fetch account types:", error);
            }
        };
        loadAccountTypes();
    }, []);

    if (!context) return <div>Loading...</div>;

    const handleChange = (id: number) => setAccountTypeId(id);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (accountTypeId === null) {
            setErrorMessage("Pilih tipe rekening!");
            setIsAlertVisible(true);
            return;
        }

        // Clear error message if validation passes
        setErrorMessage("");
        setIsAlertVisible(false);

        console.log("User Details:", { username, email, otp, accountTypeId });
        navigate("/register/data-diri");
    };

    return (
        <div className="flex flex-col items-center justify-center w-[340px] mb-20">
            <h1 className="text-[28px] font-medium">Pilih Jenis Rekening</h1>
            <form className="w-full mt-8 space-y-6" onSubmit={handleSubmit}>
                <div className="flex w-full space-y-2">
                    <div className="flex flex-col w-full space-y-6">
                        {accountTypes.map((type) => (
                            <AccountTypeRadio key={type.id} type={type} selectedId={accountTypeId} onChange={handleChange} />
                        ))}
                    </div>
                </div>
                <Alert message={errorMessage} isVisible={isAlertVisible} />
                <div className="flex flex-row justify-center w-full space-x-4 text-base font-bold">
                    <button type="submit" className="py-3 bg-[#055287] rounded-lg text-white w-1/2">
                        Selanjutnya
                    </button>
                </div>
            </form>
        </div>
    );
};

export default TypeRekeningPage;
