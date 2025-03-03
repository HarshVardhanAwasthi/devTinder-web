import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { createSocketConnection } from "../utils/socket";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Chat = () => {
  const { targetUserId } = useParams();

  const [newMessage, setNewMessage] = useState("");
  const [message, setMessage] = useState([]);

  const user = useSelector((store) => store.user);
  const userId = user?._id;

  const fetchChat= async () => {
    const chat=await axios.get(BASE_URL+"/chat/"+targetUserId,{
      withCredentials:true,
    });
    
    console.log(chat.data.messages);

    const chatMessages=chat?.data?.messages.map((msg)=>{
      const {senderId, text}=msg;
      return{
        firstName: senderId?.firstName,
        lastName: senderId?.lastName,
        text,
        // timestamp,
      };
    });
    setMessage(chatMessages);
  };

  useEffect(()=>{
    fetchChat();
  },[]);

  useEffect(() => {
    if (!user) {
      return;
    }
    const socket = createSocketConnection();
    socket.emit("joinChat", {
      firstName: user.firstName,
      userId,
      targetUserId,
    });

    socket.on("messageReceived", ({  firstName, lastName, text }) => {
      console.log(firstName + " " + text);
      setMessage((message)=>[...message, {  firstName, lastName, text }]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  const sendMessage = () => {
    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      firstName: user.firstName,
      lastName: user.lastName,
      userId,
      targetUserId,
      text: newMessage,
    });
    setNewMessage("");
  };
  return (
    <div className="border-2 border-black m-3">
      <div className="my-4 mx-2">chat</div>
      <div className="border-t-2 border-black  h-[450px] overflow-auto">
        {message.map((msg, index) => {
          return (
            <div key={index} className={"chat " + (user.firstName===msg.firstName?"chat-end":"chat-start")}>
              <div className="chat-header">
              {`${msg.firstName}  ${msg.lastName}`}
                <time className="text-xs opacity-50"></time>
              </div>
              <div className="chat-bubble">{msg.text}</div>
              <div className="chat-footer opacity-50">Seen</div>
            </div>
          );
        })}
      </div>
      <div className=" flex border-t-2 border-black p-4">
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered input-info w-full"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button onClick={sendMessage} className="btn btn-secondary ml-0.5">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
