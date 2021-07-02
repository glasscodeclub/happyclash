// function displayPopUp(element) {
//   document.getElementById("optionThreeDots").value=element.id;
//   console.log(element);
// }

function optionThreeDot(e){
  document.getElementById("optionThreeDots").value = e.id.split("_")[1];
  document.getElementById('createClashButton').value = e.id.split("_")[1];

  if (e.dataset.clashexists !== '') {
    document.getElementById('deleteVideoButton').classList.add('disable-me');
    document.getElementById('createClashText').textContent = 'Clash Created';
    document.getElementById('createClashButton').classList.add('disable-me');
  }
}

function redirectToCreateClash() {
  const createClashButton = document.getElementById('createClashButton');
  window.location.href = `/createclash/createNewClash?videoId=${createClashButton.value}`
}

function del(){
 let id=document.getElementById("optionThreeDots").value
 $.ajax('/library/delete/'+id, {
  type: 'POST',  
  success: function (data, status, xhr) {
     window.location.reload();
  },
  error: function (jqXhr, textStatus, errorMessage) {
    window.location.assign("/error")
  }
});
}

// function playVideo(element) {
//   window.location.href = "/library/videomodelibrary";
// }

function play(){
  let id=document.getElementById("optionThreeDots").value
  window.location.assign("/library/videomodelibrary/"+id)
}

function download(){
  let id=document.getElementById("optionThreeDots").value
  document.getElementById("downloadLink").href="/video/"+id;
  document.getElementById("downloadLink").click();
} 

function capture(){
  console.log("capture button was clicked")
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
  document.getElementById('createClashButton').classList.remove('disable-me');
  document.getElementById('deleteVideoButton').classList.remove('disable-me');
  document.getElementById('createClashText').textContent = 'Create Clash';
}

// POPUP FOR CONTROL OPTIONS FUNCTIONANLITY

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

function upload(){

}

function optionUpload(){

}
