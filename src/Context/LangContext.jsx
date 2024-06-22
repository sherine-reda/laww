import i18next from "i18next";
import React, { createContext, useState } from "react";
// import { resources } from "../../language/Lang";
import {resources} from "../language/Lang";

export const langContext = createContext();

export default function LangContextProvider(props) {
    const [Lang, setLang] = useState("Ar")
    i18next.init({
        resources,
        lng: Lang == "Ar"?"ar":"en",
      });
    
    return <>
    
        <langContext.Provider value={{ Lang , setLang ,i18next}}>
                {props.children}
        </langContext.Provider>
    </>
}