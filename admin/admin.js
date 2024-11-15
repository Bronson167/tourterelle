
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBX_g_LMjwihaLYswXz6nr3Pqio9u7OwkI",
    authDomain: "tourtterelle-e62c6.firebaseapp.com",
    projectId: "tourtterelle-e62c6",
    storageBucket: "tourtterelle-e62c6.appspot.com",
    messagingSenderId: "365846099562",
    appId: "1:365846099562:web:0ff6bdec5afefa0d66fc13",
    measurementId: "G-TD81R40LPD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = firebase.firestore();


// Exemple d'ajout d'un article
async function addArticle() {
    try {
        await db.collection('articles').add({
            title: 'Mon premier article',
            content: 'Ceci est le contenu de mon premier article.',
            imageUrl: 'URL_DE_L_IMAGE',
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });

    } catch (error) {
        console.error('Erreur lors de l\'ajout de l\'article :', error);
    }
}

// Appelez la fonction pour ajouter un article
addArticle();


document.getElementById('articleForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    const imageFile = document.getElementById('image').files[0];

    // Vérifier que tous les champs sont remplis
    if (!title || !content || !imageFile) {
        alert('Veuillez remplir tous les champs.');
        return;
    }

    // Vérifier le type d'image
    const allowedTypes = ['image/jpeg', 'image/png'];
    if (!allowedTypes.includes(imageFile.type)) {
        alert('Veuillez télécharger une image au format JPG, JPEG ou PNG.');
        return;
    }

    // Télécharger l'image
    const storageRef = storage.ref();
    const imageRef = storageRef.child(`images/${imageFile.name}`);

    await imageRef.put(imageFile);
    const imageUrl = await imageRef.getDownloadURL();

    // Récupérer la date actuelle
    const publicationDate = new Date();

    // Enregistrer l'article dans Firestore
    await db.collection('articles').add({
        title: title,
        content: content,
        imageUrl: imageUrl,
        createdAt: publicationDate, // Stocker la date de publication
        timestamp: firebase.firestore.FieldValue.serverTimestamp() // Pour la date de création
    });

    // Réinitialiser le formulaire
    document.getElementById('articleForm').reset();
    document.getElementById('wordCount').textContent = '0/55 mots'; // Réinitialiser le compteur de mots
    alert('Article publié avec succès !');
});

