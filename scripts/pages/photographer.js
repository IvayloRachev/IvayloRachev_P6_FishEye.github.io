const  searchParams = new URLSearchParams(location.search)
const photographerId = +searchParams.get('id')
let photographer
let medias
const media_modal = document.getElementById('media_modal')
const contact_modal = document.getElementById('contact_modal')
const main = document.getElementById('main')
const orderSelect = document.getElementById('orderSelect')
const photograph_medias = document.getElementById('photograph_medias')
const likes = []


//API fetch
;(async () => {
    try {
        const response = await fetch('./data/photographers.json')
		const data = await response.json()

        photographer = data.photographers.find((photographer) => photographer.id === photographerId)
		medias = data.media.filter((media) => media.photographerId === photographerId)
		photograph_medias.style.gridTemplateRows = 'repeat(' + Math.ceil(medias.length / 3) + ', 400px)'

        photographerHeader(photographer)
		likesPrice(medias, photographer.price)
		orderMedias(photographer)
		addEventListener('keydown', (e) => {
			if (media_modal.style.display && media_modal.style.display !== 'none') {
				if (e.code === 'ArrowLeft') {
					return changeMedia('left')
				}
				if (e.code === 'ArrowRight') {
					return changeMedia('right')
				}
				if (e.code === 'Escape') {
					return closeMediaModal()
				}
			}
			if (contact_modal.style.display && contact_modal.style.display !== 'none') {
				if (e.code === 'Escape') {
					contact_modal.style.display = 'none'
				}
			}
		})
		orderSelect.onchange = ({target: {value}}) => orderMedias(photographer, value)

		const contactTitle = document.querySelector('#contact_modal h2')
		contactTitle.textContent += ' ' + photographer.name
    }catch (error) {
        console.error(error)
        const errorElement = document.createElement('h2')
        errorElement.classList.add('photographers_error')
        errorElement.textContent = "Une erreur est survenue."
        main.appendChild(errorElement)
    }
})()
//fin de API fetch

//photographer informations
function photographerHeader(photographer) {
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

//display all likes and price
function likesPrice(medias, price) {
	const element = document.querySelector('.photograph_likeprice')
	element.children[1].setAttribute('aria-label', price + '€ par jour')

	element.children[0].textContent = medias.reduce((sum, media) => sum + media.likes, 0) + ' ♥'
	element.children[1].textContent = price + '€ / jour'
}
//fin de display all likes and price

//display the medias and display modal
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
		const btnLike = document.createElement('button')
		btnLike.setAttribute('aria-label', "bouton j'aime")

		article.dataset.id = media.id
		link.href = '#'
		mediaElement.src = `./assets/images/${photographer.name}/${media.video ?? media.image}`
		mediaElement.alt = media.title
		mediaElement.controls = false
		mediaElement.autoplay = false

		spanName.textContent = media.title
		btnLike.textContent = media.likes + ' ♥'
		btnLike.classList.add('like')
		btnLike.onclick = ({target}) => {
			if (likes.includes(media.id)) {
				return console.log('Ok')
			}

			const totalLikesElement = document.querySelector('.photograph_likeprice > span:first-child')

			totalLikesElement.textContent = parseInt(totalLikesElement.textContent) + 1 + ' ♥'
			target.textContent = parseInt(target.textContent) + 1 + ' ♥'
			likes.push(media.id)
		}

		//display modal
		link.onclick = (event) => {
			event.preventDefault()
			if (event.target.classList.contains('like')) return
			media_modal.children[media_modal.children.length - 1].appendChild(mediaElement.cloneNode())
			media_modal.children[media_modal.children.length - 1].children[0].controls = true
			media_modal.children[media_modal.children.length - 1].appendChild(spanName.cloneNode(true))
			media_modal.style.display = 'inherit'
			document.body.style.overflow = 'hidden'
		}
		//fin de display modal

		spanLike.appendChild(btnLike)
		link.appendChild(article)
		article.appendChild(mediaElement)
		article.appendChild(divInfos)
		divInfos.appendChild(spanName)
		divInfos.appendChild(spanLike)
		mediasSection.appendChild(link)
	}
}
//fin de display the medias and display modal

//order medias
function orderMedias (photographer, orderBy = 'pop') {
	switch (orderBy) {
		case 'pop': {
			medias.sort((a, b) => b.likes - a.likes)
			break
		}
		case 'date': {
			medias.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
			break
		}
		case 'title': {
			medias.sort((a, b) => a.title.localeCompare(b.title))
			break
		}
	}
	displayMedias(photographer, medias)
}
//fin de order medias

//use medias mouse or key
function changeMedia(direction) {
	const media = media_modal.children[media_modal.children.length - 1].children[0]
	media_modal.children[media_modal.children.length - 1].children[1].remove()
	const mediaSrc = media.src.split('/').pop()
	const mediaIndex = medias.indexOf(medias.find((el) => (el.video ?? el.image) === mediaSrc))
	media.remove()
	let newIndex = direction === 'left' ? mediaIndex - 1 : mediaIndex + 1

	if (newIndex < 0) {
		newIndex = medias.length - 1
	} else if (newIndex >= medias.length) {
		newIndex = 0
	}

	const mediaElement = medias[newIndex].video ? document.createElement('video') : document.createElement('img')
	const spanName = document.createElement('span')

	mediaElement.src = `./assets/images/${photographer.name}/${medias[newIndex].video ?? medias[newIndex].image}`
	mediaElement.alt = medias[newIndex].title
	spanName.textContent = medias[newIndex].title

	media_modal.children[media_modal.children.length - 1].appendChild(mediaElement)
	media_modal.children[media_modal.children.length - 1].appendChild(spanName)
}
//fin de use medias mouse or key

//close lightbox (media modal)
function closeMediaModal() {
	media_modal.children[media_modal.children.length - 1].innerHTML = ''
	media_modal.style.display = 'none'
	document.body.style.overflow = 'auto'
}
//fin de close lightbox (media modal)