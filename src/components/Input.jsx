// import React, { useContext, useState } from "react";
// import Img from "../imgs/img.png";
// import Attach from "../imgs/attach.png";
// import { AuthContext } from "../context/AuthContext";
// import { ChatContext } from "../context/ChatContext";
// //import {writeUserData} from "writeUserData";
// import {getFirestore, collection, setDoc} from "firebase/firestore;"
// import {initializeApp} from "firebase/app";

// const firebaseConfig ={
//   apiKey: "AIzaSyAVmEt2vmtaSB2wXlwLUD7VfvjwsIeZwGI",
//   authDomain: "novaconnect-88973.firebaseapp.com",
//   databaseURL: "https://novaconnect-88973-default-rtdb.firebaseio.com",
//   projectId: "novaconnect-88973",
//   storageBucket: "novaconnect-88973.appspot.com",
//   messagingSenderId: "766807848089",
//   appId: "1:766807848089:web:ad22aebb42260e8849b408"
// };

// // initializeApp(firebaseConfig);
// // const db = getFirestore();

// import {
//   arrayUnion,
//   doc,
//   serverTimestamp,
//   Timestamp,
//   updateDoc,
// } from "firebase/firestore";
// import { db, storage } from "../firebase";
// import { v4 as uuid } from "uuid";
// import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

// const Input = () => {
//   const [text, setText] = useState("");
//   const [img, setImg] = useState(null);

//   const { currentUser } = useContext(AuthContext);
//   const { data } = useContext(ChatContext);

//   const handleSend = async () => {
//     if (img) {
//       const storageRef = ref(storage, uuid());

//       const uploadTask = uploadBytesResumable(storageRef, img);

//       uploadTask.on(
//         (error) => {
//           //TODO:Handle Error
//         },
//         () => {
//           getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
//             await updateDoc(doc(db, "chats", data.chatId), {
//               messages: arrayUnion({
//                 id: uuid(),
//                 text,
//                 senderId: currentUser.uid,
//                 date: Timestamp.now(),
//                 img: downloadURL,
//               }),
//             });
//           });
//         }
//       );
//     } else {
//       await updateDoc(doc(db, "chats", data.chatId), {
//         messages: arrayUnion({
//           id: uuid(),
//           text,
//           senderId: currentUser.uid,
//           date: Timestamp.now(),
//         }),
//       });
//     }

//     await updateDoc(doc(db, "userChats", currentUser.uid), {
//       [data.chatId + ".lastMessage"]: {
//         text,
//       },
//       [data.chatId + ".date"]: serverTimestamp(),
//     });

//     await updateDoc(doc(db, "userChats", data.user.uid), {
//       [data.chatId + ".lastMessage"]: {
//         text,
//       },
//       [data.chatId + ".date"]: serverTimestamp(),
//     });

//     setText("");
//     setImg(null);
//   };
//   return (
//     <div className="input">
//       <input
//         type="text"
//         placeholder="Type something..."
//         onChange={(e) => setText(e.target.value)}
//         value={text}
//       />
//       <div className="send">
//         <img src={Attach} alt="" />
//         <input
//           type="file"
//           style={{ display: "none" }}
//           id="file"
//           onChange={(e) => setImg(e.target.files[0])}
//         />
//         <label htmlFor="file">
//           <img src={Img} alt="" />
//         </label>
//         <button onClick={handleSend}>Send</button>
//       </div>
//     </div>
//   );
// };

// export default Input;

import React, { useContext, useState } from "react";
import Img from "../imgs/img.png";
import Attach from "../imgs/attach.png";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { db, storage } from "../firebase";
import { v4 as uuid } from "uuid";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {
  doc,
  updateDoc,
  arrayUnion,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";

const Input = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async () => {
    if (img) {
      const storageRef = ref(storage, uuid());
      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Handle progress, such as updating a UI to show percentage uploaded
        },
        (error) => {
          // Handle unsuccessful uploads
        }, 
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      );
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setText("");
    setImg(null);
  };

  return (
    <div className="input">
      <input
        type="text"
        placeholder="Type something..."
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <div className="send">
        <img src={Attach} alt="" />
        <input
          type="file"
          style={{ display: "none" }}
          id="file"
          onChange={(e) => setImg(e.target.files[0])}
        />
        <label htmlFor="file">
          <img src={Img} alt="" />
        </label>
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Input;
