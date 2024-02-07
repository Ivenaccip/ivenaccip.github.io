var db = firebase.firestore(); // Asegúrate de haber inicializado Firebase como se mostró anteriormente

// Añadir un documento
db.collection("certificaciones").add({
    nombre: "Certificación de Ejemplo",
    imagen: "url/de/la/imagen"
})
.then((docRef) => {
    console.log("Documento escrito con ID: ", docRef.id);
})
.catch((error) => {
    console.error("Error añadiendo el documento: ", error);
});
