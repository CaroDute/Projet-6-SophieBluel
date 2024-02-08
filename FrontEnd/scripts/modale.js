const modal = document.querySelector('.modal')
const buttonModif = document.querySelector('.modif-button')
const modalGallery = document.querySelector('.modal-gallery')

buttonModif.addEventListener('click', openModal)

processWorks()




function openModal () {
  modal.style.visibility = "visible"
}

async function processWorks() {
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
  modalGallery.appendChild(figure)
  // Création des img dans le HTML
  const workImage = document.createElement("img")
  workImage.className = 'work-image'
  // Récupération de la source des image
  workImage.src = work.imageUrl
  // Mise en place des images et des titres dans la div gallery
  figure.appendChild(workImage)
  
  const trash = document.createElement('i')
  const trashBackground = document.createElement('span')
  trashBackground.className = 'trash-background'
  figure.appendChild(trashBackground)
  trash.innerHTML = '<i class="fa-solid fa-trash-can"></i>'
  trash.className = 'trash'
  trashBackground.appendChild(trash)
  
}
