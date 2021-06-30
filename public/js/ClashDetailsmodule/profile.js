const overlay = document.querySelector(".overlay");
const video = document.getElementsByTagName("video");
const follower = document.getElementById("follower")
const user = document.getElementById("username")

async function follow(e) {
    try {
        if (e.innerText === "Follow") {
            const response = await axios.post("/clashDetails/follow", { user: user.innerText, keyword: "follow" })
            if (response.data.message !== "Updated successfully") throw response.data.message
            follower.innerText = parseInt(follower.innerText) + 1
            e.innerText = "Unfollow"
        } else if (e.innerText === "Unfollow") {
            const response = await axios.post("/clashDetails/follow", { user: user.innerText, keyword: "unfollow" })
            if (response.data.message !== "Updated successfully") throw response.data.message
            follower.innerText = parseInt(follower.innerText) - 1
            e.innerText = "Follow"
        }
    } catch (err) {
        console.log(err)
        alert(err)
    }
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
