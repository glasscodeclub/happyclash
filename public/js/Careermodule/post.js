// function play(){
//     console.log("Play btn was clicked")
// }

const video = document.querySelectorAll(".myvideo")
// status(vid)
// status(video[0])

video.forEach(vid => {
    vid.addEventListener('click', () => {

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


/*==========================
    Load more
==========================*/

let page = 1
let size = 10
async function loadMore(e) {
    page += 1;
    const res = await axios.post("/career/load-more", { page, size })
    if (!res.data.length) e.innerText = "You all caught up!"
    else {
        const posts = document.querySelector(".posts")
        res.data.forEach(video => {
            const div = document.createElement("div")
            div.classList.add("post-video")
            div.innerHTML = `
                <div style="width: fit-content; margin: auto; position: relative;">
                    <video width="400px" class="myvideo" muted autoplay loop>
                        <source src="/video/${video._id}" type="video/mp4">
                    </video>

                    <div
                        style="
                        position: absolute;
                        top: 13px;
                        left: 5%;
                        font-size: 0.8rem;
                        color: white;
                        "
                    >
                        Rank 12/20
                    </div>
                    <div
                        style="
                        position: absolute;
                        top: 13px;
                        right: 5%;
                        font-size: 0.8rem;
                        color: white;
                        "
                    >
                        1:20
                    </div>
                    <div class="bottom-info">
                        <div class="">
                            <div class="postedTime"> 2h ago </div>
                            <div class="challenge-title"> Piano Challenge </div>
                            <div class="challenge-author"> Started by John doe </div>
                            <div class="interactions">
                                <div>${video.likes.length} Likes</div>
                                <div>${video.dislikes.length} Comments</div>
                                <div>20 Participants</div>
                            </div>
                        </div>
                    </div>
                </div>
            `
            posts.insertBefore(div, e)
        })
    }
}
