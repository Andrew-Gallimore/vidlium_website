// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getAnalytics, logEvent } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAHi3PBfzDXXjLG2bu2XPT6-lD2GQ23_2g",
    authDomain: "notify-me-form.firebaseapp.com",
    projectId: "notify-me-form",
    storageBucket: "notify-me-form.appspot.com",
    messagingSenderId: "511688313802",
    appId: "1:511688313802:web:204150e95182f04ded5d33",
    measurementId: "G-60YWSN4BV9"
  };
  

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore()
const analytics = getAnalytics(app);

async function storeData(email, pre) {
    try {
        if(typeof email !== "string" || typeof pre !== "boolean") {
            throw "Wrong arguement types";
        }
        var time = Date.now()
        const docRef = await addDoc(collection(db, "users"), {
            emailAdress: email,
            preRelease: pre,
            time: time
        });
        logEvent(analytics, 'form_submit', {
            pre_release: pre
        });
        return "Success";
    }catch (e) {
        return "Error";
    }
}
window.storeData = storeData;