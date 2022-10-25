const searchParams = new URLSearchParams(location.search)
const photographerId = +searchParams.get('id')
let photographer

//get the datas from json
;
(async() => {
    try {
        const response = await fetch('./data/photographers.json')
        const data = await response.json()

        photographer = data.photographers.find((photographer) => photographer.id === photographerId)

        fillHeader(photographer)
    } catch (error) {
        console.error(error)
        const errorElement = document.createElement('h2')
        errorElement.classList.add('photographers_error')
        errorElement.textContent = 'Une erreur est survenue.'
        main.appendChild(errorElement)
    }
})()
//fin de get the datas from json

//fotographer informations
function fillHeader(photographer) {
    const { name, city, country, tagline, portrait } = photographer
    const nameElement = document.querySelector('.photograph_infos > h1')
    const locationElement = document.querySelector('.photograph_infos > p:nth-child(2)')
    const taglineElement = document.querySelector('.photograph_infos > p:last-child')

    nameElement.textContent = name
    locationElement.textContent = city + ', ' + country
    taglineElement.textContent = tagline

    const header = document.querySelector('.photograph-header')
    const image = document.createElement('img')

    image.src = `./assets/photographers/${portrait}`
    image.alt = photographer.name

    header.appendChild(image)
}