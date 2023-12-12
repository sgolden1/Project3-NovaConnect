import { getDatabase, ref, set } from "firebase/database";

function writeUserData(uid, displayName, email, photoURL) {
  const db = getDatabase();
  set(ref(db, 'users/' + uid), {
    username: displayName, // changed from 'name' to 'displayName'
    email: email,         // aligns with the parameter 'email'
    img : photoURL // changed from 'imageUrl' to 'photoURL'
  });
}
