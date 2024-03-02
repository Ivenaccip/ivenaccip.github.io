import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Configuración de tu aplicación web Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDV11SjtSwGo4Y_ogujRYTEeXeZj47k31Q",
  authDomain: "portafolio-53b55.firebaseapp.com",
  projectId: "portafolio-53b55",
  storageBucket: "portafolio-53b55.appspot.com",
  messagingSenderId: "426732472680",
  appId: "1:426732472680:web:c43ac314da2acdb2cf6edd",
  measurementId: "G-V8LN359VDM"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Referencia al documento en Firestore
const docRef = doc(db, "proyectos", "xDIeubkScD5uMhFZEwFe");

// Obtén el documento
getDoc(docRef).then((docSnap) => {
  if (docSnap.exists()) {
    const data = docSnap.data();

    // Nombre del proyecto
    document.getElementById('primer-div').querySelector('h2').textContent = data.nombre;

    // Imagen PNG
    const pngElement = document.querySelector('.dos-tercios.caja');
    const img = document.createElement('img');
    img.src = `../src/${data.png}`;
    img.alt = 'Imagen del Proyecto';
    pngElement.appendChild(img);

    // Código LaTeX
    const codeElement = document.querySelector('.un-tercio.caja');
    data.code.forEach((latexCode) => {
      const p = document.createElement('p');
      p.textContent = latexCode; // MathJax procesará esto
      codeElement.appendChild(p);
      MathJax.typesetPromise([p]).then(() => {
        console.log('Fórmula renderizada por MathJax.');
      }).catch((error) => {
        console.error('Error al renderizar la fórmula con MathJax:', error);
      });
    });


    // Fechas
    const fechaElement = document.getElementById('tercer-div');
    const fechaInicio = data.fecha_inicio.toDate().toLocaleDateString('es-ES');
    const fechaFinal = data.fecha_final ? data.fecha_final.toDate().toLocaleDateString('es-ES') : 'actualmente';
    fechaElement.textContent = `${fechaInicio} - ${fechaFinal}`;

    // Contexto, Problemática, Solución
    document.querySelector('#cuarto-div .caja:nth-child(1) p').textContent = data.contexto;
    document.querySelector('#cuarto-div .caja:nth-child(2) p').textContent = data.problematica;
    document.querySelector('#cuarto-div .caja:nth-child(3) p').textContent = data.solution;

  } else {
    console.log("El documento no existe!");
  }
}).catch((error) => {
  console.error("Error al obtener el documento:", error);
});
