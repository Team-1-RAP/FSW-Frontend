import { createBrowserRouter } from "react-router-dom";
import LandingPage from "./features/guests/LandingPage";
import NotFound from "./features/NotFound";
import Profile from "./features/profile/Profile";
import AuthLayout from "./components/layouts/AuthLayout";
import { AuthProvider } from "./context/AuthContext";
import { PengaturanLayout } from "./components/layouts/PengaturanLayout";
import { AuthOtpPassword } from "./features/authentication/resetPassword/AuthOtpPassword";
import { AuthNewPassword } from "./features/authentication/resetPassword/AuthNewPassword";
import { AuthPinVerification } from "./features/authentication/resetPassword/AuthPinVerification";
import { AuthResetPasswordSuccess } from "./features/authentication/resetPassword/AuthResetPasswordSuccess";
import { AuthEmailVerification } from "./features/authentication/resetPassword/AuthEmailVerification";
import { AuthBirthDateValidation } from "./features/authentication/resetPassword/AuthBirthDateValidation";
import { AuthCardValidation } from "./features/authentication/resetPassword/AuthCardValidation";
import { Setting } from "./features/setting/Setting";
import { ResetValidationProvider } from "./context/ResetValidationContext";
import { CardInformation } from "./features/setting/changePin/CardConfirmation";
import { PinBirthDateValidation } from "./features/setting/changePin/PinBirthDateValidation";
import { PinEmailVerification } from "./features/setting/changePin/PinEmaiVerification";
import { PinOtp } from "./features/setting/changePin/PinOtp";
import { NewPin } from "./features/setting/changePin/NewPin";
import { PinChangeSuccess } from "./features/setting/changePin/PinChangeSuccess";
import { PasswordVerification } from "./features/setting/changePassword/PasswordVerification";
import { PasswordEmailVerification } from "./features/setting/changePassword/PasswordEmailVerification";
import { PasswordChangeOtp } from "./features/setting/changePassword/PasswordChangeOtp";
import { NewPassword } from "./features/setting/changePassword/NewPassword";
import PrivateRoute from "./components/fragments/Authentication/PrivateRoute";
import { AccountProvider } from "./context/AccountContext";
import DashboardLayout from "./components/layouts/DashboardLayout";
import HomePage from "./features/home/HomePage";
import { ChangePasswordValidationProvider } from "./context/ChangePasswordValidationContext";
import { MutationProvider } from "./context/MutationContext";
import LoginPage from "./features/authentication/LoginPage";
import MutasiPage from "./features/mutation/MutationPage";
import TransferPage from "./features/home/transfer/TransferPage";
import NewTransferPage from "./features/home/transfer/NewTransferPage";
import NominalTransferPage from "./features/home/transfer/NominalTransferPage";
import ConfirmTransferPage from "./features/home/transfer/ConfirmTransferPage";
import BuktiTransferPage from "./features/home/transfer/BuktiTransferPage";
import { QrisLayout } from "./components/layouts/QrisLayout";
import { QrisTransfer } from "./features/home/qris/QrisTransfer";
import { QrisQrCodeDisplay } from "./features/home/qris/QrisQrCodeDisplay";
import { QrisTransactionSuccess } from "./features/home/qris/QrisTransactionSuccess";
import RegisterPage from "./features/authentication/RegisterPage";
import RegisterLayout from "./components/layouts/RegisterLayout";
import VerifyEmailPage from "./features/authentication/verifikasiRegister/verifyEmailPage";
import TypeRekeningPage from "./features/authentication/verifikasiRegister/typeRekeningPage";
import VerifyBiodataPage from "./features/authentication/verifikasiRegister/verifyBiodataPage";
import UploadDocumentPage from "./features/authentication/verifikasiRegister/uploadDocumentPage";
import FinishPage from "./features/authentication/verifikasiRegister/finishPage";
import NewPinPage from "./features/authentication/verifikasiRegister/newPinPage";
import SuccessPage from "./features/authentication/verifikasiRegister/successPage";
import { RegisterProvider } from "./context/RegisterContext";

const router = createBrowserRouter([
    {
        path: "*",
        element: <NotFound />,
    },
    {
        path: "/",
        element: <LandingPage />,
    },
    {
        element: <RegisterProvider />,
        children: [
            {
                element: <RegisterLayout />,
                path: "/register",
                children: [
                    {
                        path: "",
                        element: <RegisterPage />,
                    },
                    {
                        path: "verifikasi-email",
                        element: <VerifyEmailPage />,
                    },
                    {
                        path: "tipe-rekening",
                        element: <TypeRekeningPage />,
                    },
                    {
                        path: "data-diri",
                        element: <VerifyBiodataPage />,
                    },
                    {
                        path: "upload-persyaratan",
                        element: <UploadDocumentPage />,
                    },
                    {
                        path: "selesai",
                        element: <FinishPage />,
                    },
                    {
                        path: "new-pin",
                        element: <ResetValidationProvider />,
                        children: [
                            {
                                path: "*",
                                element: <NewPinPage />,
                            },
                        ],
                    },
                    {
                        path: "success",
                        element: <SuccessPage />,
                    },
                ],
            },
        ],
    },
    {
        element: <AuthProvider />,
        children: [
            {
                path: "/login",
                element: <AuthLayout />,
                children: [
                    {
                        path: "",
                        element: <LoginPage />,
                    },
                ],
            },
            {
                element: <ResetValidationProvider />,
                children: [
                    {
                        path: "/ubah-password",
                        element: <AuthLayout />,
                        children: [
                            {
                                path: "",
                                element: <AuthCardValidation />,
                            },
                            {
                                path: "birth-date",
                                element: <AuthBirthDateValidation />,
                            },
                            {
                                path: "email",
                                element: <AuthEmailVerification />,
                            },
                            {
                                path: "otp",
                                element: <AuthOtpPassword />,
                            },
                            {
                                path: "new-password",
                                element: <AuthNewPassword />,
                            },
                            {
                                path: "pin-verification",
                                element: <AuthPinVerification />,
                            },
                            {
                                path: "success",
                                element: <AuthResetPasswordSuccess />,
                            },
                        ],
                    },
                ],
            },
            {
                element: <PrivateRoute />,
                children: [
                    {
                        element: <AccountProvider />,
                        children: [
                            {
                                element: <DashboardLayout />,
                                children: [
                                    {
                                        element: <MutationProvider />,
                                        children: [
                                            {
                                                path: "/home",
                                                element: <HomePage />,
                                            },
                                            {
                                                path: "/mutasi",
                                                element: <MutasiPage />,
                                            },
                                            {
                                                path: "/profile",
                                                element: <Profile />,
                                            },
                                        ],
                                    },
                                    {
                                        path: "/transfer",
                                        children: [
                                            {
                                                path: "",
                                                element: <TransferPage />,
                                            },
                                            {
                                                path: "/transfer/new",
                                                element: <NewTransferPage />,
                                            },
                                            {
                                                path: "/transfer/nominal",
                                                element: (
                                                    <NominalTransferPage />
                                                ),
                                            },
                                            {
                                                path: "/transfer/confirm",
                                                element: (
                                                    <ConfirmTransferPage />
                                                ),
                                            },
                                            {
                                                path: "/transfer/success",
                                                element: <BuktiTransferPage />,
                                            },
                                        ],
                                    },
                                    {
                                        path: "/QRIS",
                                        element: <QrisLayout />,
                                        children: [
                                            {
                                                path: "",
                                                element: <QrisTransfer />,
                                            },
                                            {
                                                path: "display",
                                                element: <QrisQrCodeDisplay />,
                                            },
                                            {
                                                path: "success",
                                                element: <QrisTransactionSuccess />,
                                            }
                                        ]
                                    },
                                    {
                                        path: "/pengaturan",
                                        element: <PengaturanLayout />,
                                        children: [
                                            {
                                                path: "",
                                                element: <Setting />,
                                            },
                                            {
                                                path: "change-pin",
                                                element: (
                                                    <ResetValidationProvider />
                                                ),
                                                children: [
                                                    {
                                                        path: "",
                                                        element: (
                                                            <CardInformation />
                                                        ),
                                                    },
                                                    {
                                                        path: "birth-date",
                                                        element: (
                                                            <PinBirthDateValidation />
                                                        ),
                                                    },
                                                    {
                                                        path: "email",
                                                        element: (
                                                            <PinEmailVerification />
                                                        ),
                                                    },
                                                    {
                                                        path: "otp",
                                                        element: <PinOtp />,
                                                    },
                                                    {
                                                        path: "new-pin",
                                                        element: <NewPin />,
                                                    },
                                                    {
                                                        path: "success",
                                                        element: (
                                                            <PinChangeSuccess />
                                                        ),
                                                    },
                                                ],
                                            },
                                            {
                                                path: "change-password",
                                                element: (
                                                    <ChangePasswordValidationProvider />
                                                ),
                                                children: [
                                                    {
                                                        path: "",
                                                        element: (
                                                            <PasswordVerification />
                                                        ),
                                                    },
                                                    {
                                                        path: "email",
                                                        element: (
                                                            <PasswordEmailVerification />
                                                        ),
                                                    },
                                                    {
                                                        path: "otp",
                                                        element: (
                                                            <PasswordChangeOtp />
                                                        ),
                                                    },
                                                    {
                                                        path: "new-password",
                                                        element: (
                                                            <NewPassword />
                                                        ),
                                                    },
                                                ],
                                            },
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
        ],
    },
]);

export default router;
