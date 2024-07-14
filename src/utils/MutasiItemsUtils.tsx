import Dana from "../assets/images/dana.svg";
import SetorTunai from "../assets/images/setor-tunai.svg";

interface MutasiItemsUtils {
   id: string;
   icon: string;
   label: string;
   value: string;
   date: Date;
}

export const mutasiItems: MutasiItemsUtils[] = [
   {
      id: "Mutasi-1",
      icon: Dana,
      label: "Candra",
      value: "-87000",
      date: new Date(),
   },
   {
      id: "Mutasi-1",
      icon: SetorTunai,
      label: "Candra",
      value: "187000",
      date: new Date(),
   },
]