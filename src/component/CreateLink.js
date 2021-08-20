import { Fragment, useEffect, useRef, useState } from "react"
import { useHistory } from "react-router-dom"
import { Dialog, Transition } from '@headlessui/react'


const CreateLink = ({location}) => {
    const history = useHistory()
    const [info, setInfo] = useState(null)
    const [link, setLink] = useState('')
    const [isCorrect, setIsCorrect] = useState(true)
    const [viewPlayer, setViewPlayer] = useState(false)
    const [cdaId, setCdaId] = useState(null)

    const [isOpen, setIsOpen] = useState(false)
    const iframe_to_copy = useRef(null)

    const info_codes = {
        '404':'Nie znaleziono video.',
        '429':'Spróbuj za chwile.',
        '400':'Wideo premium.'
    }



    useEffect(() => {
       const id = location.pathname.split('/').pop()
       setCdaId(id)
       if(id){
           setLink("https://cda.pl/video/" + id)
           fetch(`${process.env.REACT_APP_API_URL}/json/${id}`)
           .then((f) => f.json())
           .then(f_json => {
                setInfo(f_json) 
           })
       } else {
           history.push('/')
           setInfo(null)
           setLink('')
       }
         
    },[location.pathname])

    const closeModal = () => {
        setIsOpen(false)
      }
    
    const openModal = () => {
        setIsOpen(true)
    }

    const gen_url = async () => {
        setInfo(null)
        if(/https?:\/\/(?:(?:www\.)?cda\.pl\/video|ebd\.cda\.pl\/[0-9]+x[0-9]+)\/(?<id>[0-9a-z]+)/.test(link)){
            setIsCorrect(true)
            const id = link.match(/https?:\/\/(?:(?:www\.)?cda\.pl\/video|ebd\.cda\.pl\/[0-9]+x[0-9]+)\/(?<id>[0-9a-z]+)/)[1]
            setCdaId(id)
            history.push('/video/' + id)
        } else {
            
            setIsCorrect(false)
        }
    }

    const Embed_dialog = () => {

        const iframe_text = `<iframe src="${process.env.REACT_APP_API_URL}/player/${cdaId}" width="560" height="315" frameborder="0" allow="autoplay; clipboard-write; picture-in-picture" allowfullscreen/>`

        const select_iframe = () => {
            iframe_to_copy.current.select()
            //navigator.clipboard.writeText(iframe_text)
        }

        const copy_iframe = () => {
            iframe_to_copy.current.select()
            navigator.clipboard.writeText(iframe_text)
        }

        return (
            <Transition appear show={isOpen} as={Fragment}>
            <Dialog
              as="div"
              className="fixed inset-0 z-10 overflow-y-auto"
              onClose={closeModal}
            >
                <Dialog.Overlay className="fixed inset-0 bg-black opacity-40" />
                <div className="min-h-screen px-4 text-center">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0" />
                    </Transition.Child>
        
                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span
                        className="inline-block h-screen align-middle"
                        aria-hidden="true"
                    >
                        &#8203;
                    </span>

                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <div className="inline-block w-full max-w-md  my-8 overflow-hidden text-left align-middle transition-all transform bg-bg_dark shadow-xl rounded-2xl">
                            <div className="bg-white dark:bg-opacity-20 p-4">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-medium leading-6 text-gray-900 dark:text-white"
                                >
                                    Kod do umieszczenia na stronie
                                </Dialog.Title>
                                <div className="mt-2 bg-black bg-opacity-10 dark:bg-white dark:bg-opacity-70 p-2 rounded-2xl h-36">
                                    <textarea 
                                        ref={iframe_to_copy}
                                        value={iframe_text}
                                        onClick={select_iframe}
                                        className="bg-transparent w-full h-full outline-none resize-none  "
                                        id="iframe_textarea"
                                        autoComplete="off"
                                        autoCapitalize="none"
                                        placeholder=""
                                        readOnly
                                        spellCheck="false"
                                        aria-describedby=""
                                        aria-labelledby="paper-input-label-3"
                                    ></textarea>
                                </div>

                                <div className="mt-4 flex justify-between">
                                    <button
                                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                        onClick={closeModal}
                                    >
                                        Zamknij
                                    </button>
                                    <button
                                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white  bg-green-500 rounded-md hover:bg-green-600 "
                                        onClick={copy_iframe}
                                    >
                                        Kopiuj do schowka
                                    </button>
                                </div>
                            </div>

                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
          </Transition>
        )
    }

    const Show_data = ({info}) => {

        return (
            <div className="flex flex-col space-y-2">
                <p className="font-semibold text-2xl">
                    {info['title']}
                </p>
                <div className=" flex md:flex-row flex-col justify-center items-center space-y-5 md:space-y-0">
                    {viewPlayer ?
                        <div className=" w-full">
                            <iframe
                                className="w-full rounded-md"
                                style={{aspectRatio:"16/9"}}
                                src={`${process.env.REACT_APP_API_URL}/player/${cdaId}`}
                                allow="autoplay"
                                frameBorder="0"
                                allowFullScreen
                            />
                        </div>
    
                    :
    
                        <div className="relative md:w-full">
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
                    <div className=" md:w-full  flex justify-center items-center flex-col-reverse">
                        <div className="flex md:flex-row flex-col md:space-x-2 w-80">
                            <a
                                href={`${process.env.REACT_APP_API_URL}/player/${cdaId}`}
                                target="_blank"
                                
                            >
                                <button
                                    className="px-2  w-full transition duration-500 ease-in-out bg-blue-500  hover:bg-blue-600 py-1 my-1 rounded-lg text-white font-semibold"
                                >
                                    Odtwórz w nowej karcie
                                </button>
                            </a>
                            
                            <button
                                onClick={openModal}
                                className="px-2 transition duration-500 ease-in-out bg-blue-500  hover:bg-blue-600 py-1 my-1 rounded-lg text-white font-semibold"
                            >
                                Embed na stronę
                            </button>
    
                        </div>
                        <Embed_dialog />
                        {info.qualities.map((x) => {
                            return (
                                <a key={x.resolution} href={x.url} download target="_blank" className="flex flex-row h-9 my-1 justify-center items-center">
                                    <button className="px-2 py-1 w-80 h-full bg-blue-500 rounded-lg text-white font-semibold transition duration-500 ease-in-out hover:bg-blue-600 ">Pobierz {x.resolution}</button>
                                </a>
                            )
                        })}
                    </div>
                </div>
           
            </div>
            )
    }

    return (
        <div className="w-full px-5 text-black max-w-4xl flex flex-col space-y-7 items-center" >

            <div className="flex flex-col w-full justify-center md:w-full space-y-2">
                <p className={`${isCorrect ? 'hidden' : null} w-full text-center font-bold text-lg rounded-lg text-white bg-red-400 py-2`}>Błędny adres</p>
                <div className="flex md:flex-row w-full flex-col">
                    <input onChange={(e) => setLink(e.target.value)} value={link} className="dark:bg-white dark:bg-opacity-10 dark:text-white shadow-md outline-none w-full h-12 px-2 md:rounded-l-md md:rounded-r-none rounded-t-md" placeholder="Link..."/>

                    <button onClick={gen_url} className="transition duration-500 ease-in-out shadow-md h-12 px-3 py-2 font-semibold  bg-blue-500 hover:bg-blue-600 md:rounded-r-md md:rounded-l-none rounded-b-md  text-white">Generuj</button>
                </div>
            </div>
            {info ?
                <div className="dark:bg-white dark:bg-opacity-10 dark:text-white flex w-full  px-2 py-2 rounded-md flex-col bg-white space-y-2 shadow-lg">
                    {info['code'] !== 200 ? <p>{info_codes[info['code']]}</p> : <Show_data info={info['data']}/>}
                </div>
            : null}
        </div>
    )
}

export default CreateLink