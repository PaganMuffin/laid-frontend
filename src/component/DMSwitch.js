import { useContext, useState } from 'react'
import { Switch } from '@headlessui/react'
import { ThemeContext } from '../context/dm'
import { Moon, Sun } from './Icons'


export const SwitchMode = () => {

    const theme = useContext(ThemeContext)
    const enabled = theme.state

    const setEnabled = () => {
        enabled ? theme.dispatch({type: 'LIGHT'}) : theme.dispatch({type: 'DARK'})
    }



    return (
        <div className={`flex flex-row space-x-3`}>
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