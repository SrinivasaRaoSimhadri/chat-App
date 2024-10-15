const Message =({userFullname, userProfilePic, receiverFullName, receiverProfilePic, isSenderUser, message}) => {
    return (
        <div className={`chat ${isSenderUser ? "chat-end" : "chat-start"}`}>
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="img"
                  src={
                    `${isSenderUser ? 
                      userProfilePic : 
                      receiverProfilePic}`
                    } 
                />
              </div>
            </div>
            <div className="chat-header">
                {
                  isSenderUser ? userFullname : receiverFullName
                }
                <time className="text-xs opacity-50">  {new Date(message.createdAt).toLocaleTimeString()}</time>
            </div>
              <div className="chat-bubble">{message.message}</div>
              <div className="chat-footer opacity-50 ">Delivered</div>
            </div>
    )
}

export default Message;