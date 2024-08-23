import React, { useContext, useState } from "react";
import { Upload } from "react-feather";
import { useNavigate } from "react-router-dom";
import { RegisterContext, RegisterContextProps } from "../../../context/RegisterContext"; // Import the correct context type

const UploadDocumentPage: React.FC = () => {
    const navigate = useNavigate();
    const context = useContext(RegisterContext);

    // Ensure context is not null and conforms to the expected interface
    if (!context) {
        return <div>Loading...</div>;
    }

    const { username, email, accountTypeId, fullname, nik, born_date, address, accountPurpose_id } = context as RegisterContextProps; // Cast to RegisterContextProps

    const [ktpFile, setKtpFile] = useState<File | null>(null);
    const [fotoFile, setFotoFile] = useState<File | null>(null);
    const [ttdFile, setTtdFile] = useState<File | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, type: string) => {
        const file = event.target.files?.[0];

        if (file) {
            // Check if the file is a JPEG or JPG
            if (!["image/jpeg"].includes(file.type)) {
                alert("File harus berformat .jpg atau .jpeg");
                event.target.value = ""; // Clear the file input
                return;
            }

            // Check if the file size is below 2 MB
            if (file.size > 2 * 1024 * 1024) {
                alert("File maksimal 2 MB");
                event.target.value = ""; // Clear the file input
                return;
            }

            // Set file based on type
            switch (type) {
                case "ktp":
                    setKtpFile(file);
                    break;
                case "foto":
                    setFotoFile(file);
                    break;
                case "ttd":
                    setTtdFile(file);
                    break;
                default:
                    break;
            }
        } else {
            // Reset file state if no file is selected
            switch (type) {
                case "ktp":
                    setKtpFile(null);
                    break;
                case "foto":
                    setFotoFile(null);
                    break;
                case "ttd":
                    setTtdFile(null);
                    break;
                default:
                    break;
            }
        }
    };

    const handleSubmit = async () => {
        if (!ktpFile || !fotoFile || !ttdFile) {
            alert("Semua file harus diunggah");
            return;
        }

        try {
            const formData = new FormData();

            // Append string fields
            formData.append("username", username || "");
            formData.append("email", email || ""); // Assuming email should be sent but API didn't list it. Adjust as needed.
            formData.append("fullname", fullname || "");
            formData.append("nik", nik || "");
            formData.append("born_date", born_date || "");
            formData.append("address", address || "");
            formData.append("accountPurpose_id", accountPurpose_id?.toString() || "");

            // Append integer fields
            formData.append("accountTypeId", accountTypeId?.toString() || "");

            // Append files as binary
            if (ktpFile) {
                formData.append("ktp_document", ktpFile);
            }
            if (fotoFile) {
                formData.append("photo_document", fotoFile);
            }
            if (ttdFile) {
                formData.append("signature_document", ttdFile);
            }

            // Log the data being sent for debugging
            console.log("FormData Entries:");
            formData.forEach((value, key) => {
                if (value instanceof File) {
                    console.log(`${key}: File - ${value.name}`);
                } else {
                    console.log(`${key}: ${value}`);
                }
            });

            // Submitting the form data
            const response = await fetch("https://simplebank.my.id/v1/registration/customer/profile", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                // Extract and log the error response
                const errorData = await response.json();
                console.error("Error response:", errorData);
                alert(`Error: ${errorData.message || "An unknown error occurred"}`);
                return;
            }

            const result = await response.json();
            console.log(result.message);
            console.log("Submission successful:", result);
            navigate("/register/success"); // Navigate to success page on success
        } catch (error) {
            console.error("Error submitting registration:", error);
        }
    };

    return (
        <div className="flex flex-col gap-5 w-[340px] space-x-4 md:space-x-0">
            <div className="flex justify-center items-center">
                <h1 className="font-medium text-[28px]">Upload Dokumen</h1>
            </div>

            {/* KTP Upload */}
            <div className="flex flex-col justify-start items-start gap-1">
                <p className="font-light text-md">KTP</p>
                <div className="relative">
                    <Upload width={32} height={32} className="text-[#c4c4c4] absolute left-2 top-3" />
                    <input type="file" id="ktp-upload" className="hidden" accept=".jpg,.jpeg" onChange={(e) => handleFileChange(e, "ktp")} />
                    <label htmlFor="ktp-upload" className="bg-white border border-[#C4C4C4] text-[#C4C4C4] text-base rounded-lg block w-[300px] md:w-[390px] p-2.5 py-[15px] pl-[50px] pr-[10px] font-normal cursor-pointer">
                        <span>{ktpFile ? ktpFile.name : "Unggah KTP ke sini"}</span>
                    </label>
                </div>
            </div>

            {/* Foto Diri Upload */}
            <div className="flex flex-col justify-start items-start gap-1">
                <p className="font-light text-md">Foto Diri</p>
                <div className="relative">
                    <Upload width={32} height={32} className="text-[#c4c4c4] absolute left-2 top-3" />
                    <input type="file" id="foto-upload" className="hidden" accept=".jpg,.jpeg" onChange={(e) => handleFileChange(e, "foto")} />
                    <label htmlFor="foto-upload" className="bg-white border border-[#C4C4C4] text-[#C4C4C4] text-base rounded-lg block w-[300px] md:w-[390px] p-2.5 py-[15px] pl-[50px] pr-[10px] font-normal cursor-pointer">
                        <span>{fotoFile ? fotoFile.name : "Unggah foto diri ke sini"}</span>
                    </label>
                </div>
            </div>

            {/* Tanda Tangan Upload */}
            <div className="flex flex-col justify-start items-start gap-1">
                <p className="font-light text-md">Tanda Tangan</p>
                <div className="relative">
                    <Upload width={32} height={32} className="text-[#c4c4c4] absolute left-2 top-3" />
                    <input type="file" id="ttd-upload" className="hidden" accept=".jpg,.jpeg" onChange={(e) => handleFileChange(e, "ttd")} />
                    <label htmlFor="ttd-upload" className="bg-white border border-[#C4C4C4] text-[#C4C4C4] text-base rounded-lg block w-[300px] md:w-[390px] p-2.5 py-[15px] pl-[50px] pr-[10px] font-normal cursor-pointer">
                        <span>{ttdFile ? ttdFile.name : "Unggah tanda tangan ke sini"}</span>
                    </label>
                </div>
            </div>

            <ul className="list-disc flex flex-col justify-start items-start text-[#718EBF] text-xs font-light pl-8">
                <li>File yang diupload berbentuk .jpg atau .jpeg</li>
                <li>Maksimal 2 MB</li>
            </ul>

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
