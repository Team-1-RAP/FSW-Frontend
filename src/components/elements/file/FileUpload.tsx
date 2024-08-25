import React from "react";
import { Upload } from "react-feather";

interface FileUploadProps {
    id: string;
    label: string;
    file: File | null;
    onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ id, label, file, onFileChange }) => (
    <div className="flex flex-col justify-start items-start gap-1">
        <p className="font-light text-md">{label}</p>
        <div className="relative">
            <Upload width={32} height={32} className="text-[#c4c4c4] absolute left-2 top-3" />
            <input type="file" id={id} className="hidden" accept=".jpg,.jpeg" onChange={onFileChange} required />
            <label htmlFor={id} className="bg-white border border-[#C4C4C4] text-[#C4C4C4] text-base rounded-lg block w-[300px] md:w-[390px] p-2.5 py-[15px] pl-[50px] pr-[10px] font-normal cursor-pointer">
                <span>{file ? file.name : `Unggah ${label.toLowerCase()} ke sini`}</span>
            </label>
        </div>
    </div>
);

export default FileUpload;
