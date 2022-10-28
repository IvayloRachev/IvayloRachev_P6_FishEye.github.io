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

/////////////////////////////////////////////////////////////////////////////////////////////////////////

//vidéos factory
function videos(data) {
    const { title, likes, video, price, date, liked = false } = data

    function getVideoCardDOM() {
        const divVideoContent = document.createElement('div')

        const video = `./assets/images/${video}`
        const linkVideo = document.createElement('a')

        const play = document.createElement('i')
        play.className = "fas fa-play-circle"
        play.setAttribute('title', "icone lecteur video")
        play.id = "play"
        linkVideo.appendChild(play)

        const videoContent = document.createElement('video')
        videoContent.className = "media_photographe"
        const sourceVideo = document.createElement('source')
        videoContent.appendChild(sourceVideo)
        sourceVideo.setAttribute('src', video)
        sourceVideo.setAttribute('type', "video/mp4")
        videoContent.appendChild(sourceVideo)
        linkVideo.appendChild(videoContent)
        divVideoContent.appendChild(linkVideo)

        const titleVideo = document.createElement('div')
        const h3 = document.createElement('h3')
        h3.className = "titreMedia"
        h3.textContent = title
        titleVideo.appendChild(h3)
        divImgContent.appendChild(titleVideo)

        const likeVideo = document.createElement('div')
        likeVideo.id = "mediaLike"
        const allLikes = document.createElement('p')
        const iconHeart = document.createElement('i')
        allLikes.textContent = likes
        allLikes.className = "total_like"
        iconHeart.className = "fas fa-heart"
        iconHeart.setAttribute('title', "nombre de likes")
        iconHeart.addEventListener("click", function(e) {
            e.preventDefault()
            let increment_total_like = document.getElementById('all_likes')
            if (liked) {
                parseInt(allLikes.innerHTML--)
                parseInt(increment_total_like.innerHTML--)
            } else {
                parseInt(allLikes.innerHTML++)
                parseInt(increment_total_like.innerHTML++)
            }
            liked = !liked
        })
        likeVideo.appendChild(allLikes)
        likeVideo.appendChild(iconHeart)

        divVideoContent.appendChild(likeVideo)
        return divVideoContent
    }
}
//fin de vidéos factory

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

//media factory
function mediaFactory(data, type) {
    if (type == "image") {
        return new images(data)
    } else if (type == "video") {
        return new videos(data)
    } else {
        throw "Unknown type"
    }
}
//fin de media factory

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

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