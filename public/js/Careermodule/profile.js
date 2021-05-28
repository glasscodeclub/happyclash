function careerClick(params) {
  console.log(params);
}

function editClick(params) {
  console.log(params);
}

function settingsClick(params) {
  console.log(params);
}

function bellClick(params) {
  console.log(params);
}

function seeAll(params) {
  console.log(params);
}

const video = document.querySelector(".myvideo")
const play = document.querySelector(".playbtn")
let x = 0;

status()

video.addEventListener('click', () => {
  status()
})


function status()
{
  if(x === 0)
  {
    video.play();
    play.style.display = "none";
    x = 1; 
  }else{
    video.pause();
    play.style.display = "block";
    x = 0;
  }
}

