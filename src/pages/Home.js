import { useEffect } from "react"
import { Link } from "react-router-dom"
import CreateLink from "../component/CreateLink"

const Home = ({props,title}) => {

    return (
        <div className="m-auto space-y-40">
            <div>
                <p className="text-center font-semibold mt-20 text-6xl">{title}</p>
                <p className="text-center text-xl">Ukryj się z nami</p>
            </div>
            <CreateLink/>
        </div>
    )
}

export default Home