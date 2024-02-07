import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-analytics.js";

// Asegúrate de importar también `initializeApp` y tu configuración de Firebase si este script está completamente separado

const firebaseConfig = {
    apiKey: "AIzaSyDV11SjtSwGo4Y_ogujRYTEeXeZj47k31Q",
    authDomain: "portafolio-53b55.firebaseapp.com",
    projectId: "portafolio-53b55",
    storageBucket: "portafolio-53b55.appspot.com",
    messagingSenderId: "426732472680",
    appId: "1:426732472680:web:c43ac314da2acdb2cf6edd",
    measurementId: "G-V8LN359VDM"
    };

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

// Recuperar datos
db.collection("certificaciones").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().nombre}`);
    });
});