import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';

export const firebaseConfig = {
    apiKey: "AIzaSyAVmEt2vmtaSB2wXlwLUD7VfvjwsIeZwGI",
    authDomain: "novaconnect-88973.firebaseapp.com",
    projectId: "novaconnect-88973",
    storageBucket: "novaconnect-88973.appspot.com",
    messagingSenderId: "766807848089",
    appId: "1:766807848089:web:ad22aebb42260e8849b408"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);

//export { auth, db };

 // const app = initializeApp(firebaseConfig);  