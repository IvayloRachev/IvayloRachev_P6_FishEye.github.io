//function open modal
function displayModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "block";
}
//fin de function open modal

//function close modal
function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}
//fin de fonction close modal

//function send message and display infos in console.log
function sendMessage(event) {
    event.preventDefault()
    for (const element of event.target.elements) {
        if (element.tagName.toLowerCase() === "input" || element.tagName.toLowerCase() === "textarea") {
            console.log(element.value)
            element.value = ''
        }
    }
}
//fin de function send message and display infos in console.log