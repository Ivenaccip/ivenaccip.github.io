        // Import the functions you need from the SDKs you need
        import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
        import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-analytics.js";
        import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
        //  TODO: Add SDKs for Firebase products that you want to use
        // https://firebase.google.com/docs/web/setup#available-libraries
      
        // Your web app's Firebase configuration
        // For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

        // New way to fetch collections with Firebase 9+ modular syntax
        const certificacionesCol = collection(db, "certificaciones");
        getDocs(certificacionesCol).then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log(`${doc.id} => `, doc.data().nombre);
            });
        });