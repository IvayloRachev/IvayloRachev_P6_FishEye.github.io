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

//photographer informations
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
//fin de photographer informations

//display medias
function displayMedias(photographer, medias) {
    const mediasSection = document.getElementById('photograph_medias')
    mediasSection.innerHTML = ''

    for (const media of medias) {
        const article = document.createElement('article')
        const link = document.createElement('a')
        const mediaElement = media.video ? document.createElement('video') : document.createElement('img')
        const divInfos = document.createElement('div')
        const spanName = document.createElement('span')
        const spanLike = document.createElement('span')

        article.dataset.id = media.id
        link.href = '#'
        mediaElement.src = `./assets/images/${photographer.name}/${media.video ?? media.image}`
        mediaElement.alt = media.title
        mediaElement.controls = false
        mediaElement.autoplay = false

        spanName.textContent = media.title
        spanLike.textContent = media.likes + ' ♥'
        spanLike.classList.add('like')
        spanLike.onclick = ({ target }) => {
            if (likes.includes(media.id)) {
                return console.log('Pouet')
            }

            const totalLikesElement = document.querySelector('.photograph_likeprice > span:first-child')

            totalLikesElement.textContent = parseInt(totalLikesElement.textContent) + 1 + ' ♥'
            target.textContent = parseInt(target.textContent) + 1 + ' ♥'
            likes.push(media.id)
        }
        link.appendChild(article)
        article.appendChild(mediaElement)
        article.appendChild(divInfos)
        divInfos.appendChild(spanName)
        divInfos.appendChild(spanLike)
        mediaSection.appendChild(link)
    }
}