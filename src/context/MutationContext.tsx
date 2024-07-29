import { createContext, useState, ReactNode } from "react";

export interface IMutationAmount {
  income: number;
  spending: number;
}

export interface MutationsContextProps {
  mutationAmounts: IMutationAmount[];
  setMutationAmounts: (mutationAmount: IMutationAmount[]) => void;
  fetchMutationAmounts: (token: string, noAccount: string) => Promise<void>;
}

export const MutationContext = createContext<MutationsContextProps | null>(
  null
);

export const MutationProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [mutationAmounts, setMutationAmounts] = useState<IMutationAmount[]>([]);

  const fetchMutationAmounts = async (token: string, noAccount: string) => {
    try {
      const response = await fetch(
        `https://simplebank-stg.koyeb.app/api/v1/mutations/${noAccount}/amounts`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch mutation amount");
      }

      const data = await response.json();

      if (data.status) {
        setMutationAmounts(data.data);
        console.log("Mutation amount fetched:", data.data);
      } else {
        throw new Error(data.message || "Failed to fetch mutation amount");
      }
    } catch (error) {
      console.error("Fetch mutations amount error:", error);
    }
  };

  const contextValue: MutationsContextProps = {
    mutationAmounts,
    setMutationAmounts,
    fetchMutationAmounts,
  };

  return (
    <MutationContext.Provider value={contextValue}>
      {children}
    </MutationContext.Provider>
  );
};
