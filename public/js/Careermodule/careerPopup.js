function test(){
        const pop = document.querySelector("#add-friends")
        const closeButtons = document.querySelectorAll("[data-close-button]")
        const seeall = document.querySelectorAll("[data-target-see]")
        const seeClose = document.querySelectorAll("[data-close-button-follow]")
        const overlay = document.getElementById("overlay")
        
        seeall.forEach(see => {
            see.addEventListener('click', ()=>{
                const pop = document.querySelector(see.dataset.targetSee)
                open(pop)
            })
        })

        seeClose.forEach(button=>{
            button.addEventListener('click', ()=>{
                const pop = button.closest(".career-popup")
                closeSee(pop)
            })
        })

        open(pop)

        closeButtons.forEach(button =>{
            button.addEventListener('click', ()=>{
                const closepop = button.closest(".career-popup")
                close(closepop)
            })
        })

        overlay.addEventListener('click', ()=> {
            const closepop = document.querySelectorAll(".career-popup.active")
            closepop.forEach(pop=>{
                close(pop)
            })
            
        })
}

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

function closeSee(pop){
    if(pop==null) return;
    
    else{
        pop.classList.remove("active")
        // overlay.classList.remove("active")   
    }
}


function send(){
    console.log("send button was clicked")
}


// FOR SELECTING ALL AND INDIVIDUALS
function select(e){
    if(e.classList.contains("suggested-friends"))
    {
        const img = e.querySelector(".selected-profile")
        const name = e.querySelector(".user-name")
        img.classList.toggle("active")
        name.classList.toggle("active")
    }
    else if(e.dataset.select == ".selected")
    {
        const checkbox = e.querySelector(".selected")

        checkbox.classList.toggle('select')
    }
}

function selectAll(){
    const e = document.getElementById("select-all")
    const profiles = document.querySelectorAll('[data-friends]')

    profiles.forEach(profile => {
        const image = profile.getElementsByClassName("selected-profile")
        const name = profile.getElementsByClassName("user-name")
        toggleclass(image[0],name[0])
    })
   
    e.classList.toggle('select-all')
    e.classList.toggle('all-selected')
    if(e.classList.contains('all-selected'))
    {
        e.innerHTML = "All Selected";
    }
    else if(e.classList.contains('select-all')){
        e.innerHTML = "Select All";
    }
    const select = document.querySelectorAll(".selected")
    select.forEach( select => {
        select.classList.toggle('select')
    } )
}

function toggleclass(image, name){
    image.classList.toggle('active')
    name.classList.toggle('active')
}

