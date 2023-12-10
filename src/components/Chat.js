import React, { useContext } from "react";
import camImage from '../imgs/cam.png';
import addImage from '../imgs/add.png';
import moreImage from '../imgs/more.png';
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../context/ChatContext";

const Chat = () => {
  const { data } = useContext(ChatContext);

  return (
    <div className="chat">
      <div className="chatInfo">
        <span>{data.user?.displayName}</span>
        <div className="chatIcons">
          <img src={camImage} alt="" />
          <img src={addImage} alt="" />
          <img src={moreImage} alt="" />
        </div>
      </div>
      <Messages />
      <Input/>
    </div>
  );
};

export default Chat;