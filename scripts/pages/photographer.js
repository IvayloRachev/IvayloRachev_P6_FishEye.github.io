// get the datas from json
let urlPhotographer = window.location.search;
let searchParams = new URLSearchParams(urlPhotographer);
let id = searchParams.get('id');
let url_photographer = "../../data/photographer.json";
let lightbox = new Lightbox();
let likeArray = [];
let pricePhotographe = 0;

fetch(url_photographer)
    .then((response) => {
        return response.json();
    })
//fin de get the datas from json

//display photographer informations
.then((data) =>{
    for (i = 0; i < data.photographer.length; i++) {
        if (id == data.photographer[i].id) {
            const photographer = data.photographer[i];
            const profilHeader = document.getElementById("profil");
            const imgProfil = document.createElement('div');
            imgProfil.innerHTML = `<img class ="imgProfil" src ="./assets/photographers/${photographer.portrait}" alt="photo du photographe" >`;
            const profil = document.createElement('div');
            profil.id = "my_profil";
            profil.innerHTML = `
            <h1>${photographer.name}</h1> <br>
            <h2>${photographer.city}, ${photographer.country}</h2> <br>
            <p>${photographer.tagline}</p>`;
            
            pricePhotographe = photographer.price;
            profilHeader.after(profil);
            profilHeader.appendChild(imgProfil);
        }
    } 
})