// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-analytics.js";
import { getFirestore, collection, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
//  TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDV11SjtSwGo4Y_ogujRYTEeXeZj47k31Q",
  authDomain: "portafolio-53b55.firebaseapp.com",
  projectId: "portafolio-53b55",
  storageBucket: "portafolio-53b55.appspot.com",
  messagingSenderId: "426732472680",
  appId: "1:426732472680:web:c43ac314da2acdb2cf6edd",
  measurementId: "G-V8LN359VDM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);

// Modificación aquí: Crear una consulta que ordene las certificaciones por fecha en orden descendente
const certificacionesQuery = query(collection(db, "certificaciones"), orderBy("fecha", "desc"));

function createCertificationCard(nombre, png) {
    // Crear elementos para la tarjeta de certificación
    const card = document.createElement('div');
    const image = document.createElement('img');
    const name = document.createElement('div');

    // Añadir clases para el estilo
    card.classList.add(isTop? 'certificacion-top' : 'certificacion');
    image.classList.add('certificacion-imagen');
    name.classList.add('certificacion-nombre');

    // Configurar atributos de imagen y nombre
    image.src = `../src/certifications/${png}`;
    image.alt = `Certificado ${nombre}`;
    name.textContent = nombre;

    // Añadir imagen y nombre al card
    card.appendChild(image);
    card.appendChild(name);

    return card;
}

getDocs(certificacionesQuery).then((querySnapshot) => {
    const topContainer = document.getElementById('top-certifications-container');
    const container = document.getElementById('certificaciones-container');
    querySnapshot.forEach((doc) => {
        const data = doc.data();
        // Pasar 'true' como tercer argumento si 'top' es true en los datos
        const card = createCertificationCard(data.nombre, data.png, data.top);
        if (!data.top) {
            container.appendChild(card);
        } else {
            topContainer.appendChild(card);
        }
    });
});