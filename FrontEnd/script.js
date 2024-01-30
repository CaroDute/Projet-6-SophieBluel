//*****************/ GESTION DES WORKS /*****************//

// URL de l'API WORKS
const urlWorks = 'http://localhost:5678/api/works'

// Fonction de récupération des works via l'API
async function getWorks () {
        // fetch pour requête GET à l'API
        const response = await fetch(urlWorks)

    if(response.ok) {
        const works = await response.json()
        return works 
    } else {
        // Si la requête pas ok, erreur
        console.error('erreur lors de la récupération des works', response.status)
    }
}
// Fonction de traitement des works
function processWorks(works) {
// Pour chaque itération work
    works.forEach(work => {
        getWorks()
        // Récupération de la div gallery
        let gallery = document.querySelector(".gallery")
        // Création des figures où placer les images et titres
        let figure = document.createElement("figure")
        gallery.appendChild(figure)
        // Création des img dans le HTML
        let workImage = document.createElement("img")
        // Création des légendes dans le HTML
        let workTitle = document.createElement("figcaption")
        // Récupération de la source des image
        workImage.src = work.imageUrl
        // Récupération des titres
        workTitle.innerText = work.title
        // Mise en place des images et des titres dans la div gallery
        figure.appendChild(workImage)
        figure.appendChild(workTitle)
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    // on stock les données au chargement de la page
    const works = await getWorks()
    // Utilise les oeuvres récupérés
    processWorks(works)
});


