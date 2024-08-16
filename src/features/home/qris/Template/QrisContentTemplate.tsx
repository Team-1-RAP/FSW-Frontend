import QrisLogo from "../../../../assets/images/qris-logo.png";

interface QrisContentTemplateProps {
  children: React.ReactNode;
}

export const QrisContentTemplate = ({ children }: QrisContentTemplateProps) => {
  return (
    <div className="flex flex-col gap-11 items-center w-[389px] pb-10">
      <img src={QrisLogo} alt="qris logo" width={94} height={35} />
      {children}
    </div>
  );
};
