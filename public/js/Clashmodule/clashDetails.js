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


// For Selecting the followers button

// const followers = document.querySelectorAll("[data-select]")

// followers.forEach(follower => {
//     follower.addEventListener("click", ()=> {
//         console.log(follower.dataset.select)
//         const check = document.querySelector(follower.dataset.select)
//         select(check)
//     })
// })

// function select(check){
//     check.classList.toggle('select')
// }

function select(e){
    const checkbox = e.querySelector(".selected")
    checkbox.classList.toggle('select')
}

function selectAll(){
    const select = document.querySelectorAll(".selected")
    select.forEach( select => {
        select.classList.toggle('select')
    } )
}