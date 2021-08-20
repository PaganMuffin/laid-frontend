import { useEffect, useState } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import NavBar from "./component/NavBar";
import Home from "./pages/Home";
const title = process.env.REACT_APP_TITLE


const App = (props) => {

    const [isDark, setIsDark] = useState(false)

    let location = useLocation()
    useEffect(() => {
        document.body.classList.add('bg-bg_dark')
        document.body.classList.add('dark:bg-opacity-90')
        document.body.classList.add('bg-opacity-20')
    },[])


    return (
        <div >
            <div style={{
                background:'linear-gradient(-45deg, #FAB85C, #E053A8, #6E87F5, #59DE90, #FFF266)',
                backgroundSize: '500% 500%',
                animation: 'gradient 10s ease-in-out infinite',
                position:'absolute',
                zIndex: '-1',
                //filter: 'invert(70%)'
                filter: isDark ? 'invert(70%)' : 'invert(0%)'
            }}
                className="w-full h-72 shadow-md "
            />
            <div className=" text-white w-full min-h-screen">
                <NavBar title={title} onMode={setIsDark} />
                <div className="flex justify-center items-center m-auto max-w-6xl">
                    <Switch>
                        <Route path="/">
                        <Home location={location} title={title}/>
                        </Route>
                    </Switch>
                </div>
            </div>

        </div>
    );
}

export default App;
