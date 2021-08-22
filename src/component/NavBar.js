
import { Menu,Transition } from "@headlessui/react"
import { Fragment, useState } from "react"
import { Link } from "react-router-dom"
import { SwitchMode } from "./DMSwitch"


const list = [
    {
        'name':'API',
        'href':'/api',
        //'Comp': () => <div className="p-5 bg-red">"TEST"</div>
    },
    {
        'name':'FAQ',
        'href':'/faq',
        //'Comp': () => <Question/>
    },
    {
        'name':'O ' + process.env.REACT_APP_TITLE,
        'href':'/about',
        //'Comp': () => <div className="p-5 bg-red">"TEST"</div>
    },
    {
        'name':'Zaloguj się',
        'href':'/login',
        //'Comp': () => <div className="p-5 bg-red">"TEST"</div>
    },
]

const Menubar = () => {
    
    return (
        <div className="md:flex flex-row items-center space-x-5 hidden">
            {list.slice(0,3).map(x => {
                return (
                    <Link to={x.href} key={x.name}>
                        <button className="font-semibold hover:bg-black hover:bg-opacity-20 px-2 py-2 rounded-lg">{x.name}</button>
                    </Link>
                )
            })}
            <SwitchMode />
            
        </div>
    )
}

const MobileMenu = () => {
    
    const Burger = () => {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-menu-2" width="28" height="28" viewBox="0 0 24 24" strokeWidth="3" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <line x1="4" y1="6" x2="20" y2="6" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="18" x2="20" y2="18" />
            </svg>
        )
    }

    return (
        <div className="relative">
            <Menu 
                as="div"
            >
                <Menu.Button className="text-lg font-bold hover:bg-black hover:bg-opacity-20 px-3  py-2 rounded-lg">
                    <Burger/>
                </Menu.Button>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
            
                    <Menu.Items className="flex flex-col absolute w-48 right-0 top-16 bg-bg_dark bg-opacity-70 py-2 px-2 space-y-2 rounded-lg backdrop-filter backdrop-blur-lg ">
                        {list.map(x => {
                            return (
                                <Menu.Item key={x.name}>
                                    {({ active }) => (
                                    <a
                                        className={`${active && 'bg-blue-500 rounded-md'}`}
                                        href={x.href}
                                    >
                                        <span className="flex font-semibold text-lg px-3">
                                            
                                            {x.name}
                                        </span>
                                    </a>
                                    )}
                                </Menu.Item>
                            )
                        })}
                            <Menu.Item disabled> 
                                <div className="px-2">
                                    <SwitchMode/>

                                </div>
                            </Menu.Item>
                    </Menu.Items>
                </Transition>
            </Menu>

        </div>
    )
}

const NavBar = ({title}) => {

    return (
        <nav className="h-16 flex justify-center w-full shadow-md bg-black bg-opacity-5 ">
            <div className="flex items-center justify-between w-full max-w-6xl px-10 ">
                <div className="w-full hidden items-center justify-between md:flex">
                    <Link to="/">
                        <p className="text-xl font-bold px-3 py-2">{title}</p>
                    </Link>
                    <Menubar></Menubar>
                    <Link to="login">
                        <button className="text-lg font-bold hover:bg-black hover:bg-opacity-20 px-3 py-2 rounded-lg flex flex-row items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-login" width="28" height="28" viewBox="0 0 24 24" strokeWidth="1" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
                                <path d="M20 12h-13l3 -3m0 6l-3 -3" />
                            </svg>
                            <span>
                                Zaloguj się

                            </span>
                        </button>
                    
                    </Link>
                </div>
                <div className="w-full md:hidden items-center justify-between flex">
                    <Link to="/">
                        <p className="text-xl font-bold px-3 py-2">{title}</p>
                    
                    </Link>
                    <MobileMenu/>
                </div>
            </div>
        </nav>
    )
}

export default NavBar