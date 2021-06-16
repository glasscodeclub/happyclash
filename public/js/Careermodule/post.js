// function play(){
//     console.log("Play btn was clicked")
// }

const video = document.querySelectorAll(".myvideo")
// status(vid)
// status(video[0])

video.forEach(vid=>{
    vid.addEventListener('click', ()=>{ 
    
        console.log(vid);
    })
})

let x = 1 

// function status(vid){
//     const check = vid.closest(".check")
//     const play = check.querySelector('.play-btn')
//     if(x==1){
//         vid.pause();
//         play.style.display = 'block';
//         x = 0
//     }else {
//         vid.play()
//         play.style.display = 'none'
//         x=1
//     }
// }