import * as Yup from 'yup';

export const OtpSchema = Yup.object({
    otp: Yup.string().required('OTP is required').matches(/^[0-9]+$/, 'OTP must be a number').min(6, 'OTP must be 6 digits').max(6, 'OTP must be 6 digits')
})

export type IOtpForm = Yup.InferType<typeof OtpSchema>

export const ResetPinSchema = Yup.object({
    pin: Yup.string().required('PIN is required').matches(/^[0-9]+$/, 'PIN must be a number').min(6, 'PIN must be 6 digits').max(6, 'PIN must be 6 digits'),
    confirmPin: Yup.string().required('Confirm PIN is required').oneOf([Yup.ref('pin')], 'PIN must match')
})

export type IResetPinForm = Yup.InferType<typeof ResetPinSchema>