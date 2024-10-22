document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const password = document.getElementById('password').value;
    const email = document.getElementById('email').value;
    const correctEmail = 'institutionmixtelatourterelle@gmail.com';
    const correctPassword = 'latourterelle'; // Remplacez par votre mot de passe

    document.getElementById('message').style.display = 'none';

    if (password === correctPassword && email == correctEmail) {
        // Rediriger vers la page admin
        window.location.href = './admin/admin.html'; // Remplacez par le nom de votre page admin
    } else {
        document.getElementById('message').style.display = 'block';
        document.getElementById('message').textContent = 'Mot de passe ou email incorrect.';
    }
});
