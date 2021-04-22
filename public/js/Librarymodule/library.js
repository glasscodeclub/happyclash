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
