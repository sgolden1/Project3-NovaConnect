// import { createContext, useEffect, useState } from "react";
// import { auth } from "../firebase";
// import { onAuthStateChanged } from "firebase/auth";

// export const AuthContext = createContext();

// export const AuthContextProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState({});

//   useEffect(() => {
//     const unsub = onAuthStateChanged(auth, (user) => {
//       setCurrentUser(user);
//       console.log(user);
//     });

//     return () => {
//       unsub();
//     };
//   }, []);

//   return (
//     <AuthContext.Provider value={{ currentUser }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// import { createContext, useEffect, useState } from "react";
// import { auth, db } from "../firebase";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { doc, setDoc } from "firebase/firestore";
// import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

import { createContext, useEffect, useState } from "react";
import { auth, db, storage } from "../firebase";
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [authSuccess, setAuthSuccess] = useState(""); // For displaying success message

  const signUp = async (email, password, displayName, avatar) => {
    setAuthSuccess(""); // Reset success message before the operation
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      let photoURL = "none";

      if (avatar) {
        // Create a unique image name
        const date = new Date().getTime();
        const storageRef = ref(storage, `avatars/${user.uid}_${date}`);
        const uploadTask = await uploadBytesResumable(storageRef, avatar);
        photoURL = await getDownloadURL(uploadTask.snapshot.ref);
      }

      // Update profile and create a document for the user
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        displayName: displayName || "",
        email,
        photoURL,
      });

      setCurrentUser({
        ...user,
        displayName,
        photoURL,
      });

      setAuthSuccess("User registered successfully!"); // Set success message
    } catch (error) {
      console.error("Error registering new user:", error);
      setAuthSuccess(`Failed to register user: ${error.message}`);
    }
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user); // Set the current user
    });

    return () => {
      unsub(); // Clean up the subscription
    };
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, signUp, authSuccess }}>
      {children}
    </AuthContext.Provider>
  );
};
