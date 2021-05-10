const openModalButton = document.querySelectorAll('[data-target]')
const closeModalButton = document.querySelectorAll('[data-close-button]')
const closeFollowModalButton = document.querySelectorAll('[data-close-button-follow]') 
const overlay = document.getElementById('overlay')

openModalButton.forEach(button => {
    button.addEventListener('click', ()=>{
        const modal = document.querySelector(button.dataset.target)
        openModal(modal)
        
    })
})

closeModalButton.forEach(button => {
    button.addEventListener('click', ()=>{
        const modal = button.closest('.popup')
        closeModal(modal)
    })
})

closeFollowModalButton.forEach(button => {
    button.addEventListener('click', ()=>{
        const modal = button.closest(".popup")
        closeModalFollow(modal)
    })
})

overlay.addEventListener('click', ()=>{
    const modal = document.querySelectorAll('.popup.active')
    modal.forEach(modal => {
        closeModal(modal)
    })
    
})

function openModal(modal) {
    if(modal == null) return
    modal.classList.add('active')
    overlay.classList.add('active')
}

function closeModal(modal) {
    if(modal == null) return
    modal.classList.remove('active')
    overlay.classList.remove('active')
}

function closeModalFollow(modal){   
    if(modal == null) return
    modal.classList.remove('active')
}


function select(e){
    const checkbox = e.querySelector(".selected")
    checkbox.classList.toggle('select')
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
