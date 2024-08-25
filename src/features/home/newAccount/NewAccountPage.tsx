import React, { useContext, useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import AccountTypeRadio from "../../../components/fragments/AccountType";
import { fetchAccountTypes, AccountType } from "../../../utils/fetchAccountType";
import Alert from "../../../components/fragments/Alert";
import { AccountContext } from "../../../context/AccountContext";

const NewAccountPage: React.FC = () => {
    const navigate = useNavigate();
    const { setAccountDetails } = useContext(AccountContext)!;
    const [accountTypes, setAccountTypes] = useState<AccountType[]>([]);
    const [selectedAccountTypeId, setSelectedAccountTypeId] = useState<number | null>(null);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [isAlertVisible, setIsAlertVisible] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true); // Added loading state

    // Function to load account types with caching to avoid redundant requests
    const loadAccountTypes = useCallback(async () => {
        try {
            setLoading(true); // Start loading
            const types = await fetchAccountTypes();
            setAccountTypes(types);
        } catch (error) {
            console.error("Failed to fetch account types:", error);
            setErrorMessage("Gagal memuat jenis rekening.");
            setIsAlertVisible(true);
        } finally {
            setLoading(false); // End loading
        }
    }, []);

    useEffect(() => {
        loadAccountTypes(); // Load account types on component mount
    }, [loadAccountTypes]);

    // Handle the change event for radio buttons
    const handleChange = (id: number) => setSelectedAccountTypeId(id);

    // Handle the form submission
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (selectedAccountTypeId === null) {
            setErrorMessage("Pilih jenis rekening!");
            setIsAlertVisible(true);
            return;
        }

        setErrorMessage("");
        setIsAlertVisible(false);

        setAccountDetails({
            accountTypeId: selectedAccountTypeId,
            address: "",
            accountPurposeId: 0,
        });

        // Redirect to the next step
        navigate("/new-account/biodata");
    };

    return (
        <div className="flex flex-col items-center justify-center w-[340px] mb-20">
            <h1 className="text-[28px] font-medium">Pilih Jenis Rekening</h1>
            <form className="w-full mt-8 space-y-6" onSubmit={handleSubmit}>
                {loading ? ( // Show a loading indicator while fetching data
                    <p>Loading...</p>
                ) : (
                    <>
                        <div className="flex w-full space-y-2">
                            <div className="flex flex-col w-full space-y-6">
                                {accountTypes.map((type) => (
                                    <AccountTypeRadio key={type.id} type={type} selectedId={selectedAccountTypeId} onChange={handleChange} />
                                ))}
                            </div>
                        </div>
                        <Alert message={errorMessage} isVisible={isAlertVisible} />
                    </>
                )}
                <div className="flex flex-row justify-center w-full space-x-4 text-base font-bold">
                    <button type="submit" className="py-3 bg-[#055287] rounded-lg text-white w-1/2">
                        Selanjutnya
                    </button>
                </div>
            </form>
        </div>
    );
};

export default NewAccountPage;
