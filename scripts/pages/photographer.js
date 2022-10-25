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