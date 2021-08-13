import { useEffect, useState } from "react"


const CreateLink = () => {

    const [links, setLinks] = useState([])
    const [link, setLink] = useState('')
    const [isCorrect, setIsCorrect] = useState(true)

    useEffect(() => {
        let local = localStorage.getItem('links')
        console.log(local)
        if(!local){
            localStorage.setItem('links', JSON.stringify([]))
            local = JSON.parse(localStorage.getItem('links'))
            console.log(local)
        } else {
            local = JSON.parse(local)
        }

        setLinks(local)
    },[])

    const Row = ({link, short}) => {
        return (
            <div 
                className="flex py-2 space-y-2 md:space-y-0 md:flex-row flex-col justify-between md:items-center px-5 rounded-md bg-opacity-10" 
                style={{
                    background:'linear-gradient(25deg, #59D3DE, #66FF93)',
                    backgroundSize: '100% 200%',
                }}
            >
                <span className="truncate max-w-md px-1 ">https://cda.pl/video/{link}</span>
                <span className=" md:items-center space-y-2 md:space-y-0 flex md:flex-row flex-col">
                    <span className="w-56 px-1 text-left font-medium text-blue-800">{short}</span>
                    <button className="transition duration-500 ease-in-out shadow-md h-full px-2 py-1 font-semibold bg-cyan-300 hover:bg-cyan-400 rounded-md">Kopiuj</button>
                </span>
            </div>
        )
    }
    
    const gen_url = async () => {
        if(/https?:\/\/(?:(?:www\.)?cda\.pl\/video|ebd\.cda\.pl\/[0-9]+x[0-9]+)\/(?<id>[0-9a-z]+)/.test(link)){
            setIsCorrect(true)
            const id = link.match(/https?:\/\/(?:(?:www\.)?cda\.pl\/video|ebd\.cda\.pl\/[0-9]+x[0-9]+)\/(?<id>[0-9a-z]+)/)[1]
            const f = await fetch(`http://localhost:8787/add/${id}`)
            const f_json = await f.json()
            if(links) {
                let arr = links
                arr.push({
                    'short':f_json['short'],
                    'cda_id':f_json['cda_id']
                })
                setLinks([...arr])
                localStorage.setItem('links', JSON.stringify(arr))
            }
        } else {
            setIsCorrect(false)
        }
    }

    return (
        <div className="w-screen px-5 text-black max-w-4xl flex flex-col space-y-7 items-center" >
            <p className="text-4xl font-medium">Zacznij już teraz!</p>

            <div className="flex flex-col w-full justify-center md:flex-row md:w-full ">
                <p className={`${isCorrect ? 'hidden' : null}`}>Błędny adres</p>
                <input onChange={(e) => setLink(e.target.value)} className={`shadow-md outline-none md:w-full h-12 px-2 md:rounded-l-md md:rounded-r-none rounded-t-md`} placeholder="Link..."/>
                <button onClick={gen_url} className="transition duration-500 ease-in-out shadow-md h-12 px-3 py-2 font-semibold bg-cyan-300 hover:bg-cyan-400 md:rounded-r-md md:rounded-l-none rounded-b-md">Generuj</button>
            </div>
            {links.length > 0 ?
                <div className={` flex w-full px-2 py-5 rounded-md flex-col bg-white space-y-2`}>
                    {links.slice(0,5).map((x) => {
                        return (
                            <Row link={x['cda_id']} short={x['short']}></Row>
                        )
                    })}
                    {links.length > 5 ? 
                    <button className="transition duration-500 ease-in-out shadow-md h-12 px-3 py-2 font-semibold bg-cyan-300 hover:bg-cyan-400  rounded-md">Pokaż wszystkie linki</button>
                    : null}
                </div>
            : null}

   
        </div>
    )
}

export default CreateLink