function playVideo() {
  console.log('Play icon was hit.');
  const playbtn = document.querySelector(".play");
  const pausebtn = document.querySelector(".pause");
  const myvideo = document.querySelector('.myvideo');

    if(isPlaying === false) {
        myvideo.play();
        isPlaying = true;
        playbtn.style.display = 'none';
        pausebtn.style.display = 'inline';
        
    }
}

function pauseVideo() {
  console.log('Pause icon was hit.');
  const playbtn = document.querySelector(".play");
  const pausebtn = document.querySelector(".pause");
  const myvideo = document.querySelector('.myvideo');

    if(isPlaying === true) {
        myvideo.pause();
        isPlaying = false;
        playbtn.style.display = 'inline';
        pausebtn.style.display= 'none'
    }
}
function optionThreeDot(e){
  document.getElementById("optionThreeDots").value=e.id.split("_")[1];
}

function del(){
  let id=document.getElementById("optionThreeDots").value
  $.ajax('/library/delete/'+id, {
   type: 'POST',  
   success: function (data, status, xhr) {
      window.location.assign("/library");
   },
   error: function (jqXhr, textStatus, errorMessage) {
     window.location.assign("/error")
   }
 });
 }

function save(){
  let id=document.getElementById("optionThreeDots").value
  document.getElementById("downloadLink").href="/video/"+id;
  document.getElementById("downloadLink").click();
}

window.addEventListener('load',()=> {
  const myvideo = document.querySelector('.myvideo');
  
  myvideo.pause();
})

let isPlaying = false;

function pauseAndplayVideo() {
    
    const myvideo = document.querySelector('.myvideo');
    const playbtn = document.querySelector(".play");
    const pausebtn = document.querySelector(".pause");

    if(isPlaying === false) {
        myvideo.play();
        isPlaying = true;
        playbtn.style.display = 'none';
        pausebtn.style.display= 'inline'
        
    }else{
        myvideo.pause();
        isPlaying = false;
        playbtn.style.display = 'inline';
        pausebtn.style.display= 'none'
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