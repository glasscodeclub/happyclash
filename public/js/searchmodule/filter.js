var dateTime = document.querySelectorAll("input.dateTime")
    dateTime.forEach(element => {
        element.addEventListener('click', ()=>{
            console.log(element.value)
            element.classList.add("active")
        })
    })

function change()
{
    var dateTimeClose = document.querySelectorAll("input.dateTime.active")
    dateTimeClose.forEach(element => {
        element.classList.remove("active")
    })
}

const openFilter = document.querySelectorAll("[data-target]")
const closeFilter = document.querySelectorAll("[data-close-btn]")
const overlay = document.getElementById("overlay")

openFilter.forEach(filter=>{
    filter.addEventListener('click', ()=> {
        const fil = document.querySelector(filter.dataset.target)
        open(fil)
    })
})

closeFilter.forEach(filter=>{
    filter.addEventListener('click', ()=> {
        const fil = filter.closest(".filter.active")
        close(fil)
    })
})

overlay.addEventListener('click', ()=>{
    const filter = document.querySelectorAll(".filter.active")
    filter.forEach(fil => {
        close(fil)
    })
})

function open(fil){
    if(fil==null) return;
    fil.classList.add("active")
    overlay.classList.add("active")
}

function close(fil){
    if(fil==null) return;
    fil.classList.remove("active")
    overlay.classList.remove("active")
    change()
}