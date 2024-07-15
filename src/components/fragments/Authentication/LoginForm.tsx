import React from "react";
import { User, Lock, EyeOff, Eye } from "react-feather";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import Button from "./Button";
import { useAuth } from "../../../context/AuthContext";
import { useToggle } from "../../../hooks/useToggle";
import { loginValidationSchema } from "../../../utils/validationSchema";
import { loginUser } from "../../../services/authService";

const LoginForm: React.FC = () => {
    const navigate = useNavigate();
    const { setToken } = useAuth();
    const [showPassword, toggleShowPassword] = useToggle(false);

    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        validationSchema: loginValidationSchema,
        onSubmit: async (values, { setErrors }) => {
            try {
                const data = await loginUser(values.username, values.password);
                setToken(data);
                navigate("/home");
            } catch (error: unknown) {
                if (error instanceof Error) {
                    setErrors({ username: error.message });
                }
            }
        },
    });

    return (
        <form onSubmit={formik.handleSubmit} className="w-11/12 space-y-3 md:w-1/2">
            <div className="relative">
                <User className="text-[#c4c4c4] absolute left-2 top-3" />
                <input type="text" placeholder="your account" className="border rounded-md border-[#c4c4c4] py-[10px] pl-[40px] pr-[10px] w-full focus:outline-[#5375EC]" {...formik.getFieldProps("username")} aria-label="Username" />
                {formik.touched.username && formik.errors.username ? <div className="text-sm text-red-500">{formik.errors.username}</div> : null}
            </div>
            <div className="relative">
                <Lock className="text-[#c4c4c4] absolute left-2 top-3" />
                <input
                    type={showPassword ? "text" : "password"}
                    placeholder="password"
                    className="border rounded-md border-[#c4c4c4] py-[10px] px-[40px] w-full focus:outline-[#5375EC]"
                    {...formik.getFieldProps("password")}
                    aria-label="Password"
                />
                <div className="absolute cursor-pointer right-4 top-3" onClick={toggleShowPassword}>
                    {showPassword ? <Eye className="text-[#c4c4c4]" /> : <EyeOff className="text-[#c4c4c4]" />}
                </div>
                {formik.touched.password && formik.errors.password ? <div className="text-sm text-red-500">{formik.errors.password}</div> : null}
            </div>
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
