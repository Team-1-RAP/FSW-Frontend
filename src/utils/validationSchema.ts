import * as Yup from "yup";

export const loginValidationSchema = Yup.object({
    username: Yup.string().required("Username wajib diisi!"),
    password: Yup.string().required("Password harus diisi"),
});

export const ResetPinSchema = Yup.object({
    pin: Yup.string()
        .required("PIN wajib diisi!")
        .matches(/^[0-9]+$/, "PIN must be a number")
        .min(6, "PIN must be 6 digits")
        .max(6, "PIN must be 6 digits"),
    confirmPin: Yup.string()
        .required("Confirm PIN wajib diisi!")
        .oneOf([Yup.ref("pin")], "PIN harus sama!"),
});

export type IResetPinForm = Yup.InferType<typeof ResetPinSchema>;
