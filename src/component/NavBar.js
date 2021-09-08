
import { Menu,Transition } from "@headlessui/react"
import { Fragment, useState } from "react"
import { Link } from "react-router-dom"
import { SwitchMode } from "./DMSwitch"
import { Burger, SignIn } from "./Icons"

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
        'href':`${document.location.protocol}//app.${document.location.host}/login`,

        
    },
]

const Menubar = () => {
    
    return (
        <div className="md:flex flex-row items-center space-x-5 hidden">
            {list.slice(0,3).map(x => {
                return (
                    <Link to={x.href} key={x.name}>
                        <button className="font-semibold dark:hover:bg-white hover:bg-black hover:bg-opacity-20 dark:hover:bg-opacity-20 px-2 py-2 rounded-lg">{x.name}</button>
                    </Link>
                )
            })}
            <SwitchMode />
            
        </div>
    )
}

const MobileMenu = () => {

    return (
        <div className="relative ">
            <Menu 
                as="div"
            >
                <Menu.Button className="text-lg font-bold hover:bg-black hover:bg-opacity-20 px-3 py-2 rounded-lg">
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
            
                    <Menu.Items className="flex flex-col absolute w-48 right-0 top-16 bg-bg_dark bg-opacity-70 py-2 px-2 space-y-2 rounded-lg backdrop-filter backdrop-blur-lg text-white">
                        {list.map(x => {
                            return (
                                <Menu.Item key={x.name}>
                                    {({ active }) => {
                                        if(x.href.includes('http')){
                                            return (
                                                <a
                                                    className={`${active && 'bg-blue-500 rounded-md'}`}
                                                    href={x.href}
                                                    target='_parent'
                                                >
                                                    <button className="text-lg font-bold px-3 py-2 rounded-lg flex flex-row items-center">
                                                        <SignIn/>
                                                        <span>
                                                            Zaloguj się

                                                        </span>
                                                    </button>
                                                </a>
                                            )
                                        } else {
                                            return (
                                                <Link
                                                    className={`${active && 'bg-blue-500 rounded-md'}`}
                                                    to={x.href.includes('http') ? {pathname:x.href} : x.href}
                                                    target='_parent'
                                                >
                                                    {x.comp ? x.comp : 
                                                    <span className="flex font-semibold text-lg px-3">
                                                        
                                                        {x.name} {x.href.includes('login')}
                                                    </span>
                                                    }
                                                </Link>
                                            ) 
                                        }

                                    }
                                    }
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
                    <a href={`${document.location.protocol}//app.${document.location.host}/login`} target="_parent">
                        <button className="text-lg font-bold dark:hover:bg-white hover:bg-black hover:bg-opacity-20 dark:hover:bg-opacity-20 px-3 py-2 rounded-lg flex flex-row items-center">
                            <SignIn/>
                            <span>
                                Zaloguj się

                            </span>
                        </button>
                    </a>
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