const openModalButton = document.querySelectorAll('[data-target]')
const closeModalButton = document.querySelectorAll('[data-close-button]')
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
    console.log(modal)
    modal.classList.remove('active')
    overlay.classList.remove('active')
}