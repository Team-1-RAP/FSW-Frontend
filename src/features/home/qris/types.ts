import * as yup from "yup";

export const QrisTransferSchema = yup.object({
    sourceAccountNumber: yup.string().required("Rekening sumber harus dipilih!"),

    nominal: yup.number().typeError("Nominal harus berupa angka").required("Nominal wajib diisi!").min(10000, "Minimal nominal adalah 10.000").integer("Nominal harus berupa bilangan bulat"),

    pin: yup
        .string()
        .required("PIN wajib diisi!")
        .matches(/^\d{6}$/, "PIN harus berupa 6 digit angka"),
});

export type IQrisTransferForm = yup.InferType<typeof QrisTransferSchema>;
