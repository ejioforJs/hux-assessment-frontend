import { createContext, useReducer, ReactNode } from "react";

interface AppState {
    userInfo: UserInfo | null;
  }
  
  interface UserInfo {
    // Define properties of user info here
    name: string;
    email: string,
    _id: string
    // Add more properties as needed
  }

  // Define the initial state
const userInfoValue = localStorage.getItem("userInfo");

const initialState: AppState = {
  userInfo:
    typeof userInfoValue === "string" ? JSON.parse(userInfoValue) : null,
};

// Define the action types
type Action =
  | { type: "USER_SIGNIN"; payload: UserInfo }
  | { type: "USER_SIGNOUT" }

// Define the reducer function
function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case "USER_SIGNIN":
      return { ...state, userInfo: action.payload };
    case "USER_SIGNOUT":
      return { ...state, userInfo: null };
    default:
      return state;
  }
}

// Create the context
export const Store = createContext<{
  state: AppState;
  dispatch: React.Dispatch<Action>;
}>({ state: initialState, dispatch: () => {} });

// Define the context provider component
interface StoreProviderProps {
  children: ReactNode;
}

export function StoreProvider({ children }: StoreProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{children}</Store.Provider>;
}