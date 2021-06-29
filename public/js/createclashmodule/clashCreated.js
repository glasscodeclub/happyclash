function done() {
    window.location.href = '/library';
}

function redirectToParticipantsPage  () {
    window.location.href = `/clashdetails/participants/${window.location.href.split('clashcreated/')[1]}`
}

function copyLinkToClipBoard() {
    /* Get the text field */
    let copyText = document.querySelector(".share-link");
  
    /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, 99999); /* For mobile devices */
  
    /* Copy the text inside the text field */
   document.execCommand("copy");
  
    /* Alert the copied text */
    showAlert('Success', 'Copied');
    
}

// copyLinkToClipBoard

const showAlert = (type, message) => {
    let el;
    if (type === 'Success') el = `<h5 class="notify-text" style="font-size:16px; color:cadetblue;">${message}</h5>`;
    if (type === 'Error') el = `<h5 class="notify-text" style="font-size:16px; color:red";">${message}</h5>`;
    
    document.querySelector('.sharableLink-headline').insertAdjacentHTML('afterend', el);
    window.setTimeout(hideAlert, 2000);
};


const hideAlert = () => {
    const el = document.querySelector('.notify-text');
    if (el) el.parentElement.removeChild(el);
};
