    // get the datas from json
    async function getPhotographers() {
        try {
            const response = await fetch('./data/photographers.json')
            const data = await response.json()
            return data
        } catch (error) {
            console.error(error)
            const errorElement = document.createElement('h2')
            errorElement.classList.add('photographers_error')
            errorElement.textContent = 'Une erreur est survenue.'
            main.appendChild(errorElement)
            return { photographers: [] }
        }
    }
    // fin get the datas from json

    //to display photographer informations
    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {
            const photographerModel = photographerFactory(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });
    };
    //fin to display photographer informations

    //take photographers datas
    async function init() {
        const { photographers } = await getPhotographers();
        displayData(photographers);
    };

    init();
    //fin de take photographers datas