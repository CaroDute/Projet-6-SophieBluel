const email = document.getElementById('email')
const password = document.getElementById('password')
const form = document.getElementById('form')
const connexion = document.querySelector('.button_connexion')
const urlLogin = 'http://localhost:5678/api/users/login'


form.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const connexionValue = {
    "email": evt.target.email.value,
    "password": evt.target.password.value
  }

  const chargeUtile = JSON.stringify(connexionValue)

  fetch(urlLogin, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: chargeUtile
  })

    // 1er then pour traiter la réponse de la requête
    .then(response => {
      if (!response.ok) {
        alert('Erreur dans l’identifiant ou le mot de passe');
      }
      // Si la réponse est OK, on retourne la réponse au format JSON
      return response.json();
    })
    // 2ème then pour traiter les données JSON
    .then(data => {
      // data contient le token d'authentification
      const token = data.token;
      // Faites ce que vous devez faire avec le token ici
      if (token !== undefined) {
        sessionStorage.setItem('token', token)
        document.location.href = "./index.html"
      } else {
        document.location.href = ""
      }
    })
    .catch(error => {
      alert('Erreur lors de la connexion:', error);
    });



})

