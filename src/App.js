import { useEffect } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import NavBar from "./component/NavBar";
const title = "NomNom"


const App = (props) => {
    let location = useLocation()

    useEffect(() => {
        document.documentElement.classList.add('dark')
    },[])

    return (
        <div className="dark:bg-bg_dark w-full min-h-screen">
            <NavBar 
                title={title} 
                username="PaganMuffin" 
                avatar_url="https://cdn.discordapp.com/avatars/206533377820590082/a0811702ac8bd9923dcada848c6b9a7c.png?size=1024"
            />
            <div className="flex  justify-center pt-16 m-auto max-w-5xl ">
                <Switch>
                    <Route path="/" exact>
                        <Home title={title}/>
                    </Route>
                </Switch>
            </div>
        </div>
    );
}

export default App;
