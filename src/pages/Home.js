import { useEffect } from "react"
import { Link } from "react-router-dom"
import Cover from "../component/Cover"


const Grid = ({arr}) => {
    return (
        <div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-8"
        >
            {arr.map((x) => { 
            return (
                <Link 
                    to={`/`}
                    title={"Slime Taoshite 300-nen, Shiranai Uchi ni Level Max ni Nattemashita"}
                >
                    <Cover title="Slime Taoshite 300-nen, Shiranai Uchi ni Level Max ni Nattemashita" image="https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx112608-SQPTANkQxAh1.png"/>
                </Link>
            )
            })}
        </div>
    )
}

const Home = ({props,title}) => {

    return (
        <div className="dark:text-white flex flex-col">
            <div className="flex flex-col items-center my-4">
                <p className="text-6xl font-semibold">{title}</p>
                <p className="text-base font-thin">The Best Subs on World</p>
            </div>
            <p className="text-left text-2xl w-full py-2">New Episodes</p>
            <Grid arr={[...Array(6).keys()]} />
        </div>
    )
}

export default Home