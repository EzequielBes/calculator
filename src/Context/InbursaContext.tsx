import { createContext, useContext, useState } from "react";

export interface NameProps {
  
    InbursaResponse: any,
    PagBankResponse: any,
    C6Response: any
 
  

}

interface MathContextProps {
  setInbursaTax: React.Dispatch<React.SetStateAction<any | undefined>>;
  inbursatax?: NameProps
}



const formsendInbursaContext = createContext({} as  MathContextProps);

export function MathInbursa({children}: any) {
  const [inbursatax, setInbursaTax] = useState<NameProps>();
  return <formsendInbursaContext.Provider value={{setInbursaTax,inbursatax}}>{children}</formsendInbursaContext.Provider>
};

export const useInbursaContextHook = () => {
  const context = useContext(formsendInbursaContext)
  return context;
}