import { createRef, useEffect, useState,memo, useRef } from "react"
import { useHistory, useParams } from "react-router-dom"
import NavBar from "../component/NavBar"
import { Player } from "../component/Player"
import { PlaylistList } from "../component/PlaylistList"



export const Playlist = () => {
    const params = useParams()
    const history = useHistory()



    const [cda_id, setCda_id] = useState(null)
    const [playing_index, setPlaying_index] = useState(0)
    const [playlist, setPlaylist] = useState(null)
    const [height, setHeight] = useState({height: 2})
    const [source, setSource] = useState(null)
    const [playing_info, setPlaying_info] = useState({
        title:'',
        author:''
    })

    const [playlist_title, setPlaylist_title] = useState('')

    const ended_func = () => {
        if(playlist != null){
            let idx = playing_index
            if(idx !== playlist.length - 1){
                setPlaying_index(idx+1)
                setPlayingInfo(playlist[idx+1].cda_id, idx+1)
            }
        }
    }

    const get_playlist = async () => {
        const f = await fetch(`${process.env.REACT_APP_API_URL}/playlist/${params.id}`)
        if(f.status === 404) history.push('/404')
        if(f.status === 500) history.push('/500')
        const f_data = await f.json()
        setPlaylist(f_data.data.items)

        const first_video_id = f_data.data.items[0].cda_id

        setCda_id(first_video_id)
        get_video_info(first_video_id)
        setPlaylist_title(f_data.data.name)

    }



    useEffect(() => {
        get_playlist()

    },[])
 


    const setPlayingInfo = (cda_id, idx) => {
        get_video_info(cda_id, idx)
    }

    const get_video_info = async (cda_id, idx = 0) => {
        if(!cda_id) return null
        const f = await fetch(`${process.env.REACT_APP_API_URL}/json/${cda_id}`)
        const f_data = await f.json()
        if(f.status === 404) history.push('/404')
        if(f.status === 500) history.push('/500')

        setSource({
            download:f_data.data.qualities[0].url,
            ratio:'16:9',
            autoplay: true,
            type: 'video',
            title: f_data.data.title,
            sources: f_data.data.qualities.map((x) => {return {'src':x['url'],'type':'video/mp4','size':x['resolution'].replace('p','')}}),
            poster: f_data.data.thumb,
        })

        setPlaying_info({
            title:f_data.data.title,
            author:f_data.data.author
        })
        setCda_id(cda_id)
        setPlaying_index(idx)

    }


    return (
        <>
            {!source ? "Loading" : 
                <div className="flex flex-col w-full dark:text-white">
                    <NavBar title={process.env.REACT_APP_TITLE}/>
                    <div className="flex w-full px-2 py-2">
                        <div className="flex flex-col w-full lg:w-4/6" >
                            <Player source={source} setHeight={setHeight} play_next={ended_func}/>
                            <div style={{ maxHeight:height, minHeight:'300px'}}
                                className="block lg:hidden lg:w-2/6 h-full mt-2 lg:mt-0 lg:ml-2  border-4 border-gray-700 rounded-md"
                            >
                                <p className="h-16 w-full font-semibold text-lg flex items-center text-left bg-black bg-opacity-40 px-2">
                                    {playlist_title} {playing_index+1}/{playlist.length}
                                </p>
                                <div style={{height: height-64}} className="overflow-auto">
                                    <PlaylistList data={playlist} setPlayingInfo={setPlayingInfo} playing_cda_id={cda_id}/> 
                                </div>
                            </div>
                            <p className="font-bold text-2xl">
                                {playing_info.title} - {playing_info.author}
                            </p>
                        </div>
                        <div style={{ height:height, minHeight:'300px'}}
                            className="lg:block hidden lg:w-2/6 mt-2 lg:mt-0 overflow-hidden lg:ml-2  border-4 border-gray-700 rounded-md"
                        >
                            <p className="h-16 w-full font-semibold text-lg flex items-center text-left bg-black bg-opacity-40 px-2">
                                {playlist_title} {playing_index+1}/{playlist.length}
                            </p>
                            <div style={{height: height-68}} className="overflow-auto">
                                <PlaylistList data={playlist} setPlayingInfo={setPlayingInfo} playing_cda_id={cda_id}/> 
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}