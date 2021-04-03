
window.addEventListener("click", function(e) {
     const child = e.target.matches(".videodots, .videodots *");
     if (child) { // If child is click
        console.log("Menu icon is clicked!");
}});

function displayPopUp(element) {
    console.log("Menu icon is clicked!");
}

function playVideo(element) {
    window.location.href = '/videomode';
}