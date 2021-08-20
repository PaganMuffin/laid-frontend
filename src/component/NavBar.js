import { useState } from "react"
import { Link } from "react-router-dom"
import { SwitchMode } from "./DMSwitch"

const Menu = ({title, onMode}) => {

    const [isDark, setIsDark] = useState(true)

    const change_mode = () => {
        isDark ? document.documentElement.classList.remove('dark') : document.documentElement.classList.add('dark')
        isDark ? setIsDark(false) :setIsDark(true)
        isDark ? onMode(false) :onMode(true)
    }


    return (
        <div className="md:flex flex-row items-center space-x-5 hidden">
            <Link to='/'>
                <button className="font-semibold hover:bg-black hover:bg-opacity-10 px-3 py-2 rounded-lg">Strona Główna</button>
            </Link>
            <Link to="/api">
                <button className="font-semibold hover:bg-black hover:bg-opacity-10 px-3 py-2 rounded-lg">API</button>

            </Link>
            <button className="font-semibold hover:bg-black hover:bg-opacity-10 px-3 py-2 rounded-lg">FAQ</button>
            <button className="font-semibold hover:bg-black hover:bg-opacity-10 px-3 py-2 rounded-lg">O {title}</button>
            <SwitchMode enabled={isDark} setEnabled={change_mode}/>
            
        </div>
    )
}


const NavBar = ({title, onMode}) => {
    return (
        <nav className="h-16 flex justify-center w-full shadow-md bg-black bg-opacity-5 ">
            <div className="flex items-center justify-between w-full max-w-6xl px-10 ">
                <div className="w-full flex items-center justify-between">
                    <p className="text-xl font-bold px-3 py-2">{title}</p>
                    <Menu title={title} onMode={onMode}></Menu>
                    <button className="text-lg font-bold hover:bg-black hover:bg-opacity-10 px-3 py-2 rounded-lg">Zaloguj się</button>
                </div>
            </div>
        </nav>
    )
}

export default NavBar