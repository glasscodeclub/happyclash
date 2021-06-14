const radio = document.querySelectorAll('input[type=radio]')

radio.forEach(rad=> {
    rad.addEventListener('click', ()=>{
        check(rad);
    })
})

function check(rad){
    const StartClash = document.querySelector("#start")
    const cont = document.querySelector("#continue")

    if(rad.id == "public-clash"){
        StartClash.classList.add("all")
        StartClash.classList.remove("none")
        cont.classList.add("none")
        cont.classList.remove("all")
        
    }
    else if(rad.id == "friends-clash"){
        StartClash.classList.add("none")
        StartClash.classList.remove("all")
        cont.classList.add("all")
        cont.classList.remove("none")
        
    }
}

function uploadViaCamera(e) {
    console.log(e);
    console.log("Upload Via Camera");
}

function uploadViaLibrary(e) {
    console.log(e);
    console.log("Upload via Libraby");
}

function uploadViaGallery(e) {
    console.log(e);
    console.log("Upload via Gallery");
}

function yes() {
    console.log("Saved to library...");
}

function no() {
    console.log("denied to save in library...");
}



const pops = document.querySelectorAll("[data-target]")
const closeButtons = document.querySelectorAll("[data-close-button]")
const overlay = document.getElementById("overlay")

pops.forEach(pop => {
    pop.addEventListener('click', ()=>{
        const popup = document.querySelector(pop.dataset.target)
        open(popup)
    })
})

closeButtons.forEach(button=>{
    button.addEventListener('click', ()=>{
        const pop = button.closest(".upload-popup")
        close(pop)
    })
})

overlay.addEventListener('click', ()=> {
    const closepop = document.querySelectorAll(".upload-popup.active")
    closepop.forEach(pop=>{
        close(pop)
    })
})

function open(pop){
    if(pop==null) return;

    else{
        pop.classList.add("active")
        overlay.classList.add("active")
    }
}

function close(pop){
    if(pop==null) return;

    else{
        pop.classList.remove("active")
        overlay.classList.remove("active")
    }
}
