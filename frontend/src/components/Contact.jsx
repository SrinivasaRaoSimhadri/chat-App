const Contact = ({user, onClick, isSelected})=> {
    return (
        <div onClick={onClick} className={`bg-gray-700 rounded-md py-2 px-3 mb-2 hover:scale-105 duration-300 hover:rounded-md hover:bg-gray-900 hover:text-white  hover: cursor-pointer ${isSelected? "bg-gray-900":""}`}>
            <div className="flex items-center gap-2">
                <div className={`avatar`}>
                    <div className="w-12 rounded-full border">
                        <img alt= "user" src={user.profilePic} />
                    </div>
                </div>
                <div className="text-left flex-1">
                    {user.userName}
                </div>
            </div>
        </div>
    )
}
export default Contact;