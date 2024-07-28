import React, { useState } from "react";
import { User, Lock, EyeOff, Eye } from "react-feather";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import { useAuth } from "../../../hooks/useAuth";
import { useToggle } from "../../../hooks/useToggle";
import { loginUser } from "../../../services/authService";
import Alert from "../Alert";

interface LoginFormProps {
    onLoginError: (status: number) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLoginError }) => {
    const navigate = useNavigate();
    const { setToken } = useAuth();
    const [showPassword, toggleShowPassword] = useToggle(false);
    const [errorCount, setErrorCount] = useState(0);
    const [errorMessage, setErrorMessage] = useState("");
    const [isAlertVisible, setIsAlertVisible] = useState(false);
    const [formData, setFormData] = useState({ username: "", password: "" });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const data = await loginUser(formData.username, formData.password);
            setToken(data);
            navigate("/home");
        } catch (error) {
            if (error && typeof error === "object" && "status" in error) {
                const status = (error as { status: number }).status;
                if (status === 400) {
                    setErrorCount((prevCount) => prevCount + 1);
                    if (errorCount === 0) {
                        setErrorMessage("Password yang Anda masukkan salah.");
                    } else if (errorCount === 1) {
                        setErrorMessage("Password yang Anda masukkan salah. Anda memiliki 1x percobaan sebelum diblok oleh sistem.");
                    }
                    setIsAlertVisible(true);
                } else {
                    onLoginError(status);
                    setErrorMessage(`Error: ${status}`);
                    setIsAlertVisible(true);
                }
            } else if (error instanceof Error) {
                setErrorMessage(error.message);
                setIsAlertVisible(true);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-11/12 space-y-3 md:w-1/2">
            <div className="relative">
                <User className="text-[#c4c4c4] absolute left-2 top-3" />
                <label htmlFor="username" className="sr-only">
                    Username
                </label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="your account"
                    className="border rounded-md border-[#c4c4c4] py-[10px] pl-[40px] pr-[10px] w-full focus:outline-[#5375EC]"
                    value={formData.username}
                    onChange={handleChange}
                    aria-label="Username"
                />
            </div>
            <div className="relative">
                <Lock className="text-[#c4c4c4] absolute left-2 top-3" />
                <label htmlFor="password" className="sr-only">
                    Password
                </label>
                <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    placeholder="password"
                    className="border rounded-md border-[#c4c4c4] py-[10px] px-[40px] w-full focus:outline-[#5375EC]"
                    value={formData.password}
                    onChange={handleChange}
                    aria-label="Password"
                />
                <div className="absolute cursor-pointer right-4 top-3" onClick={toggleShowPassword}>
                    {showPassword ? <Eye className="text-[#c4c4c4]" /> : <EyeOff className="text-[#c4c4c4]" />}
                </div>
            </div>
            <Alert message={errorMessage} isVisible={isAlertVisible} />
            <p className="flex justify-end text-[#153193]">
                <span>
                    forgot your <b>password?</b>
                </span>
            </p>
            <div className="border border-[#6C8FEE] w-full"></div>
            <div className="flex justify-center">
                <Button type="submit" className="my-4">
                    Login
                </Button>
            </div>
        </form>
    );
};

export default LoginForm;
