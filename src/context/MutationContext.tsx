import { createContext, useState } from "react";
import {
  IMutation,
  IMutationResponse,
  IMutationAmount,
  fetchMutations,
  fetchMutationAmounts,
  fetchSeparateMutations,
} from "../services/mutationService";
import { Outlet } from "react-router-dom";

export interface MutationsContextProps {
  mutations: IMutation[];
  setMutations: (mutations: IMutation[]) => void;
  fetchMutations: (
    token: string,
    noAccount: string,
    month: number,
    page: number,
    size?: number,
    type?: string
  ) => Promise<IMutationResponse>;
  mutationAmounts: IMutationAmount[];
  setMutationAmounts: (mutationAmount: IMutationAmount[]) => void;
  fetchMutationAmounts: (token: string, noAccount: string) => Promise<void>;
  separateMutations: IMutation[];
  setSeparateMutations: (mutations: IMutation[]) => void;
  fetchSeparateMutations: (
    token: string,
    noAccount: string,
    month: number,
    size: number
  ) => Promise<void>;
}

export const MutationContext = createContext<MutationsContextProps | null>(
  null
);

export const MutationProvider = () => {
  const [mutations, setMutations] = useState<IMutation[]>([]);
  const [mutationAmounts, setMutationAmounts] = useState<IMutationAmount[]>([]);
  const [separateMutations, setSeparateMutations] = useState<IMutation[]>([]);

  const fetchMutationsHandler = async (
    token: string,
    noAccount: string,
    month: number,
    page: number,
    size?: number,
    type?: string
  ) => {
    try {
      const data: IMutationResponse = await fetchMutations(
        token,
        noAccount,
        month,
        page,
        size,
        type
      );
      setMutations(data.pagingData);
      console.log("Mutations fetched:", data.pagingData);
      return data;
    } catch (error) {
      console.error("Fetch mutations error:", error);
      throw error;
    }
  };

  const fetchSeparateMutationsHandler = async (
    token: string,
    noAccount: string,
    month: number,
    size: number
  ) => {
    try {
      const data = await fetchSeparateMutations(token, noAccount, month, size);
      setSeparateMutations(data);
      console.log("Separate mutations fetched:", data);
    } catch (error) {
      console.error("Fetch separate mutations error:", error);
    }
  };

  const fetchMutationAmountsHandler = async (
    token: string,
    noAccount: string
  ) => {
    try {
      const data = await fetchMutationAmounts(token, noAccount);
      setMutationAmounts([data]);
      console.log("Mutation amount fetched:", data, noAccount);
    } catch (error) {
      console.error("Fetch mutations amount error:", error);
    }
  };

  const contextValue: MutationsContextProps = {
    mutations,
    setMutations,
    fetchMutations: fetchMutationsHandler,
    mutationAmounts,
    setMutationAmounts,
    fetchMutationAmounts: fetchMutationAmountsHandler,
    separateMutations,
    setSeparateMutations,
    fetchSeparateMutations: fetchSeparateMutationsHandler,
  };

  return (
    <MutationContext.Provider value={contextValue}>
      <Outlet />
    </MutationContext.Provider>
  );
};
