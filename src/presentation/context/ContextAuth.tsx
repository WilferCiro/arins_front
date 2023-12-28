/*
	Created by Wilfer Daniel Ciro Maya
*/

import constantStore from "@/data/constantStore";
import { getTokenData } from "@/data/services/token.services";
import { TokenSchema } from "@/domain/schemas/TokenSchema";
import { useState, createContext, ReactElement, useContext } from "react";

interface ContextInterface {
  tokenData: TokenSchema | undefined;
  currentCompany: { _id: string; name: string } | undefined;
  login: (token: string) => void;
  logout: () => void;
}

export const ContextAuth = createContext<ContextInterface>({
  tokenData: undefined,
  currentCompany: undefined,
  login: (token: string) => {},
  logout: () => {},
});

interface IAuthProvider {
  children: ReactElement;
}

const ContextProviderAuth = ({ children }: IAuthProvider) => {
  const [tokenData, setTokenData] = useState<TokenSchema | undefined>(
    getTokenData() || undefined
  );

  const getActiveCompany = (): { _id: string; name: string } | undefined => {
    return getTokenData()?.companies?.filter((company) => company.active)?.[0];
  };

  const [currentCompany, setCurrentCompany] = useState<
    { _id: string; name: string } | undefined
  >(getActiveCompany() || undefined);

  const login = (token: string) => {
    constantStore.token.set(token);
    setTokenData(getTokenData() || undefined);
    setCurrentCompany(getActiveCompany() || undefined);
  };

  const logout = () => {
    constantStore.token.remove();
    setTokenData(undefined);
    setCurrentCompany(undefined);
  };

  return (
    <ContextAuth.Provider
      value={{
        currentCompany,
        tokenData,
        login,
        logout,
      }}
    >
      {children}
    </ContextAuth.Provider>
  );
};
const useAuth = () => useContext(ContextAuth);

export { ContextProviderAuth, useAuth };
