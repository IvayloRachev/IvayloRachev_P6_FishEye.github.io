class Lightbox {
    constructor() {
        this.listMedias = [];
        this.index = 0;
        this.onKeyup();
        const next = document.querySelector(".lightbox_next");
        next.addEventListener("click", () => {
            this.next();
        });
        const prev = document.querySelector(".lightbox_prev");
        prev.addEventListener("click", () => {
            this.prev();
        });
        const close = document.querySelector(".lightbox_close");
        close.addEventListener("click", () => {
            this.close();
        });
    }

    displayMedia() {
        const main = document.getElementById("main");
        const lightbox = document.getElementById("lightbox");
        const lightboxClose = document.querySelector(".lightbox_close");
        main.setAttribute("aria-hidden", "true");
        lightbox.setAttribute("aria-hidden", "false");
        lightboxClose.focus();
        if (this.listMedias[this.index].image) {
            const img = this.listMedias[this.index].image;
            const lightbox = document.querySelector("#lightbox");
            const container_img = document.querySelector(".lightbox_container");
            const photo = document.createElement("img");
            photo.setAttribute("src", "./assets/images/" + img);
            let the_title = this.listMedias[this.index].title;
            let title_photo = document.getElementById("titre_photo");
            photo.setAttribute("alt", the_title);
            title_photo.innerHTML = the_title;
            if (container_img.firstChild != null) {
                container_img.removeChild(container_img.firstChild);
            }
            container_img.appendChild(photo);
            lightbox.style.display = "block";
        }else {
            const video = this.listMedias[this.index].video;
            const lightbox = document.querySelector("#lightbox");
            const container_img = document.querySelector(".lightbox_container");
            const the_video = document.createElement("video");
            the_video.controls = true;
            const s_video = document.createElement("source");
            s_video.setAttribute("src", "./assets/images/" + video);
            s_video.setAttribute("type", "video/mp4");
            the_video.appendChild(s_video);
            let the_title = this.listMedias[this.index].title;
            let title_photo = document.getElementById("titre_photo");
            title_photo.innerHTML = the_title;
            if (container_img.firstChild != null) {
                container_img.removeChild(container_img.firstChild);
            }
            container_img.appendChild(the_video);
            the_video.play();
            lightbox.style.display = "block";
        }
    }
    
    play(position) {
        this.index = position;
    }
}