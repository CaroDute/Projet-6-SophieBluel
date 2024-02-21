//*****************/ GESTION DES WORKS /*****************//

// VARIABLES //
const urlWorks = 'http://localhost:5678/api/works'
const gallery = document.querySelector(".gallery")
const logout = document.querySelector(".logout")
const token = sessionStorage.getItem("token");
const projectDiv = document.querySelector(".project")

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

// Affichage des works dans le DOM 
async function processWorks() {
    const worksArray = await getWorks()
// Pour chaque itération work
    worksArray.forEach(work => {
        createWorks(work)
    })
}

    // Création des works dans le HTML 
    function createWorks(work) {
        // Création des figures où placer les images et titres
        const figure = document.createElement("figure")
        figure.id = `gallery-figure-${work.id}`
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


// Utilise les oeuvres récupérés
    processWorks()

 
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

    
    // On crée une div pour insérer les boutons
    let buttonDiv = document.createElement("div")
    buttonDiv.className = "button_container"
    // On insère la div au niveau de la div project
    projectDiv.insertAdjacentElement('afterend', buttonDiv)
    // Création du bouton "Tous"
    let buttonAllCategories = document.createElement("button")
    buttonDiv.appendChild(buttonAllCategories)
    buttonAllCategories.textContent = "Tous"
    buttonAllCategories.id = "0"
    

    // Pour chaque categorie on crée un bouton
    categoriesArray.forEach(category => {
    let buttonCategories = document.createElement("button")
    buttonCategories.className = "buttons"
    // On insère les boutons dans la div
     buttonDiv.appendChild(buttonCategories)
    // On insère le nom des catégories dans les boutons
    buttonCategories.textContent = category.name
    // On récupère l'id
    buttonCategories.id = category.id
})
filteredCategories()
getToken ()
}


async function filteredCategories () {
    // Récupération du tableau des works
    const worksArray = await getWorks()
    // On selectionne les boutons dans le DOM
    const buttons = document.querySelectorAll(".button_container button")
    // Pour chaque bouton on ajoute un addEventListener au click
    buttons.forEach((button) => {
        button.addEventListener('click', (event) => {
            // On récupère l'id du bouton cliqué
            const buttonId = event.target.id 
            // On vide la gallery avant de la filtrer
            gallery.innerHTML = ""
            // Si l'id est different de "0"
            if (buttonId !== "0") {
                // On crée un nouveau tableau et on filtre l'ancien
                const filteredWorks = worksArray.filter(element => {
                    // Condition : on les récupère si ID category = id button cliqué 
                    return element.categoryId == buttonId
                })
                // Pour chaque work filtrée on crée un élément dans la gallery
                filteredWorks.forEach((work) => {
                    createWorks(work)
                });
                // Sinon tout les works 
            }else {
                processWorks()
            } 
        })
    })        
}      

    const modifButton = document.createElement("button");
    projectDiv.appendChild(modifButton)
    modifButton.className = "modif-button"
    modifButton.innerHTML = '<i class="fa-regular fa-pen-to-square"></i> modifier'


function getToken () {
    const adminMode = document.querySelector(".admin-mode");
    const filterButton = document.querySelector(".button_container");
    if (token === null) {
        adminMode.remove()
        modifButton.remove()
        modal.remove()
        modal2.remove()
    } else {
        filterButton.style.visibility = "hidden";
        filterButton.classList.add("hidden_button")
        logout.innerHTML = 'logout'
    }
    }

    logout.addEventListener('click', logoutSession)

    function logoutSession (){
        sessionStorage.removeItem('token')
        location.reload()
    }
    

processCategories()

// Affichage de l'aperçu de l'image uploader

const inputPhoto = document.getElementById('add-input')
const image = document.getElementById('image')
const addButton = document.querySelector('.add-button')
const imgIcon = document.querySelector('.add-img i')
const sizeInfo = document.querySelector('.size-info')
const addLabel = document.querySelector('.add-label')

inputPhoto.onchange = function(event) {
    const file = event.target.files[0]
    const reader = new FileReader()

    const maxSize = 4 * 1024 * 1024
    const typeOfFile = ['image/jpeg', 'image/png']

    if (file.size > maxSize){
        alert('Le fichier ne doit pas dépassé 4Mo. Veuillez en selectionner un autre')
        inputPhoto.value = ''
        return
    }

    if (!typeOfFile.includes(file.type)) {
        alert("Le type de fichier sélectionné n'est pas le bon. Veuillez en selectionner un autre" )
        inputPhoto.value = ''
        return
    }

    reader.onload = function(e) {
        image.src = e.target.result
        image.style.display = 'block'
        imgIcon.style.display = 'none'
        sizeInfo.style.display = 'none'
        addButton.style.display = 'none'
    }

    reader.readAsDataURL(file)
}


