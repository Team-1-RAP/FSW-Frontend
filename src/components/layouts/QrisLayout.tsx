import { BreadCrumbsHeader } from "../elements/BreadCrumbsHeader";
import { ChevronRight} from "react-feather";
import QrIcon from "../../assets/icons/qris.png";

export const QrisLayout = () => {
  return (
    <BreadCrumbsHeader>
      <ChevronRight className="text-[#235697]" />
      <div className="flex flex-row gap-2">
        <img src={QrIcon} alt="Qr Icon" width={24} height={24} />
        <p className="font-normal text-[#235697] text-sm mt-1">Transfer</p>
      </div>
    </BreadCrumbsHeader>
  );
};
