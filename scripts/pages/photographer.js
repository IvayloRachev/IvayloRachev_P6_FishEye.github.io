const searchParams = new URLSearchParams(location.search)
const photographerId = +searchParams.get('id')
let orderBy = 'pop'
let photographer
let medias
const likes = []

//API fetch
;(async () => {
    try {
        const response = await fetch('./data.photographers.json')
        const data = await response.json()

        photographer = data.photographers.find((photographer) => photographer.id === photographerId)
    }catch (error) {
        console.error(error)
        const errorElement = document.createElement('h2')
        errorElement.classList.add('photographers_error')
        errorElement.textContent = "Une erreur est survenue."
        main.appendChild(errorElement)
    }
})()
//fin de API fetch