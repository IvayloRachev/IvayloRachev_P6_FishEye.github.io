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

/////////////////////////////////////////////////////////////////////////////////////////////////////////

//images factory
function images(data) {
    const { title, likes, image, price, date, liked = false } = data

    function getImageCardDOM() {
        const divImgContent = document.createElement('div')

        const picture = `./assets/images/${image}`
        const img = document.createElement('img')
        img.setAttribute('src', picture)
        img.className = "media_photographe"
        img.setAttribute('alt', title)
        linkPicture.appendChild(img)
        divImgContent.appendChild(linkPicture)

        const titleMedia = document.createElement('div')
        const h3 = document.createElement('h3')
        h3.className = "titreMedia"
        h3.textContent = title
        titleMedia.appendChild(h3)
        divImgContent.appendChild(titleMedia)

        const likeMedia = document.createElement('div')
        likeMedia.id = 'mediaLike'
        let totalLike = document.createElement('p')
        const iconHeart = document.createElement('i')
        iconHeart.className = "fas fa-heart"
        iconHeart.setAttribute('title', "nombre de likes")
        totalLike.textContent = likes
        totalLike.className = "total_like"
        iconHeart.addEventListener("click", function(e) {
            e.preventDefault()
            let increment_total_like = document.getElementById('all_likes')
            if (liked) {
                parseInt(totalLike.innerHTML--)
                parseInt(increment_total_like.innerHTML--)
            } else {
                parseInt(totalLike.innerHTML++)
                parseInt(increment_total_like.innerHTML++)
            }
            liked = !liked
        })
        likeMedia.appendChild(totalLike)
        likeMedia.appendChild(iconHeart)

        divImgContent.appendChild(likeMedia)
        return divImgContent
    }
}
//fin de images factory

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

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