//function to create and display the photographers informations on index page
function photographerFactory(data) {
    const { id, name, portrait, tagline, city, country, price } = data

    const picture = `assets/photographers/${portrait}`

    function getUserCardDOM() {
        const article = document.createElement('article')
        let href = './photographer.html?id=' + id

        article.innerHTML =
            `<a href="${href}" aria-label="${name}">
                <img class="profil" src="${picture}" alt="photo du profil de ${name}">
                <h2 class="name">${name}</h2>
            </a>
            <div role="presentation" aria-label="informations photographes" tabindex="0">
                <p tabindex="0">${city}, ${country}</p>
                <p tabindex="0">${tagline}</p>
                <p tabindex="0" aria-label="${price} € par jour">${price} €/jour</p>
            </div>`

        return (article);
    }
    return { getUserCardDOM }
}
photographerFactory
//fin de function to create and display the photographers informations on index page