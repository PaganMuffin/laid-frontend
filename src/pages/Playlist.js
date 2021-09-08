import { createRef, useEffect, useState,memo } from "react"
import { useHistory, useParams } from "react-router-dom"
import NavBar from "../component/NavBar"



export const Playlist = () => {
    const params = useParams()
    const history = useHistory()
    const [data, setData] = useState(null)
    const [cda_id, setCda_id] = useState(null)
    const [playing_index, setPlaying_index] = useState(0)
    const [dimensions, setDimensions] = useState({ width: 1, height: 2 })

    const player_ref = createRef()

    const Image = memo(function Image({ src }) {
        return <img src={src} className="w-28 rounded-lg" />;
    })

    const get_playlist = async () => {
        const f = await fetch(`${process.env.REACT_APP_API_URL}/playlist/${params.id}`)
        if(f.status === 404) history.push('/404')
        if(f.status === 500) history.push('/500')
        const f_data = await f.json()
        setCda_id(f_data.data.items.sort((a,b) => a.p_order - b.p_order)[0].cda_id)
        setData(f_data.data)
    }

    useEffect(() => {
        const on_res = () => {
            setDimensions({width:0,height:document.getElementById('iframe')?.clientHeight})
        }
        window.addEventListener('resize', on_res)
        on_res()
        get_playlist()
    },[])


    const setPlayingInfo = (cda_id, idx) => {
        setPlaying_index(idx)
        setCda_id(cda_id)
    }

    const PlaylistList = () => {
        return (
            <>
                {data.items.sort((a,b) => a.p_order - b.p_order).map((x, idx) => {
                    return (
                        <div
                            key={x.id}
                            className={`
                                flex items-center
                                w-full
                                py-2 space-x-4
                                px-2
                                overflow-x-hidden
                                ${cda_id === x.cda_id ? 'bg-white bg-opacity-20' : 'hover:bg-opacity-10 hover:bg-white'}
                                cursor-pointer
                            `}
                            onClick={() => setPlayingInfo(x.cda_id, idx)}
                        >
                            <Image src={x.thumb}/>
                            <div className="flex flex-col line-clamp-2">
                                <p className="font-semibold line-clamp-2">{x.title}</p>
                                <p className="line-clamp-1">{x.author}</p>

                            </div>
                        </div>
                    )
                })}
            </>
        )
    }


    return (
        <>
            {!data ? "Loading" : 
            <div className="flex flex-col dark:text-white">
                <NavBar title={process.env.REACT_APP_TITLE}/>
                <div className="flex lg:flex-row flex-col w-full h-full px-2 mt-4">
                    <div className="lg:w-4/6 w-full ">
                        <iframe
                            ref={player_ref}
                            id="iframe"
                            className="w-full"
                            style={{aspectRatio:"16/9"}}
                            src={`${process.env.REACT_APP_API_URL}/player/${cda_id}`}
                            allow="autoplay"
                            frameBorder="0"
                            allowFullScreen
                        />
                    </div>
                    <div 
                        style={{ maxHeight:dimensions.height, minHeight:'300px'}} 
                        className="lg:w-2/6 h-full mt-2 lg:mt-0 overflow-auto lg:ml-2  border-4 border-gray-700 rounded-md"
                    >
                        <p className="h-16 w-full font-semibold text-lg flex items-center text-left bg-black bg-opacity-40 px-2">
                            {data.name} {playing_index+1}/{data.items.length}
                        </p>
                        <div className="h-full">
                            <PlaylistList/>
                        </div>
                    </div>
                </div>
                <div className="lg:w-4/6 lg:pl-2 px-2 h-16 w-full">
                    <p className="font-bold text-2xl">
                        {data.items[playing_index].title} - {data.items[playing_index].author}
                    </p>
                </div>
            </div>
            }
        </>
    )
}