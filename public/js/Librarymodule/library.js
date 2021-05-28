function displayPopUp(element) {
  console.log(element);
}

function playVideo(element) {
  window.location.href = "/videomode";
}

window.addEventListener("load", () => {
  const myvideo = document.getElementsByClassName("myvideo");
  const videodots = document.querySelector(".videodots");
  const videoplay = document.getElementsByClassName("videoplay");

  if (myvideo.readyState < 2) {
    videodots.style.display = "none";
    videoplay.style.display = "none";
  }
});



// POPUP FOR UPLOADING FUNCTIONALITY

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
    const pop = popup.closest(".popup-uploading")
    closePop(pop)
  })
})

overlay.addEventListener('click', () => {
  const pop = document.querySelector(".popup-uploading.active")
  closePop(pop)
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



// POPUP FOR CONTROL OPTIONS FUNCTIONANLITY

closePopup.forEach(popup =>{
  popup.addEventListener('click', () => {
    const pop = popup.closest(".popup-play")
    console.log(pop)
    closePop(pop)
  })
})

overlay.addEventListener('click', () => {
  const pop = document.querySelector(".popup-play.active")
  closePop(pop)
})

function upload(){

}

function optionUpload(){

}