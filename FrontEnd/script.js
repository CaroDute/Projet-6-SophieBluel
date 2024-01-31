//*****************/ VARIABLES /*****************//


//*****************/ GESTION DES WORKS /*****************//

// URL de l'API WORKS
const urlWorks = 'http://localhost:5678/api/works'


// Fonction de récupération des works via l'API
async function getWorks () {
        // fetch pour requête GET à l'API
        const response = await fetch(urlWorks)

    if(response.ok) {
        return await response.json()
    } else {
        // Si la requête pas ok, erreur
        console.error('erreur lors de la récupération des works', response.status)
    }
}
 
// Fonction de traitement des works
async function processWorks() {
    const worksArray = await getWorks()
// Pour chaque itération work
    worksArray.forEach(work => {
        createWorks(work)
    })
}

function createWorks(work) {
        // Création des figures où placer les images et titres
        const figure = document.createElement("figure")
        const gallery = document.querySelector(".gallery")
        gallery.appendChild(figure)
        // Création des img dans le HTML
        const workImage = document.createElement("img")
        // Création des légendes dans le HTML
        const workTitle = document.createElement("figcaption")
        // Récupération de la source des image
        workImage.src = work.imageUrl
        // Récupération des titres
        workTitle.innerText = work.title
        // Mise en place des images et des titres dans la div gallery
        figure.appendChild(workImage)
        figure.appendChild(workTitle)
    }



document.addEventListener('DOMContentLoaded', async () => {
    // on stock les données au chargement de la page
    worksArray = await getWorks()
    // Utilise les oeuvres récupérés
    processWorks()
});


//*****************/ GESTION DES CATEGORIES /*****************//

// URL DE L'API CATEGORIES
const urlCategories = 'http://localhost:5678/api/categories'

// Fonction de récupération des categories via l'API
async function getCategories(){
  // Récupération des categories dans l'API
  const response = await fetch(urlCategories)

  // Si récupération ok alors ...
  if (response.ok) {
      return await response.json()
  } else {
      console.error("erreur lors de la récupération : ", response.status)
  }
}

// Fonction de traitement des categories
async function processCategories () {
    const categoriesArray = await getCategories()

    // On récupère le deuxième h2
    const portfolio = document.querySelectorAll("h2")[1]
    // On crée une div pour insérer les boutons
    let buttonDiv = document.createElement("div")
    buttonDiv.className = "button_container"
    // On insère la div au niveau du H2
    portfolio.appendChild(buttonDiv)
    // Création du bouton "Tous"
    let buttonAllCategories = document.createElement("button")
    buttonDiv.appendChild(buttonAllCategories)
    buttonAllCategories.textContent = "Tous"
    buttonAllCategories.id = "0"
    

    // Pour chaque categorie on crée un bouton
    categoriesArray.forEach(category => {
    let buttonCategories = document.createElement("button")
    // On insère les boutons dans la div
     buttonDiv.appendChild(buttonCategories)
    // On insère le nom des catégories dans les boutons
    buttonCategories.textContent = category.name
    buttonCategories.id = category.id
    buttonCategories.name = category.name
})

filteredCategories()

}

document.addEventListener('DOMContentLoaded', async () => {
categoriesArray = await getCategories();
processCategories()
});

async function filteredCategories () {
    const worksArray = await getWorks()
    const buttons = document.querySelectorAll(".button_container button")
    buttons.forEach(button => {
        button.addEventListener('click', (workId) => {
            const buttonId = workId.target.id 
            const gallery = document.querySelector(".gallery")
            gallery.innerHTML = ""
            if (buttonId !== "0") {
                const filteredWorks = worksArray.filter(work => {
                    return work.categoryId == buttonId
                })
                filteredWorks.forEach(work => {
                    createWorks(work)
                });
            }else {
                processWorks()
            } 
        })
    })        
}        
    

