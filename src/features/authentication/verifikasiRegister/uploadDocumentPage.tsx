import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { RegisterContext, RegisterContextProps } from "../../../context/RegisterContext";
import FileUpload from "../../../components/elements/file/FileUpload";
import Alert from "../../../components/fragments/Alert";
import useFileUpload from "../../../hooks/useFileUpload";
import { uploadDocuments } from "../../../services/uploadDocumentService"; // Update the import path accordingly

const UploadDocumentPage: React.FC = () => {
    const navigate = useNavigate();
    const context = useContext(RegisterContext);

    // Always call the hook at the top level
    const { files, handleFileChange, validateFiles, errorMessage, isAlertVisible, setErrorMessage, setIsAlertVisible } = useFileUpload();

    // Check context loading state and return a loading state if necessary
    if (!context) {
        return <div>Loading...</div>;
    }

    const { username, email, accountTypeId, fullname, nik, born_date, address, accountPurpose_id } = context as RegisterContextProps;

    const handleSubmit = async () => {
        if (!validateFiles()) {
            return;
        }

        try {
            const formData = new FormData();
            formData.append("username", username || "");
            formData.append("email", email || "");
            formData.append("fullname", fullname || "");
            formData.append("nik", nik || "");
            formData.append("born_date", born_date || "");
            formData.append("address", address || "");
            formData.append("accountPurpose_id", accountPurpose_id?.toString() || "");
            formData.append("accountTypeId", accountTypeId?.toString() || "");

            Object.entries(files).forEach(([key, file]) => {
                if (file) formData.append(`${key}_document`, file);
            });

            const result = await uploadDocuments(formData);
            console.log(result.message);
            navigate("/register/selesai");
        } catch (error) {
            // Type cast `error` to `Error`
            const err = error as Error;
            setErrorMessage(err.message || "An unexpected error occurred.");
            setIsAlertVisible(true);
        }
    };

    return (
        <div className="flex flex-col gap-5 w-[340px] space-x-4 md:space-x-0">
            <div className="flex justify-center items-center">
                <h1 className="font-medium text-[28px]">Upload Dokumen</h1>
            </div>

            <FileUpload id="ktp-upload" label="KTP" file={files.ktp} onFileChange={(e) => handleFileChange(e, "ktp")} />
            <FileUpload id="photo-upload" label="photo Diri" file={files.photo} onFileChange={(e) => handleFileChange(e, "photo")} />
            <FileUpload id="signature-upload" label="Tanda Tangan" file={files.signature} onFileChange={(e) => handleFileChange(e, "signature")} />

            <ul className="list-disc flex flex-col justify-start items-start text-[#718EBF] text-xs font-light pl-8">
                <li>File yang diupload berbentuk .jpg atau .jpeg</li>
                <li>Maksimal 2 MB</li>
            </ul>

            {isAlertVisible && <Alert message={errorMessage} isVisible={isAlertVisible} />}

            <div className="flex justify-end p-[20px] gap-5 pr-5 md:pr-0">
                <button onClick={() => navigate(-1)} className="bg-white w-[163px] h-[47px] rounded-xl border border-[#0066AE] text-[#0066AE]">
                    Kembali
                </button>
                <button onClick={handleSubmit} className="bg-[#0066AE] w-[163px] h-[47px] rounded-xl border text-white">
                    Kirim
                </button>
            </div>
        </div>
    );
};

export default UploadDocumentPage;
