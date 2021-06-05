// GET ALL ELEMENTS ONCE PAGE LOADS
window.addEventListener('load', ()=> {
    const video = document.querySelector(".myvideo");
    const background = document.querySelectorAll(".similar-song")
    const closePopupBtn = document.querySelectorAll("[data-close-btn]")
    const hr = document.querySelector(".hr-pop")
    const challenges = document.querySelectorAll("p.song-name.simi-song")
    const arr = ["#66C07F", "#9F7CDE", "#58A6E4", "#FF8080"]
    var i = 0;
    var count = 0;
    const play = document.querySelector(".play");
    const pause = document.querySelector(".pause");
    const challengediv = document.querySelector('.challengediv');

    video.play()

    challenges.forEach(challenge => {
        if(count%2 === 0){
            challenge.textContent = "old song challenge"
        }
        else{
            challenge.textContent = "pop song challenge"
        }
        count++
    })

    background.forEach(back => {
        i= Math.random() * (3-0) + 0;
        i = Math.floor(i)
        back.style["background"] = arr[i];
    })



    play.addEventListener("click", ()=>
    {
        video.play();
        challengediv.style.display = 'none';
        display(play,pause)
    })

    pause.addEventListener("click", ()=>{
        video.pause();
        challengediv.style.display = 'block';
        challengediv.style.animation = 'none';
        display(play,pause)
    })

    closePopupBtn.forEach(btn => {
        btn.addEventListener('click', ()=>{
            const pop = btn.closest(".popup-playlist")
            closehr(hr)
            closePop(pop)
        })
    })
})


// Functions

function info(){
    console.log("Info button was clicked")
}

function expand(){
    console.log("Expand button was clicked")
}

function joinclash(){
    console.log("Joinclash button was clicked")
}

function likeclash(){
    console.log("Like clash button was clicked")
}

function dislikeclash(){
    console.log("Dislikeclash button was clicked")
}

function comment(){
    console.log("Comment button was clicked")
}

function share(){
    console.log("Share button was clicked")
}

function display(play,pause){
    if(play.classList.contains("display"))
    {
        play.classList.remove("display")
        pause.classList.add("display")
    }
    else if(pause.classList.contains("display"))
    {
        pause.classList.remove("display")
        play.classList.add("display")
    }
}

function closePop(pop){
    pop.classList.remove("active")
}

function closehr(hr){
    hr.classList.remove("active")
}

function thumb(e){
    console.log(e);
}

// WORKING OF POPUP