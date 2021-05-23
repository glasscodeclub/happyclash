const overlay = document.querySelector(".overlay");
const video = document.getElementsByTagName("video");

function follow() {
    console.log("You clicked on follow button");
}

function seeAllPosts(e) {
    console.log(e);
    console.log("See all posts");
}

function playVideo(e) {
    console.log(e);
    overlay.setAttribute("style", "display: none !important;");
    video[0].controls = true;
    video[0].play()
    const interval = setInterval(() => {
        if (video[0].paused) {
            overlay.removeAttribute("style")
            video[0].controls = false;
            clearInterval(interval);
        }
    }, 1000 * 10);
    console.log("This will play the video");
}
