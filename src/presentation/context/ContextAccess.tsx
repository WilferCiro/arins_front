/*
	Created by Wilfer Daniel Ciro Maya
*/

import { CompanyAccessSchema } from "@/domain/schemas/CompanySchema";
import { useState, createContext, ReactElement, useContext } from "react";

interface ContextInterface {
  access?: CompanyAccessSchema | null;
  setAccess: (access?: CompanyAccessSchema | null) => void;
}

export const ContextAccess = createContext<ContextInterface>({
  access: null,
  setAccess: () => {},
});

interface IAuthProvider {
  children: ReactElement;
  pAccess?: CompanyAccessSchema | null;
}

const ContextProviderAccess = ({ children, pAccess }: IAuthProvider) => {
  const [access, setAccess] = useState<CompanyAccessSchema | null | undefined>(
    pAccess
  );

  return (
    <ContextAccess.Provider
      value={{
        access,
        setAccess,
      }}
    >
      {children}
    </ContextAccess.Provider>
  );
};
const useAccess = () => useContext(ContextAccess);

export { ContextProviderAccess, useAccess };
