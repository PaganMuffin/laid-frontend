import CreateLink from "../component/CreateLink"

const Home = ({title}) => {

    return (
        <div className="flex flex-col justify-center items-center w-screen m-auto space-y-24">
            <div>
                <p className="text-center font-semibold mt-20 text-6xl">{title}</p>
                <p className="text-center text-xl">Odtwarzaj z nami!</p>
            </div>
            <CreateLink/>
        </div>
    )
}

export default Home