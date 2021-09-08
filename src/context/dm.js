import { createContext, useReducer } from "react";

export const ThemeContext  = createContext()

const initialState  = true

const themeReducer = (state, action) => {
    switch(action.type){
        case 'LIGHT':
            document.documentElement.classList.remove('dark')
            return false;
        case 'DARK':
            document.documentElement.classList.add('dark')
            return true
        default:
            return state
    }
}

export const ThemeProvider = (props) => {
    const [state, dispatch] = useReducer(themeReducer, initialState);

    return <ThemeContext.Provider value={{ state, dispatch }}>{props.children}</ThemeContext.Provider>;
}