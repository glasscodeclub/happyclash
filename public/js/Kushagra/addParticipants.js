// To select each checkbox on click
// passed this pointer as argument to select only perticular followers

function select(e) {
    const check = e.querySelector(".selected")
    check.classList.toggle("select")
}   

// FOR SELECTING ALL FOLLOWERS
function selectAll () {
    const allFollowBtn = document.querySelector('#select-all')
    allFollowBtn.classList.toggle("all-selected")
    if(allFollowBtn.classList.contains("all-selected"))
    {
        allFollowBtn.innerHTML = "All Selected"
    }
    else
    {
        allFollowBtn.innerHTML = "Select All"
    }

    const allFollowers = document.querySelectorAll("[data-select]")
    allFollowers.forEach(follower => {
        select(follower)
    })
}




// POPUPS FUNCTIONALITY

const openPopup = document.querySelectorAll("[data-target]")
const closePopup = document.querySelectorAll("[data-close-button]")
const overlay = document.getElementById('overlay')

openPopup.forEach(popup =>{
    popup.addEventListener('click', () => {
        const pop = document.querySelector(popup.dataset.target)
        openPop(pop)
    })
})

closePopup.forEach(popup =>{
    popup.addEventListener('click', () => {
        const pop = popup.closest(".popup")
        closePop(pop)
    })
})

overlay.addEventListener('click',() => {
    const popups = document.querySelectorAll(".popup.active")
    popups.forEach(popup => {
        closePop(popup)
    })
})

function openPop(pop){
    if(pop==null) return;
    pop.classList.add('active')
    overlay.classList.add('active')
}

function closePop(pop){
    if(pop==null) return;
    pop.classList.remove('active')
    overlay.classList.remove('active')
}
