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
}