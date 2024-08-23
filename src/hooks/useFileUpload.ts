import { useState } from "react";
import { validateFile } from "../utils/fileUtils";

type FileType = "ktp" | "photo" | "signature";

const useFileUpload = () => {
    const [files, setFiles] = useState<{ [key in FileType]: File | null }>({
        ktp: null,
        photo: null,
        signature: null,
    });
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [isAlertVisible, setIsAlertVisible] = useState<boolean>(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: FileType) => {
        const file = e.target.files?.[0];
        if (file && validateFile(file)) {
            setFiles((prevFiles) => ({ ...prevFiles, [type]: file }));
        } else {
            setFiles((prevFiles) => ({ ...prevFiles, [type]: null }));
        }
    };

    const validateFiles = () => {
        if (!files.ktp || !files.photo || !files.signature) {
            setErrorMessage("Semua file harus diunggah");
            setIsAlertVisible(true);
            return false;
        }
        return true;
    };

    return {
        files,
        handleFileChange,
        validateFiles,
        errorMessage,
        isAlertVisible,
        setErrorMessage,
        setIsAlertVisible,
    };
};

export default useFileUpload;
