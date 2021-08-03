const Avatar = ({url}) => {
    return (
        <img
            alt="avatar"
            src={url}
            className="w-11 h-11 rounded-full"
        />
    )
}

const User = ({nick, url}) => {
    return (
        <div className="flex items-center h-16 space-x-3">
            <p className="hidden sm:block font-semibold">{nick}</p>
            <Avatar url={url}/>
        </div>
    )
}
const BurgerIcon = () => {
    return (
        <div>
        <div style={{width:"25px",height:"2px",backgroundColor:'white',margin:'5px 0'}}/>
        <div style={{width:"25px",height:"2px",backgroundColor:'white',margin:'5px 0'}}/>
        <div style={{width:"25px",height:"2px",backgroundColor:'white',margin:'5px 0'}}/>
        </div>
    )
}

const SearchBar = () => {
    return (
        <input
            className="hidden sm:block px-1 bg-transparent border-b-2 w-2/5 outline-none focus:border-yellow-500 transition duration-300 ease-linear"
            placeholder="Search..."
        />
    )
}

const NavBar = ({title, username, avatar_url}) => {
    return (
        <nav className="fixed h-16 flex justify-center w-full dark:text-white bg-primary bg-opacity-50">
            <div className="flex items-center justify-between w-full max-w-5xl px-5 ">
                <div className="flex items-center space-x-3">
                    <p className="text-lg font-bold">{title}</p>
                </div>
                <SearchBar/>
                <User nick={username} url={avatar_url}/>
            </div>

        </nav>
    )
}

export default NavBar