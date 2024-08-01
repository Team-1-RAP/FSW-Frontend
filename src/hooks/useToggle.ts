import { useState } from "react";

export const useToggle = (initialState: boolean = false) => {
  const [state, setState] = useState(initialState);
  const toggle = () => setState(!state);
  return [state, toggle] as const;
};

export const useMutationToggle = (initialState: boolean = false) => {
  const [state, setState] = useState(initialState);
  const toggle = () => setState((prevState) => !prevState);
  const setTrue = () => setState(true);
  const setFalse = () => setState(false);
  return [state, setTrue, setFalse, toggle] as const;
};
