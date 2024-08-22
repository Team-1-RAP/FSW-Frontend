import React from "react";
import { Loader } from "react-feather";

interface LoaderModalProps {
    isLoading: boolean;
}

const LoaderModal: React.FC<LoaderModalProps> = ({ isLoading }) => {
    if (!isLoading) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <Loader className="animate-spin" size={48} color="white" />
        </div>
    );
};

export default LoaderModal;
