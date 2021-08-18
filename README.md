{links.length > 0 ?
    <div className={` flex w-full px-2 py-5 rounded-md flex-col bg-white space-y-2`}>
        
        {links.slice(0,5).map(x => <Row link={x['cda_id']} short={x['short']} />)}

        {links.length > 5 ? 
        <button className="transition duration-500 ease-in-out shadow-md h-12 px-3 py-2 font-semibold bg-cyan-300 hover:bg-cyan-400  rounded-md">Pokaż wszystkie linki</button>
        : null}
    </div>
: null}



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