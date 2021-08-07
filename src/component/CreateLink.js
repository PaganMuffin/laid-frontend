








const Row = ({link, short}) => {
    return (
        <div 
            className="flex py-2 space-y-2 md:space-y-0 md:flex-row flex-col justify-between md:items-center px-5 rounded-md bg-opacity-10" 
            style={{
                background:'linear-gradient(25deg, #59D3DE, #66FF93)',
                backgroundSize: '100% 200%',
            }}
        >
            <span className="truncate max-w-md px-1 ">{link}</span>
            <span className=" md:items-center space-y-2 md:space-y-0 flex md:flex-row flex-col">
                <span className="w-48 px-1 text-left font-medium text-blue-800">{short}</span>
                <Button name="Kopiuj" h={'full'} px={2} py={1} rounded={'rounded-md'}/>
            </span>
        </div>
    )
}

const Button = ({name, h, px, py, rounded}) => {
    return (
    <button 
        className={`transition duration-500 ease-in-out shadow-md h-${h} px-${px} py-${py} font-semibold bg-cyan-300 hover:bg-cyan-400 ${rounded}`} >{name}</button>
    )
}

const CreateLink = () => {

    let links = [
        {
            'long':'https://mega.nz/folder/zaoTxQLD#RMHQGprjSKREFSEMTcjCzA',
            'short':'https://bit.ly/3yp5h9e'
        },
        {
            'long':'https://drive.google.com/file/d/1AsG98XoB0Pv736Cvho9LDeTfFUs6koTl/view?usp=sharing',
            'short':'https://bit.ly/3uDYVka'
        },
        {
            'long':'https://www.reddit.com/r/NoahGetTheBoat/comments/i2uqad/well/',
            'short':'https://bit.ly/3grLblK'
        },
    ] 
    return (
        <div className="w-screen px-5 text-black max-w-4xl flex flex-col space-y-7 items-center" >
            <p className="text-4xl font-medium">Zacznij już teraz!</p>

            <div className="flex flex-col w-full justify-center md:flex-row md:w-full ">
                <input  className="shadow-md outline-none md:w-full h-12 px-2 md:rounded-l-md md:rounded-r-none rounded-t-md " placeholder="Link..."/>
                <Button name="Generuj" h={12} px={3} py={2} rounded={'md:rounded-r-md md:rounded-l-none rounded-b-md'}/>
            </div>
            <div className={`flex w-full px-2 py-5 rounded-md flex-col bg-white space-y-2`}>
                {links ? links.map((x) => {
                    return (
                        <Row link={x['long']} short={x['short']}></Row>
                    )
                }): null}
            </div>

   
        </div>
    )
}

export default CreateLink