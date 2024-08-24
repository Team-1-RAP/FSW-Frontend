interface FormResetPasswordPinTemplateProps {
    title: string;
    message?: string;
    email?: string;
    children: React.ReactNode;
    titleIsCenter?: boolean;
}

export const FormResetPasswordPinTemplate = ({ title, message, children, email, titleIsCenter = true }: FormResetPasswordPinTemplateProps) => {
    return (
        <div className="text-center w-[340px] flex flex-col gap-4 h-[400px] mt-20">
            <p className={`font-medium text-2xl ${titleIsCenter ? "text-center" : "text-start"}`}>{title}</p>
            {message && (
                <p className="font-medium text-xs mx-11">
                    <span>{message} </span>
                    <a href={`mailto:${email}`} className="text-blue-500">
                        {email}
                    </a>
                </p>
            )}
            {children}
        </div>
    );
};
