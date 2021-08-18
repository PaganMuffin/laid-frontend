import { useEffect } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import NavBar from "./component/NavBar";
import Home from "./pages/Home";
const title = "Laid"


const App = (props) => {
    let location = useLocation()
    let eff = 
    useEffect(() => {
        //document.documentElement.classList.add('dark')
        document.body.classList.add('bg-bg_dark')
        document.body.classList.add('bg-opacity-10')
    },[])

    return (
        <div className="dark:bg-bg_dark text-white w-full min-h-screen">
            <div style={{
                background:'linear-gradient(-45deg, #FAB85C, #E053A8, #6E87F5, #59DE90, #FFF266)',
                backgroundSize: '500% 500%',
                animation: 'gradient 10s ease-in-out infinite',
                position:'absolute',
                zIndex: '-1'
            }}
            className="w-full h-72 shadow-md "
            />
            <NavBar title={title}/>
            <div className="flex justify-center items-center m-auto max-w-6xl">
                <Switch>
                    <Route path="/">
                       <Home location={location} title={title}/>
                    </Route>
                </Switch>
            </div>
        </div>
    );
}

export default App;
