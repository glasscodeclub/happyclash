function test() {
    const pop = document.querySelector("#add-friends")
    const closeButtons = document.querySelectorAll("[data-close-button]")
    const seeall = document.querySelectorAll("[data-target-see]")
    const seeClose = document.querySelectorAll("[data-close-button-follow]")
    const overlay = document.getElementById("overlay")

    seeall.forEach(see => {
        see.addEventListener('click', () => {
            const pop = document.querySelector(see.dataset.targetSee)
            open(pop)
        })
    })

    seeClose.forEach(button => {
        button.addEventListener('click', () => {
            const pop = button.closest(".career-popup")
            closeSee(pop)
        })
    })

    open(pop)

    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const closepop = button.closest(".career-popup")
            close(closepop)
        })
    })

    overlay.addEventListener('click', () => {
        const closepop = document.querySelectorAll(".career-popup.active")
        closepop.forEach(pop => {
            close(pop)
        })

    })
}

function open(pop) {
    if (pop == null) return;

    else {
        pop.classList.add("active")
        overlay.classList.add("active")
    }
}

function close(pop) {
    if (pop == null) return;

    else {
        pop.classList.remove("active")
        overlay.classList.remove("active")
    }
}

function closeSee(pop) {
    if (pop == null) return;

    else {
        pop.classList.remove("active")
        // overlay.classList.remove("active")   
    }
}
