import { createContext, useState} from "react";
import {
  fetchMutationAmounts,
  IMutationAmount,
} from "../services/mutationService";
import { Outlet } from "react-router-dom";

export interface MutationsContextProps {
  mutationAmounts: IMutationAmount[];
  setMutationAmounts: (mutationAmount: IMutationAmount[]) => void;
  fetchMutationAmounts: (token: string, noAccount: number) => Promise<void>;
}

export const MutationContext = createContext<MutationsContextProps | null>(
  null
);

export const MutationProvider = () => {
  const [mutationAmounts, setMutationAmounts] = useState<IMutationAmount[]>([]);

  const fetchMutationAmountsHandler = async (
    token: string,
    noAccount: number
  ) => {
    try {
      const data = await fetchMutationAmounts(token, noAccount);
      setMutationAmounts(data);
      console.log("Mutation amount fetched:", data);
    } catch (error) {
      console.error("Fetch mutations amount error:", error);
    }
  };

  const contextValue: MutationsContextProps = {
    mutationAmounts,
    setMutationAmounts,
    fetchMutationAmounts: fetchMutationAmountsHandler,
  };

  return (
    <MutationContext.Provider value={contextValue}>
      <Outlet />
    </MutationContext.Provider>
  );
};
