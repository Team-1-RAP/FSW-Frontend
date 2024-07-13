import * as Yup from "yup";

export const loginValidationSchema = Yup.object({
    username: Yup.string()
        .matches(/^[a-z][a-z0-9]*$/, "Username harus huruf kecil dan hanya berisi huruf dan angka")
        .required("Username wajib diisi!"),
    password: Yup.string()
        .matches(/^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, "Kombinasi password belum sesuai")
        .required("Password harus diisi"),
});
