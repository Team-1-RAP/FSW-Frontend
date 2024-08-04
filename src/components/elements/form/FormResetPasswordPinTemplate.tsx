interface FormResetPasswordPinTemplateProps {
  title: string;
  message?: string;
  email?: string;
  children: React.ReactNode;
}

export const FormResetPasswordPinTemplate = ({
  title,
  message,
  children,
  email,
}: FormResetPasswordPinTemplateProps) => {
  return (
    <div className="text-center w-[340px] flex flex-col items-center gap-4 h-[400px]">
      <p className="font-medium text-2xl">{title}</p>
      <p className="font-medium text-xs mx-11">
        <span>{message} </span>
        <a href={`mailto:${email}`} className="text-blue-500">
          {email}
        </a>
      </p>
      {children}
    </div>
  );
};
