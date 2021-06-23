// function displayPopUp(element) {
//   document.getElementById("optionThreeDots").value=element.id;
//   console.log(element);
// }


function optionThreeDot(e){
  document.getElementById("optionThreeDots").value = e.id.split("_")[1];
  document.getElementById('createClashButton').value = e.id.split("_")[1];
}

function redirectToCreateClash(e) {
  window.location.href = `/createclash/createNewClash?videoId=${document.getElementById('createClashButton').value}`
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



// $(document).ready(function(){

//   //delete funtion
// $('#play-options').on('show.bs.modal', function (event) {
//   console.log("hi")
//   var button = $(event.relatedTarget);
//   var id = button.data('id');
//   console.log(id)
// });

// });
