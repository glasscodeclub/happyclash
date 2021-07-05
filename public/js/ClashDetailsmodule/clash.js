const user = document.getElementById("username")

function suggestClash() {
    console.log("You clicked on suggest clash");
}

async function follow(e) {
    try {
        if (e.innerText === "Follow") {
            const response = await axios.post("/clashDetails/follow", { user: user.innerText, keyword: "follow" })
            if (response.data.message !== "Updated successfully") throw response.data.message
            e.innerText = "Unfollow"
        } else if (e.innerText === "Unfollow") {
            const response = await axios.post("/clashDetails/follow", { user: user.innerText, keyword: "unfollow" })
            if (response.data.message !== "Updated successfully") throw response.data.message
            e.innerText = "Follow"
        }
    } catch (err) {
        console.log(err)
        alert(err)
    }
}

function openProfile(){
    console.log("You clicked on open profile");
}

function seeAllComments(){
    console.log("This give you list of comments...");
}

function seeAllParticipants(){
    console.log("This give you list of participants...");
}
