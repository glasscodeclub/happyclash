
function toPrevVideo(){
    console.log("Previous video button was hit");
}

function toNextVideo(){
    console.log("Next video button was hit");
}

function iButton(){
    console.log("i button was hit");
}

function countShares() {
    console.log('Share button was hit.');
}

function countComments() {
    console.log('Comment button was hit.');
}

function countLikes() {
    console.log('Like button was hit.');
}

function countDislikes() {
    console.log('Dislike button was hit.');
}

function playVideo() {
    console.log('Play icon was hit.');
    const myvideo = document.querySelector('.myvideo');
    const videoplay = document.querySelector('#videoplay');

    if(isPlaying === false) {
        myvideo.play();
        isPlaying = true;
        videoplay.style.display = 'none';
    }
}

function pauseVideo() {
    console.log('Pause icon was hit.');
    const myvideo = document.querySelector('.myvideo');
    const videoplay = document.querySelector('#videoplay');

    if(isPlaying === true) {
        myvideo.pause();
        isPlaying = false;
        videoplay.style.display = 'block';
    }
}

function joinClash() {
    console.log('Join clash button was hit');
}

window.addEventListener('load',()=> {
    const myvideo = document.querySelector('.myvideo');

    myvideo.pause();
})

let isPlaying = false;

function pauseAndplayVideo() {
    
    const myvideo = document.querySelector('.myvideo');
    const videoplay = document.querySelector('#videoplay');

    if(isPlaying === false) {
        myvideo.play();
        isPlaying = true;
        videoplay.style.display = 'none';
    }else{
        myvideo.pause();
        isPlaying = false;
        videoplay.style.display = 'block';
    }

}

// POPUP FOR VIDEO OPTIONS FUNCTIONALITY

window.addEventListener('load',()=> {

const openPopup = document.querySelectorAll("[data-target]")
const closePopup = document.querySelectorAll("[data-close-button]")
const overlay = document.getElementById("overlay")

openPopup.forEach(popup =>{
  popup.addEventListener('click', () => {
    const pop = document.querySelector(popup.dataset.target)
    openPop(pop)
  })
})

closePopup.forEach(popup =>{
  popup.addEventListener('click', () => {
    const pop = popup.closest(".popup-play")
    closePop(pop)
  })
})

overlay.addEventListener('click', () => {

  const pop = document.querySelector(".popup-play.active")
  closePop(pop)
})

// function openPop(pop){
//   if(pop == null) return;
//   pop.classList.add("active")
//   overlay.classList.add("active")
// }

// function closePop(pop){
//   if(pop == null) return;
//   pop.classList.remove("active")
//   overlay.classList.remove("active")
// }



// // POPUP FOR CONTROL OPTIONS FUNCTIONANLITY

// closePopup.forEach(popup =>{
//   popup.addEventListener('click', () => {
//     const pop = popup.closest(".popup-play")
//     console.log(pop)
//     closePop(pop)
//   })
// })

// overlay.addEventListener('click', () => {
//   const pop = document.querySelector(".popup-play.active")
//   closePop(pop)
// })

})

function openPop(pop){
    if(pop == null) return;
    pop.classList.add("active")
    overlay.classList.add("active")
  }

function closePop(pop){
    if(pop == null) return;
    pop.classList.remove("active")
    overlay.classList.remove("active")
  }