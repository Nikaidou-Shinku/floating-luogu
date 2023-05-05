import { Accessor, JSX, children, createContext, useContext } from "solid-js";

interface AppState {
  selfUid: number | null;
  csrfToken: string;
}

const StateContext = createContext<Accessor<AppState>>();

interface StateContextProps {
  children: JSX.Element;
  state: AppState;
}

export const StateProvider = (props: StateContextProps) => {
  const c = children(() => props.children);

  const state = () => props.state;

  return (
    <StateContext.Provider value={state}>
      {c()}
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
