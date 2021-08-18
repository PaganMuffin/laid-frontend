import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"






const CreateLink = ({location}) => {
    const history = useHistory()

    const [info, setInfo] = useState(null)
    const [link, setLink] = useState('')
    const [isCorrect, setIsCorrect] = useState(true)
    const [viewPlayer, setViewPlayer] = useState(false)

    const info_codes = {
        '404':'Nie znaleziono video.',
        '429':'Spróbuj za chwile.',
        '400':'Wideo premium.'
    }

    useEffect(() => {
       const id = location.pathname.split('/').pop()
       if(id){
           setLink("https://cda.pl/video/" + id)
           fetch(`https://backend.pamu.ga/json/${id}`)
           .then((f) => f.json())
           .then(f_json => setInfo(f_json) )
       }
         
    },[location.pathname])


    const gen_url = async () => {
        setInfo(null)
        if(/https?:\/\/(?:(?:www\.)?cda\.pl\/video|ebd\.cda\.pl\/[0-9]+x[0-9]+)\/(?<id>[0-9a-z]+)/.test(link)){
            setIsCorrect(true)
            const id = link.match(/https?:\/\/(?:(?:www\.)?cda\.pl\/video|ebd\.cda\.pl\/[0-9]+x[0-9]+)\/(?<id>[0-9a-z]+)/)[1]
            history.push('/video/' + id)
        } else {
            setIsCorrect(false)
        }
    }



    const Show_data = ({info}) => {
        const id = link.match(/https?:\/\/(?:(?:www\.)?cda\.pl\/video|ebd\.cda\.pl\/[0-9]+x[0-9]+)\/(?<id>[0-9a-z]+)/)[1]
        return (
            <div className="flex sm:flex-row flex-col justify-center items-center space-y-5 sm:space-y-0">
                {viewPlayer ?
                    <div className="w-full">
                        <iframe
                            className="w-full rounded-md"
                            style={{aspectRatio:"16/9"}}
                            src={`https://backend.pamu.ga/player/${id}`}
                            allow="autoplay"
                            frameBorder="0"
                            allowFullScreen
                        />
                    </div>

                :

                    <div className="relative sm:w-full">
                        <img className="rounded-lg" src={info.thumb}/>
                        <div className="absolute text-white font-semibold top-0 h-24 w-full rounded-t-lg" style={{background: 'linear-gradient(0deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.5) 100%)'}}>
                            <p className="px-2 py-2">
                                {info.title}
                            </p>
                        </div>
                        <div className="absolute text-white bottom-3 right-3" >
                            <p className="bg-black bg-opacity-70 px-2 py-1 rounded-md font-semibold">
                                {info.duration}
                            </p>
                        </div>
                        <button onClick={() => setViewPlayer(true)} className="absolute rounded-full h-12 w-12 flex items-center justify-center " style={{top:'50%', left:'50%', transform:'translate(-50%,-50%)', backgroundColor:'#00b3ff'}}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-player-play" width="20" height="20" viewBox="0 0 24 24" strokeWidth="2.5" stroke="#ffffff" fill="#ffffff" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M7 4v16l13 -8z" />
                            </svg>
                        </button>
                    </div>
                
                }
                <div className="sm:w-full flex justify-center items-center flex-col-reverse">
                    {info.qualities.map((x) => {
                        return (
                            <a key={x.resolution} href={x.url} download target="_blank" className="flex flex-row h-9 my-1 justify-center items-center">
                                <button className="px-2 py-1 w-64 bg-blue-500 rounded-lg text-white">Pobierz {x.resolution}</button>
                            </a>
                        )
                    })}
                </div>
            </div>
        )
    }

    return (
        <div className="w-full px-5 text-black max-w-4xl flex flex-col space-y-7 items-center" >

            <div className="flex flex-col w-full justify-center md:flex-row md:w-full ">
                <p className={`${isCorrect ? 'hidden' : null}`}>Błędny adres</p>
                <input onChange={(e) => setLink(e.target.value)} value={link} className={`shadow-md outline-none md:w-full h-12 px-2 md:rounded-l-md md:rounded-r-none rounded-t-md`} placeholder="Link..."/>
                <button onClick={gen_url} className="transition duration-500 ease-in-out shadow-md h-12 px-3 py-2 font-semibold bg-cyan-300 hover:bg-cyan-400 md:rounded-r-md md:rounded-l-none rounded-b-md">Generuj</button>
            </div>
            {info ?
                <div className="flex w-full  px-2 py-2 rounded-md flex-col bg-white space-y-2 shadow-lg">
                    {info['code'] !== 200 ? <p>{info_codes[info['code']]}</p> : <Show_data info={info['data']}/>}
                </div>
            : null}
        </div>
    )
}

export default CreateLink