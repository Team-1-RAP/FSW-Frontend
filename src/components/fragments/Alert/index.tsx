import React from "react";
import { AlertProps } from "./type";

const Alert: React.FC<AlertProps> = ({ message, isVisible }) => {
    if (!isVisible) {
        return null;
    }

    return (
        <div
            id="toast-simple"
            className="flex items-center w-full max-w-[390px] p-4 space-x-4 text-white bg-[#CB3A31] divide-gray-200 rounded-lg shadow dark:text-white dark:bg-[#CB3A31]"
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
            aria-label={message}
        >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                />
            </svg>
            <div className="ps-4 text-sm font-normal">{message}</div>
        </div>
    );
};

export default Alert;
