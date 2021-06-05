
function toPrevVideo(){
    console.log("Previous video button was hit");
}

function toNextVideo(){
    console.log("Next video button was hit");
}

function info(){
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
    const challengediv = document.querySelector('.challengediv');
    const pausebutton = document.querySelector('.pause');
    const playbutton = document.querySelector('.play');

    if(isPlaying === false) {
        myvideo.play();
        isPlaying = true;
        pausebutton.style.display = 'inline';
        playbutton.style.display = 'none';
        challengediv.style.display = 'none';
    }
}

function pauseVideo() {
    console.log('Pause icon was hit.');
    const myvideo = document.querySelector('.myvideo');
    const challengediv = document.querySelector('.challengediv');
    const pausebutton = document.querySelector('.pause');
    const playbutton = document.querySelector('.play');

    if(isPlaying === true) {
        myvideo.pause();
        isPlaying = false;
        pausebutton.style.display = 'none';
        playbutton.style.display = 'inline';
        challengediv.style.display = 'block';
    }
}

window.addEventListener('load',()=> {
    const myvideo = document.querySelector('.myvideo');

    myvideo.pause();
})

let isPlaying = false;

function pauseAndplayVideo() {
    
    const myvideo = document.querySelector('.myvideo');
    const challengediv = document.querySelector('.challengediv');
    const pausebutton = document.querySelector('.pause');
    const playbutton = document.querySelector('.play');

    if(isPlaying === false) {
        myvideo.play();
        isPlaying = true;
        pausebutton.style.display = 'inline';
        playbutton.style.display = 'none';
        challengediv.style.display = 'none';
    }else{
        myvideo.pause();
        isPlaying = false;
        pausebutton.style.display = 'none';
        playbutton.style.display = 'inline';
        challengediv.style.display = 'block';
    }

}