// VARIABLES //
const modal = document.querySelector('.modal')
const modal2 = document.querySelector('.modal2')
const modalGallery = document.querySelector('.modal-gallery')
const buttonModif = document.querySelector('.modif-button')
const buttonClose = document.querySelectorAll('.xmark')
const buttonAdd = document.querySelector('.button-add-photo')
const buttonValidation = document.querySelector('.button-validation')
const titleInput = document.getElementById('title');
const titleValue = titleInput.value.trim();
const categorySelect = document.getElementById('categorie');
const imageInput = document.getElementById('add-input');

buttonAdd.addEventListener('click', openModal2)
buttonModif.addEventListener('click', openModal)

buttonClose.forEach(button => {
  button.addEventListener('click', closeModal)
})

processWorksModal()

// Fonction d'ouverture de la 1ère Modale
function openModal() {
  modal.style.visibility = "visible"
  if (modal2.style.visibility === "visible") {
    modal.style.visibility = "hidden"
  }
  buttonModif.style.visibility = 'hidden'
}

// Fonction d'ouverture de la 2ème Modale
function openModal2() {
  modal2.style.visibility = "visible"
  if (modal.style.visibility === "visible") {
    modal.style.visibility = "hidden";
  }
  if (titleValue === '' || categoryId === '' || !image) {
    buttonValidation.classList.add('button-validation-wait')
  }
  if (!categoriesProcess) {
    // Appel de la fonction pour récupérer les categories dans le formulaire
    processCategoriesModal()
  }
}

// Fonction de fermeture des Modales 
function closeModal() {
  modal.style.visibility = 'hidden'
  modal2.style.visibility = 'hidden'
  image.style.display = 'none'
  imgIcon.style.display = 'block'
  sizeInfo.style.display = 'block'
  addButton.style.display = 'flex'
  document.getElementById('categorie').value = 0
  buttonModif.style.visibility = 'visible'
}

// Fermeture des modales au clic à l'exterieur de celle-ci
window.addEventListener('click', function (e) {
  if (e.target === modal || e.target === modal2) {
    closeModal()
  }
})

/**************** MODALE 1 ****************/

// Fonction qui amène tout les travaux de la gallery dans la modale
async function processWorksModal() {
  const worksArray = await getWorks()
  worksArray.forEach(work => {
    createWorksModal(work)
  })
}

/* Création de la gallery dans la modale */
// Création des works dans la modale 
function createWorksModal(work) {
  const figure = document.createElement("figure")
  const workImage = document.createElement("img")

  figure.id = `figure-${work.id}`
  modalGallery.appendChild(figure)
  workImage.className = 'work-image'
  workImage.src = work.imageUrl
  figure.appendChild(workImage)

  // Création des corbeilles pour supprimer les travaux
  const trash = document.createElement('i')
  const trashBackground = document.createElement('span')
  trash.id = work.id
  trashBackground.className = 'trash-background'
  figure.appendChild(trashBackground)
  trash.className = 'trash fa-solid fa-trash-can'
  trashBackground.appendChild(trash)
}

/**************** MODALE 2 ****************/

// Fonction pour vérifier la validité de tous les champs dans la 2ème Modale
function checkFormValidity() {
  const titleValue = titleInput.value.trim();
  const selectedIndex = categorySelect.selectedIndex;
  const categoryId = categorySelect.options[selectedIndex].id;
  const image = imageInput.files[0];

  if (titleValue !== '' && categoryId !== '' && image) {
    buttonValidation.classList.remove('button-validation-wait');
  } else {
    buttonValidation.classList.add('button-validation-wait');
  }
}

// Écouter les événements de changement pour tous les champs
titleInput.addEventListener('keyup', checkFormValidity);
categorySelect.addEventListener('change', checkFormValidity);
imageInput.addEventListener('change', checkFormValidity);

// Appeler la fonction une fois pour initialiser la classe de validation
checkFormValidity();

let categoriesProcess = false
// Fonction pour récupérer les categories dans le formulaire
async function processCategoriesModal() {
  const categoriesArray = await getCategories()
  const categorie = document.getElementById('categorie')

  categoriesArray.forEach(category => {
    let optionCategories = document.createElement("option")
    categorie.appendChild(optionCategories)
    optionCategories.textContent = category.name
    optionCategories.id = category.id
  })
  categoriesProcess = true
}

buttonValidation.addEventListener('click', function () {
  postWorks()
})



function postWorks() {
  const image = document.getElementById('add-input').files[0]
  const title = document.getElementById('title').value
  const categorySelect = document.getElementById('categorie')
  const selectedIndex = categorySelect.selectedIndex
  const categoryId = categorySelect.options[selectedIndex].id

  let errorMessage = ''
  if (title === '') {
    errorMessage += 'Titre obligatoire, veuillez indiquer un titre.\n'
  }
  if (categoryId === '') {
    errorMessage += 'Catégorie obligatoire, veuillez indiquer une catégorie.\n'
  }

  if (!image) {
    errorMessage += 'Image obligatoire, veuillez uploader une image.\n'
  }

  if (errorMessage !== '') {
    alert(errorMessage)
    return
  }

  const formData = new FormData()
  formData.append("title", title)
  formData.append("image", image)
  formData.append("category", categoryId)

  const response = fetch(urlWorks, {
    method: 'POST',
    body: formData,
    headers: {
      'Authorization': `Bearer ${token}`,
      'accept': 'application/json',
    },
  })
    .then(response => {
      if (!response.ok) {
        throw new Error("Erreur lors de l'ajout du travail")
      }
      console.log('le travail a bien était posté')
      return response.json()
    })
    .then(data => {
      console.log("reponse de l'API:", data)
      addImgGallery(data.imageUrl, title, data)
      closeModal()
      addImgGalleryModal(data.imageUrl, data)
      resetForm()

    })
    .catch(error => {
      console.error('Erreur: ', error)
    })
}

function addImgGallery(imageUrl, title, data) {
  const imgElement = document.createElement('img')
  const figureElement = document.createElement('figure')
  const figCaption = document.createElement('figcaption')
  figureElement.id = `gallery-figure-${data.id}`
  gallery.appendChild(figureElement)
  imgElement.src = imageUrl
  figureElement.appendChild(imgElement)
  figCaption.innerText = title
  figureElement.appendChild(figCaption)
}

function addImgGalleryModal(imageUrl, data) {
  const imgElement = document.createElement('img')
  const figure = document.createElement("figure")
  figure.id = `figure-${data.id}`
  figure.appendChild(imgElement)
  modalGallery.appendChild(figure)
  imgElement.src = imageUrl
  imgElement.className = 'work-image'

  addBasketIcon(figure, data)
}

function addBasketIcon(figure, data) {
  let images = document.querySelectorAll('img.work-image')
  if (images) {
    images.forEach(image => {
      if (!image.nextElementSibling) {
        const trash = document.createElement('i')
        const trashBackground = document.createElement('span')
        trashBackground.className = 'trash-background'
        modalGallery.appendChild(figure)
        trash.className = 'trash fa-solid fa-trash-can'
        trashBackground.appendChild(trash)
        figure.appendChild(trashBackground)
        trash.id = data.id
      }
    })
  }
}

// Evenement pour la suppression des travaux au clic sur les corbeilles, dans la gallery principale et dans la modale 
document.addEventListener('click', function (event) {
  if (event.target.classList.contains('trash')) {
    const workId = event.target.id
    deleteWorks(workId)
  }
})

// Fonction pour supprimer des travaux dans la modale
function deleteWorks(workId) {
  fetch(`http://localhost:5678/api/works/${workId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Erreur lors de la suppression du travail')
      } else {
        console.log(`le travail ${workId} a été supprimé avec succès`)
        const workElementDelete = document.getElementById(`gallery-figure-${workId}`)
        const workElementDeleteModal = document.getElementById(`figure-${workId}`)
        workElementDelete.remove() // Rend dynamique la suppression des travaux dans la modale
        workElementDeleteModal.remove()
      }
    })
    .catch(error => {
      console.error('Erreur: ', error)
    })
}

// Fonction pour réinitialiser le formulaire après l'ajout d'un travail
function resetForm() {
  document.getElementById('title').value = '';
  document.getElementById('categorie').selectedIndex = 0;
  document.getElementById('add-input').value = '';
}