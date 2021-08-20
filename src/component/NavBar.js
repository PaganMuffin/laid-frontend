import { useState } from "react"

const Menu = ({title, onMode}) => {

    const [isDark, setIsDark] = useState(false)

    const change_mode = () => {
        isDark ? document.documentElement.classList.remove('dark') : document.documentElement.classList.add('dark')
        isDark ? setIsDark(false) :setIsDark(true)
        isDark ? onMode(false) :onMode(true)
    }

    return (
        <div className="space-x-5 hidden md:block">
            <button className="font-semibold hover:bg-black hover:bg-opacity-10 px-3 py-2 rounded-lg">Strona Główna</button>
            <button className="font-semibold hover:bg-black hover:bg-opacity-10 px-3 py-2 rounded-lg">API</button>
            <button className="font-semibold hover:bg-black hover:bg-opacity-10 px-3 py-2 rounded-lg">FAQ</button>
            <button className="font-semibold hover:bg-black hover:bg-opacity-10 px-3 py-2 rounded-lg">O {title}</button>
            <button onClick={change_mode} className="font-semibold hover:bg-black hover:bg-opacity-10 px-3 py-2 rounded-lg">Dark Mode</button>
            
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