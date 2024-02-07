import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Asegúrate de importar también `initializeApp` y tu configuración de Firebase si este script está completamente separado

const db = getFirestore();

// Recuperar datos
db.collection("certificaciones").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().nombre}`);
    });
});