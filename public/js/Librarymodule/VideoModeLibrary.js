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

function pauseVideo(element) {
    console.log('Pause icon was hit.');
    const myvideo = document.querySelector('.myvideo');
    const videoplay = document.querySelector('#videoplay');

    if(isPlaying === true) {
        myvideo.pause();
        isPlaying = false;
        element.classList.remove('active')
        videoplay.style.display = 'block';
    }
}

function del(){
  console.log('Delete icon was hit.');
}

function save(){
  console.log('Save icon was hit')
}

window.addEventListener('load',()=> {
    const myvideo = document.querySelector('.myvideo');

    myvideo.pause();
})

let isPlaying = false;

function pauseAndplayVideo() {
    
    const myvideo = document.querySelector('.myvideo');
    const videoplay = document.querySelector('#videoplay');
    // const playbtn = document.querySelector(".playbtn");
    const pausebtn = document.querySelector(".pausebtn");

    if(isPlaying === false) {
        myvideo.play();
        isPlaying = true;
        videoplay.style.display = 'none';
        // playbtn.classList.remove("active")
        pausebtn.classList.add("active")
    }else{
        myvideo.pause();
        isPlaying = false;
        videoplay.style.display = 'block';
        // playbtn.classList.add("active")
        pausebtn.classList.remove("active")
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