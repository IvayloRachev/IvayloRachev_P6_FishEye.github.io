const modal = document.getElementById("contact_modal");
const closeTheModal = document.getElementById('closeModal');

//function open modal
function displayModal() {
    const modal = document.getElementById('contact_modal');
    const main = document.querySelector('#main');
    const header = document.querySelector('#header');

    modal.style.display = "block";
    modal.setAttribute('aria-hidden', 'false');
    main.setAttribute('aria-hidden', 'true');
	header.setAttribute('aria-hidden', 'true');
    let focusableElements = modal.querySelectorAll('input:not([disabled]), textarea:not([disabled]), button, [aria-label="Fermez le formulaire de contact"]');
    focusableElements = Array.prototype.slice.call(focusableElements);
    let firstElement = focusableElements[0];
    let lastElement = focusableElements[focusableElements.length - 1];
    firstElement.focus();
    modal.addEventListener('keydown', tabKey);
    function tabKey(e) {
        if (e.key === 'Tab') {
            if (document.activeElement === lastElement) {
                e.preventDefault();
                firstElement.focus();
            }
        }
    }
}
//fin de function open modal

//function close modal
function closeModal() {
    const modalContact = document.getElementById("contact_modal");

    const main = document.querySelector('main');
    const header = document.querySelector('header');
    modalContact.style.display = "none";

    modalContact.setAttribute('aria-hidden', 'true');
    main.setAttribute('aria-hidden', 'false');
	header.setAttribute('aria-hidden', 'false');
    console.log(modal)
}
modal.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
});

closeTheModal.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        
        closeModal();
        
    }
});
//fin de fonction close modal*/

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