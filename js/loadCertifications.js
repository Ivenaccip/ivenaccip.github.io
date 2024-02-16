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

function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('es-ES', options); // Ajusta el locale según necesites
}

function showCertificationPopup(data) {
    const popupContainer = document.getElementById('popup-container');
    if (!popupContainer) return; // Si no existe el contenedor del pop-up, no hacer nada

    const fechaFormateada = formatDate(data.fecha.toDate()); // Asumiendo que data.fecha es un Timestamp de Firestore

    popupContainer.innerHTML = `
        <div class="popup" style="position: relative; background-color: white; padding: 20px; padding-top: 40px; border-radius: 5px; box-shadow: 0 0 10px rgba(0,0,0,0.5); text-align: center; max-width: 500px; width: 90%; margin: auto; color: black;">
            <div id="close-popup" style="position: absolute; top: 10px; right: 15px; cursor: pointer; font-size: 24px; color: black;">&times;</div>
            <h2>${data.nombre}</h2>
            <img src="../src/certifications/${data.png}" alt="Certificado ${data.nombre}" class="popup-image">
            <p><strong>Date:</strong> ${fechaFormateada} <strong>Hours:</strong> ${data.horas}</p>
            <p><strong>Description:</strong> ${data.description}</p>
        </div>
    `;

    // Mostrar el pop-up
    popupContainer.style.display = 'block';

    // Agregar evento para cerrar el pop-up
    document.getElementById('close-popup').addEventListener('click', () => {
        popupContainer.style.display = 'none';
    });
}

function createCertificationCard(data) {
    // Crear elementos para la tarjeta de certificación
    const card = document.createElement('div');
    const image = document.createElement('img');
    const name = document.createElement('div');

    // Añadir clases para el estilo
    card.classList.add(data.top ? 'certificacion-top' : 'certificacion');
    image.classList.add('certificacion-imagen');
    name.classList.add('certificacion-nombre');

    // Configurar atributos de imagen y nombre
    image.src = `../src/certifications/${data.png}`;
    image.alt = `Certificado ${data.nombre}`;
    name.textContent = data.nombre;

    // Añadir imagen y nombre al card
    card.appendChild(image);
    card.appendChild(name);

    // Manejador de clics para mostrar el pop-up
    card.addEventListener('click', () => showCertificationPopup(data));

    return card;
}

getDocs(certificacionesQuery).then((querySnapshot) => {
    const topContainer = document.getElementById('top-certifications-container');
    const container = document.getElementById('certificaciones-container');
    querySnapshot.forEach((doc) => {
        const data = doc.data();
        // Ahora pasamos el objeto data completo
        const card = createCertificationCard(data);
        if (!data.top) {
            container.appendChild(card);
        } else {
            topContainer.appendChild(card);
        }
    });
});