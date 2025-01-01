import { createContext, ReactNode, useState } from "react";

export const Context = createContext({});
export const ContextProvider = ({children}:{children:ReactNode})=>{
    const [data, setData] = useState({});

    return(
        <Context.Provider value={{data,setData}}>
            {children}
        </Context.Provider>
    )
}