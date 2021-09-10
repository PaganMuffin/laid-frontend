import Plyr from "plyr-react"
import 'plyr-react/dist/plyr.css'
import { useEffect, useRef, useState } from "react"

export const Player = ({source, setHeight, play_next}) => {

    const [sauce, setSauce] = useState(null)
    const ref = useRef()

    const on_res = () => {
        //console.log(document.getElementById('plyr')?.clientHeight)
        setHeight(document.getElementById('plyr')?.clientHeight)
    }


    useEffect(() => {
        window.addEventListener('resize', on_res)
        window.addEventListener('canplay', on_res)
        ref.current?.plyr.on('qualitychange', () => {
            ref.current?.plyr.play()
        })
        ref.current?.plyr.on('ended', () => {
            play_next()
        })
    })

    return (
        <>
            {!source ? <img src="https://i.imgur.com/Q7uHHjE.png"/> : 
            <div id="plyr" className="h-full">
                <Plyr
                    ref={ref}
                    
                    source={source}
                />
            </div>
            
            }
        </>
    )
}