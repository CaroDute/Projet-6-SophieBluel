const modal = document.querySelector('.modal')
const modalGallery = document.querySelector('.modal-gallery')
const buttonModif = document.querySelector('.modif-button')
const buttonClose = document.querySelector('.xmark')




buttonModif.addEventListener('click', openModal)
buttonClose.addEventListener('click', closeModal)


processWorksModal()

window.addEventListener('click', function (e) {
  if (e.target === modal) {
    closeModal()
  }
})

  
function openModal () {
  modal.style.visibility = "visible"
}

function closeModal () {
  modal.style.visibility = 'hidden'
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


  

