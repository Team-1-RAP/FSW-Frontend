import * as yup from 'yup';

export const QrisTransferSchema = yup.object({
    sourceAccountNumber: yup.string().required('Source account number is required'),
    nominal: yup.string().required('Nominal is required').matches(/^[0-9]+$/, "Nominal must be a number"),
    pin: yup.string().required('PIN is required').matches(/^[0-9]+$/, "PIN must be a number").min(6, "PIN must be 6 digits").max(6, "PIN must be 6 digits"),
})

export type IQrisTransferForm = yup.InferType<typeof QrisTransferSchema>;