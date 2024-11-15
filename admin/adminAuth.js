
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
// Configuration Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBX_g_LMjwihaLYswXz6nr3Pqio9u7OwkI",
    authDomain: "tourtterelle-e62c6.firebaseapp.com",
    projectId: "tourtterelle-e62c6",
    storageBucket: "tourtterelle-e62c6.appspot.com",
    messagingSenderId: "365846099562",
    appId: "1:365846099562:web:0ff6bdec5afefa0d66fc13",
    measurementId: "G-TD81R40LPD"
};

// Initialiser Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();

document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const password = document.getElementById('password').value;
    const email = document.getElementById('email').value;
    // const correctEmail = 'institutionmixtelatourterelle@gmail.com';
    // const correctPassword = 'la@tourterelle'; // Remplacez par votre mot de passe

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            localStorage.setItem('userId', user.uid);
            window.location.href = './admin/admin.html';
            // ...
        })
        .catch((error) => {
            document.getElementById('message').style.display = 'block';
            document.getElementById('message').textContent = 'Mot de passe ou email incorrect';
            const errorCode = error.code;
            const errorMessage = error.message;
        });



    document.getElementById('message').style.display = 'none';

    // if (password === correctPassword && email == correctEmail) {
    //     // Rediriger vers la page admin
    //     window.location.href = './admin/admin.html'; // Remplacez par le nom de votre page admin
    // } else {
    //     document.getElementById('message').style.display = 'block';
    //     document.getElementById('message').textContent = 'Mot de passe ou email incorrect.';
    // }
});

