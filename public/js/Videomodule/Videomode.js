
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
}

function pauseVideo() {
    console.log('Pause icon was hit.');
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