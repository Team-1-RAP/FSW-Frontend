import * as Yup from "yup";

export const loginValidationSchema = Yup.object({
    username: Yup.string().required("Username wajib diisi!"),
    password: Yup.string().required("Password harus diisi"),
});
