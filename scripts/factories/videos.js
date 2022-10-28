//vidéos factory
class Videos {
    constructor(data){
        this.title = data.title;
        this.likes = data.likes;
        this.video = data.video;
        this.price = data.price;
        this.date = data.date;
        this.liked = false;
    }
    getVideoCardDOM() {
        const divVideoContent = document.createElement('div');

        const video = `./assets/images/${this.video}`;
        const linkVideo = document.createElement('a');

        const play = document.createElement('i');
        play.className = "fas fa-play-circle";
        play.setAttribute("title", "lecteur video");
        play.id = "play";
        linkVideo.appendChild(play);

        const videoContent = document.createElement('video');
        videoContent.className = "media_photographe";
        const sourceVideo = document.createElement('source');
        videoContent.appendChild(sourceVideo);
        sourceVideo.setAttribute("src", video);
        sourceVideo.setAttribute("type", "video/mp4");
        videoContent.appendChild(sourceVideo);
        linkVideo.appendChild(videoContent);
        divVideoContent.appendChild(linkVideo);

        const titleVideo = document.createElement('div');
        const h3 = document.createElement('h3');
        h3.className = "titreMedia";
        h3.textContent = this.title;
        titleVideo.appendChild(h3);
        divVideoContent.appendChild(titleVideo);

        const likeVideo = document.createElement('div');
        likeVideo.id = "mediaLike";
        const allLikes = document.createElement('p');
        const iconHeart = document.createElement('i');
        allLikes.textContent = this.likes;
        allLikes.className = "total_like";
        iconHeart.className = "fas fa-heart";
        iconHeart.setAttribute("title", "nombre de likes");
        iconHeart.addEventListener("click", function (e) {
            e.preventDefault();
            let increment_total_like = document.getElementById("all_likes");
            if (this.liked) {
                parseInt(allLikes.innerHTML--);
                parseInt(increment_total_like.innerHTML--);
            }else {
                parseInt(allLikes.innerHTML++);
                parseInt(increment_total_like.innerHTML++);
            }
            this.liked = !this.liked;
        });
        likeVideo.appendChild(allLikes);
        likeVideo.appendChild(iconHeart);

        divVideoContent.appendChild(likeVideo);
        return divVideoContent;
    }
}
//fin de vidéos factory