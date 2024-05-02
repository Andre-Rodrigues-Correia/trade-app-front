// import { initializeApp } from 'firebase/app';
// import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";
//
// const firebaseConfig = {
//     apiKey: "AIzaSyBH6jW6ggd4_4kjuV2YUa1I_5-oSA0GRBM",
//     authDomain: "trade-f9dca.firebaseapp.com",
//     projectId: "trade-f9dca",
//     storageBucket: "trade-f9dca.appspot.com",
//     messagingSenderId: "825019995150",
//     appId: "1:825019995150:web:af14f3086e173ef464985f",
//     measurementId: "G-BZ855H5JYN"
// };
//
// export default initializeApp(firebaseConfig);
// FirebaseConfig.js
//
// const admin = require("firebase-admin");
//
//
// function initializeFirebase(serviceAccountKey, storageBucketUrl) {
//     admin.initializeApp({
//         apiKey: "AIzaSyBH6jW6ggd4_4kjuV2YUa1I_5-oSA0GRBM",
//         authDomain: "trade-f9dca.firebaseapp.com",
//         projectId: "trade-f9dca",
//         storageBucket: "trade-f9dca.appspot.com",
//         messagingSenderId: "825019995150",
//         appId: "1:825019995150:web:af14f3086e173ef464985f",
//         measurementId: "G-BZ855H5JYN"
//     });
//
//     console.log("Firebase initialized successfully.");
// }
//
// module.exports = initializeFirebase;

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBH6jW6ggd4_4kjuV2YUa1I_5-oSA0GRBM",
    authDomain: "trade-f9dca.firebaseapp.com",
    projectId: "trade-f9dca",
    storageBucket: "trade-f9dca.appspot.com",
    messagingSenderId: "825019995150",
    appId: "1:825019995150:web:af14f3086e173ef464985f",
    measurementId: "G-BZ855H5JYN"
};

// const firebaseConfig = {
//     apiKey:  import.meta.env.VITE_API_KEY,
//     authDomain:  import.meta.env.VITE_AUTH_DOMAIN,
//     projectId:  import.meta.env.VITE_PROJECT_ID,
//     storageBucket:  import.meta.env.VITE_STORAGE_BUCKET,
//     messagingSenderId:  import.meta.env.VITE_MESSAGING_SENDER_ID,
//     appId:  import.meta.env.VITE_APP_ID,
//     measurementId:  import.meta.env.VITE_MEASUREMENT_ID
// };

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);





