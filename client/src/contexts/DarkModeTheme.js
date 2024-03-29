import React,{createContext, useState} from 'react';

export const DarkModeContext = createContext();

function DarkModeProvider({children}) {

    const [darkMode,setDarkMode] = useState(false);
    const toggleDarkMode = () =>{
        setDarkMode(!darkMode);
    }

    return(
        <div>
            <DarkModeContext.Provider value = {{darkMode,toggleDarkMode}}>
                {children}
            </DarkModeContext.Provider>
        </div>
    )
}

export default DarkModeProvider;

