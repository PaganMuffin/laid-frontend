import { useContext, useState } from 'react'
import { Switch } from '@headlessui/react'
import { ThemeContext } from '../functions/dm'

const Sun = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-sun" width="28" height="28" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <circle cx="12" cy="12" r="4" />
        <path d="M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7" />
        </svg>
    )
}

const Moon = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-moon" width="28" height="28" viewBox="0 0 24 24" strokeWidth="1" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z" />
        </svg>
    )
}



export const SwitchMode = () => {

    const theme = useContext(ThemeContext)
    const enabled = theme.state

    const setEnabled = () => {
        enabled ? theme.dispatch({type: 'LIGHT'}) : theme.dispatch({type: 'DARK'})
    }

    return (
        <div className="flex flex-row space-x-3">
            <Sun/>
            <Switch
            checked={enabled}
            onChange={setEnabled}
            className={`${
                enabled ? 'bg-blue-500' : 'bg-gray-400'
            } relative inline-flex items-center h-6 rounded-full w-11  transition ease-in-out duration-200`}
            >
            <span className="sr-only">Enable notifications</span>
            <span
                className={`${
                enabled ? 'translate-x-6' : 'translate-x-1'
                }  inline-block w-4 h-4 transform bg-white rounded-full transition ease-in-out duration-200`}
            />
            </Switch>
            <Moon/>
        </div>
    )
}