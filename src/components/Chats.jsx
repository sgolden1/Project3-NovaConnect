import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { db } from "../firebase";

const Chats = () => {
  const [chats, setChats] = useState([]);

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    if (currentUser?.uid) {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    }
  }, [currentUser?.uid]);

  return (
    <div className="chats">
      {chats && Object.entries(chats)?.sort((a, b) => b[1].date - a[1].date).map(([chatId, chatData]) => {
        const userInfo = chatData?.userInfo;

        if (!userInfo) {
          return null; // or some placeholder content
        }

        return (
          <div
            className="userChat"
            key={chatId}
            onClick={() => {
              // Handle chat selection here
            }}
          >
            <img src={userInfo.photoURL || 'default-image-url.jpg'} alt={userInfo.displayName || "User"} />
            <div className="userChatInfo">
              <span>{userInfo.displayName}</span>
              <p>{chatData.lastMessage?.text}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Chats;
