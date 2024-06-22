import React, { createContext, useState } from "react";


export const userContext = createContext();

export default function UserContextProvider(props) {
    const [Token, setUserToken] = useState(null);
    const [name, setUserName] = useState(null);
   
    
    return <>
    
        <userContext.Provider value={{Token , setUserToken ,name,setUserName }}>
                {props.children}
        </userContext.Provider>
    </>
}