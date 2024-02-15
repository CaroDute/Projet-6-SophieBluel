const modal = document.querySelector('.modal')
const modal2 = document.querySelector('.modal2')
const modalGallery = document.querySelector('.modal-gallery')
const buttonModif = document.querySelector('.modif-button')
const buttonClose = document.querySelectorAll('.xmark')
const buttonAdd = document.querySelector('.button-add-photo')
const buttonValidation = document.querySelector('.button-validation')


buttonAdd.addEventListener('click', openModal2)
buttonModif.addEventListener('click', openModal)

buttonClose.forEach(button => {
  button.addEventListener('click', closeModal)
})


processWorksModal()

window.addEventListener('click', function (e) {
  if (e.target === modal || e.target === modal2) {
    closeModal()
  }
})

  
function openModal () {
  modal.style.visibility = "visible"
  if (modal2.style.visibility === "visible"){
    modal.style.visibility = "hidden"
  }
}

function openModal2 () {
  modal2.style.visibility = "visible"
  if (modal.style.visibility === "visible") {
    modal.style.visibility = "hidden";
  }
  if (titleValue === '') {
  buttonValidation.classList.add('button-validation-wait')
  }
}

  const titleInput = document.getElementById('title');
  const titleValue = titleInput.value.trim()

  titleInput.addEventListener('keyup', function () {
    const titleValue = titleInput.value.trim()
    if (titleValue !== '') {
  buttonValidation.classList.remove('button-validation-wait')
  } if (titleValue === '') {
    buttonValidation.classList.add('button-validation-wait')
    }
  })
  



function closeModal () {
  modal.style.visibility = 'hidden'
  modal2.style.visibility = 'hidden'
  image.style.display = 'none'
  imgIcon.style.display = 'block'
  sizeInfo.style.display = 'block'
  addButton.style.display = 'flex'
  document.getElementById('categorie').value = 0
}

async function processWorksModal() {
  const worksArray = await getWorks()
// Pour chaque itération work
  worksArray.forEach(work => {
      createWorksModal(work)
  })
}



/* Création de la gallery dans la modale */
 // Création des works dans la modale 
function createWorksModal(work) {
  // Création des figures où placer les images et titres
  const figure = document.createElement("figure")
  figure.id = `figure-${work.id}`
  modalGallery.appendChild(figure)
  // Création des img dans le HTML
  const workImage = document.createElement("img")
  workImage.className = 'work-image'
  // Récupération de la source des image
  workImage.src = work.imageUrl
  // Mise en place des images et des titres dans la div gallery
  figure.appendChild(workImage)
  const trash = document.createElement('i')
  trash.id = work.id
  const trashBackground = document.createElement('span')
  trashBackground.className = 'trash-background'
  figure.appendChild(trashBackground)
  trash.className = 'trash fa-solid fa-trash-can'
  trashBackground.appendChild(trash)
 
}



document.addEventListener('click', function(event) {
  if (event.target.classList.contains('trash')) {
  const workId = event.target.id
    deleteWorks(workId)
    deleteWorksGallery (workId)
  }
})


function deleteWorks (workId) {

  fetch (`http://localhost:5678/api/works/${workId}`, {
    method: 'DELETE',
    headers: {
      'Authorization':`Bearer ${token}`,
      'Content-Type':'application/json'
    },
  })
  .then(response => {
    if(!response.ok) {
      throw new Error('Erreur lors de la suppression du travail')
    } else {
      console.log(`le travail ${workId} a été supprimé avec succès`)
      const workElementDelete = document.getElementById(`figure-${workId}`)
      workElementDelete.remove()
    }
  })
  .catch(error => {
    console.error('Erreur: ', error)
  })
}

async function processCategoriesModal () {
  const categoriesArray = await getCategories()
  const categorie = document.getElementById('categorie')

  categoriesArray.forEach(category => {
      let optionCategories = document.createElement("option")
      categorie.appendChild(optionCategories)
      optionCategories.textContent = category.name
      optionCategories.id = category.id
  })
}

processCategoriesModal()


buttonValidation.addEventListener('click', function () {
  postWorks ()
})

function postWorks () {
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

  
 
  const response = fetch (urlWorks, {
      method: 'POST',
      body: formData,
      headers: {
          'Authorization' :`Bearer ${token}`,
          'accept' : 'application/json',
      },
  })
  .then(response => {
      if (!response.ok){
      throw new Error ("Erreur lors de l'ajout du travail")
  }
      console.log ('le travail a bien était posté')
      return response.json()
})
  .then(data => {
      console.log("reponse de l'API:", data) 
      addImgGallery(data.imageUrl, title)
      addImgGalleryModal (data.imageUrl)
     
  })
.catch (error => {
  console.error('Erreur: ', error)
})
}




function addImgGallery (imageUrl, title) {
  const imgElement = document.createElement('img')
  const figureElement = document.createElement('figure')
  gallery.appendChild(figureElement)
  imgElement.src = imageUrl
  figureElement.appendChild(imgElement)
  const figCaption = document.createElement('figcaption')
  figCaption.innerText = title 
  figureElement.appendChild(figCaption)
}

function addImgGalleryModal (imageUrl) {
  const imgElement = document.createElement('img')
  modalGallery.appendChild(imgElement)
  imgElement.src = imageUrl
  imgElement.className = 'work-image'

  // const trash = document.createElement('i')
  // const trashBackground = document.createElement('span')
  // trashBackground.className = 'trash-background'
  // modalGallery.appendChild(trashBackground)
  // trash.className = 'trash fa-solid fa-trash-can'
  // trashBackground.appendChild(trash)

}


