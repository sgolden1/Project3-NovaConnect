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

import { createContext, useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        // Check if user document exists, if not create one
        const userRef = doc(db, "users", user.uid);
        setDoc(userRef, {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || "",
          photoURL: user.photoURL || "",
          // Add additional fields as needed
        }, { merge: true }); // Using merge to avoid overwriting existing fields
      } else {
        setCurrentUser(null);
      }
    });

    return () => {
      unsub();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
