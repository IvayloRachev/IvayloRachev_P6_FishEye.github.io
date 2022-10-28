const searchParams = new URLSearchParams(location.search)
const photographerId = +searchParams.get('id')
let photographer
let lightbox = new lightbox()
let likeArray = []
let pricePhotographe = 0

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
function displayMedia() {
    for (let i = 0; i < lightbox.listMedias.lenght; i++) {
        const media = lightbox.listMedias[i];
        if (media.image) {
            let type = "image";
            const mediaContent = getElementById("photographeMedia");
            const mediaModel = new mediaFactory(media, type);
            const mediaCardDom = mediaModel.getCardDOM();
            mediaContent.appendChild(mediaCardDom);
            mediaCardDom.firstChild.addEventListener("click", function(e) {
                e.preventDefault();
                lightbox.play(i);
                lightbox.displayMedia();
            });
        } else {
            let type = "video";
            const mediaContent = document.getElementById('photgrapheMedia');
            const videoModel = new mediaFactory(media, type);
            const videoCardDom = videoModel.getVideoCardDOM();
            mediaContent.appendChild(videoCardDom);
            videoCardDom.firstChild.addEventListener("click", function(e) {
                e.preventDefault();
                lightbox.play(i);
                lightbox.displayMedia();
            })
        }
    }
}