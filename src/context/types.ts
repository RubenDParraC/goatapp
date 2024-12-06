import type { ReactNode } from "react";

export interface AuthContextType {
  userToken: string | null;
  isLoadingLogged: boolean;
  login: ({ email, password }: LoginContextProps) => Promise<void>;
  logout: () => void;
}

export interface AuthProviderProps {
  children: ReactNode;
}

export type LoginContextProps = {
  email: string;
  password: string;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setIsError: React.Dispatch<React.SetStateAction<string>>;
};
