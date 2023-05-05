import { Accessor, JSX, createContext, useContext } from "solid-js";

export interface AppState {
  selfUid: number | null;
  csrfToken: string;
}

const StateContext = createContext<Accessor<AppState>>();

interface StateContextProps {
  children: JSX.Element;
  state: AppState;
}

export const StateProvider = (props: StateContextProps) => {
  const state = () => props.state;

  return (
    <StateContext.Provider value={state}>
      {props.children}
    </StateContext.Provider>
  );
};

export const useState = () => {
  const res = useContext(StateContext);

  if (typeof res === "undefined") {
    throw new Error("StateProvider is not found");
  }

  return res;
};
