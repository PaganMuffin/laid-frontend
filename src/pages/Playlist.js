import { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"



export const Playlist = () => {
    const params = useParams()
    const history = useHistory()
    const [data, setData] = useState(null)
    const [cda_id, setCda_id] = useState(null)
    const [playing_index, setPlaying_index] = useState(0)
    const get_playlist = async () => {
        const f = await fetch(`${process.env.REACT_APP_API_URL}/playlist/${params.id}`)
        if(f.status === 404) history.push('/404')
        if(f.status === 500) history.push('/500')
        const f_data = await f.json()
        console.log(f_data)
        setCda_id(f_data.data.items.sort((a,b) => a.order - b.order)[0].cda_id)
        console.log(f_data.data.items.sort((a,b) => a.order - b.order)[0].cda_id)
        setData(f_data.data)
    }

    useEffect(() => {
        get_playlist()
    },[])

    const setPlayingInfo = (cda_id, idx) => {
        setPlaying_index(idx)
        setCda_id(cda_id)
    }


    return (
        <>
            {!data ? "Loading" : 
            <div className="flex  flex-col text-white">
                <div className="flex lg:flex-row flex-col">
                    <div id="player" className="
                        lg:w-4/6 w-full
                        lg:h-screen h-full
                        flex flex-col items-center 
                        px-2
                    ">
                        <p className="h-16 w-full font-bold text-2xl flex items-center text-left">
                            {data.name}
                        </p>
                        <iframe
                            className="w-full"
                            style={{aspectRatio:"16/9"}}
                            src={`${process.env.REACT_APP_API_URL}/player/${cda_id}`}
                            allow="autoplay"
                            frameBorder="0"
                            allowFullScreen
                        />
                        <p className="h-16 w-full font-bold text-2xl flex items-center text-left">
                            {data.items[playing_index].title}
                        </p>
                    </div>
                    <div id="list" className="lg:w-2/6 w-full lg:h-screen h-full border-l-2 border-gray-700">
                        <p className="h-16 w-full px-2 font-regular text-lg flex items-center text-left">
                            {data.name} {playing_index+1}/{data.items.length}
                        </p>
                        {data.items.sort((a,b) => a.order - b.order).map((x, idx) => {
                            return (
                                <div
                                    key={x.id}
                                    className={`
                                        flex items-center 
                                        py-2 space-x-4
                                        px-2
                                        ${cda_id === x.cda_id ? 'bg-white bg-opacity-20' : 'hover:bg-opacity-10 hover:bg-white'}
                                        
                                    `}
                                    onClick={() => setPlayingInfo(x.cda_id, idx)}
                                >
                                    <img className="w-36 rounded-lg" src={x.thumb}></img>
                                    <p className="font-semibold">{x.title}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>}
        </>
    )
}