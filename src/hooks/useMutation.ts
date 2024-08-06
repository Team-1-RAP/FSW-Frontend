import { useContext } from "react";
import {
  MutationContext,
  MutationsContextProps,
} from "../context/MutationContext";

export const useMutation = (): MutationsContextProps => {
  const context = useContext(MutationContext);
  if (!context) {
    throw new Error("useMutation must be used within a MutationProvider");
  }
  return context;
};
