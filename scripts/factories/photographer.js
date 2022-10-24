//function to create and display the photographers informations on index page
function photographerFactory(data) {
    const { id, name, portrait, tagline, city, country, price } = data

    const picture = `assets/photographers/${portrait}`

    function getUserCardDOM() {
        const article = document.createElement('article')
        const link = document.createElement('a')

        link.href = './photographer.html?id=' + id
        link.ariaLabel = name

        const img = document.createElement('img')

        img.setAttribute("src", picture)
        img.alt = 'Photo du profil de ' + name

        const h2 = document.createElement('h2')

        h2.textContent = name

        article.appendChild(link)
        link.appendChild(img)
        link.appendChild(h2)

        const div = document.createElement('div')
        const locationInfos = document.createElement('p')
        const tagLineInfos = document.createElement('p')
        const priceInfos = document.createElement('p')

        locationInfos.textContent = city + ', ' + country
        tagLineInfos.textContent = tagline
        priceInfos.textContent = price + '€/jour'

        div.appendChild(locationInfos)
        div.appendChild(tagLineInfos)
        div.appendChild(priceInfos)
        article.appendChild(div)

        return (article);
    }
    return { getUserCardDOM }
}
//fin de function to create and display the photographers informations on index page