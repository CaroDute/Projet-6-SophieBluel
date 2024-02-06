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
    method:'POST',
    headers:{
      'Accept':'application/json',
      'Content-Type':'application/json',
    },
    body: chargeUtile
  })

  .then(response => {
    if (!response.ok) {
      throw new Error('Erreur de connexion');
    }
    // Si la réponse est OK, on retourne la réponse au format JSON
    return response.json();
  })
    .then(data => {
      // data contient le token d'authentification
      const token = data.token;
      // Faites ce que vous devez faire avec le token ici
      console.log('Token d\'authentification:', token);
    })
    .catch(error => {
      console.error('Erreur lors de la connexion:', error);
    });
})



// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcwNzI0NDc5NSwiZXhwIjoxNzA3MzMxMTk1fQ.dhDSaWk411bVsZvwV7pjLzleCZiueQgYAcacZ2VhF60


// if (email.value === 'sophie.bluel@test.tld' && password.value === 'S0phie') {
//     console.log('hello');
//   } else if (email.value !== 'sophie.bluel@test.tld' || password.value !== 'S0phie') {
//     console.log("Erreur dans l’identifiant ou le mot de passe")
//   }