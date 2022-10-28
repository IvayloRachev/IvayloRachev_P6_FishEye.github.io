//images factory
class Images {
    constructor(data){
        this.title = data.title;
        this.likes = data.likes;
        this.image = data.image;
        this.price = data.price;
        this.date = data.date;
        this.liked = false;
    }

    getImageCardDOM() {
        const divImgContent = document.createElement('div');

        const picture = `./assets/images/${this.image}`;
        const linkPicture = document.createElement('a');

        const img = document.createElement('img');
        img.setAttribute('src', picture);
        img.className = "media_photographe";
        img.setAttribute('alt', this.title);
        linkPicture.appendChild(img);
        divImgContent.appendChild(linkPicture);

        const titleMedia = document.createElement('div');
        const h3 = document.createElement('h3');
        h3.className = "titreMedia";
        h3.textContent = this.title;
        titleMedia.appendChild(h3);
        divImgContent.appendChild(titleMedia);

        const likeMedia = document.createElement('div');
        likeMedia.id = "mediaLike";
        let totalLike = document.createElement('p');
        const iconHeart = document.createElement('i');
        iconHeart.className = "fas fa-heart";
        iconHeart.setAttribute("title", "nombre de likes");
        totalLike.textContent = this.likes;
        totalLike.className = "total_like";
        iconHeart.addEventListener("click", function (e) {
            e.preventDefault();
            let increment_total_like = document.getElementById("all_likes");
            if (this.liked) {
                parseInt(totalLike.innerHTML--);
                parseInt(increment_total_like.innerHTML--);
            }else {
                parseInt(totalLike.innerHTML++);
                parseInt(increment_total_like.innerHTML++);
            }
            this.liked = !this.liked;
        });
        likeMedia.appendChild(totalLike);
        likeMedia.appendChild(iconHeart);

        divImgContent.appendChild(likeMedia);
        return divImgContent;
    }
}
//fin de images factory