

let myvideo = document.querySelector('.myvideo'); 

myvideo.addEventListener("error", function (e) {
    play.style.visibility=  'hidden';
    threedots.style.visibility=  'hidden';
});

// function videoLoadStatus() {
//     let play = document.querySelector('.play');
//     let threedots = document.querySelector('.threedots')
    
// }
