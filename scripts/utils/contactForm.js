//function open modal
function displayModal() {
    const modal = document.getElementById("contact_modal");
    //const main = document.querySelector('#main');
    //const header = document.querySelector('#header');
    modal.style.display = "block";
    modal.setAttribute('aria-hidden', 'false');
   // main.setAttribute('aria-hidden', 'true');
	//header.setAttribute('aria-hidden', 'true');
}
//fin de function open modal

//function close modal
function closeModal() {
    const modal = document.getElementById("contact_modal");
    //const main = document.querySelector('#main');
    //const header = document.querySelector('#header');
    modal.style.display = "none";
    modal.setAttribute('aria-hidden', 'true');
    //main.setAttribute('aria-hidden', 'false');
	//header.setAttribute('aria-hidden', 'false');
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