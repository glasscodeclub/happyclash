/*==========================
  Global states
==========================*/
let clientMode = 'Public'
let randPublicVideoIds = [...randVideoIds]
let randFriendVideoIds = []

/*==========================
  Global functions
==========================*/
function addVideos(Videos) {
  const videos = document.getElementById("carouselExampleDark")
  Videos.forEach(video => {
    const div = document.createElement('div')
    div.classList.add('carousel-inner')
    div.innerHTML = `
        <div class="carousel-item active" data-bs-interval="36000000">
          <div class="row profile-title">
            <div class="col-2 jcc" style="padding: 0 12px !important;">
              <img src="/image/${video.userData.profilePic ? video.userData.profilePic : 'sample'}" class="car1" alt="image"/>
            </div>
            <div class="col-6" id="profiletitle" style="text-align: start; padding-left: 5px">
              <div class="profile-name">${video.userData.username} </div>
              <div class="fontsize">${video.userData.name}, ${video.userData.city}</div>
            </div>
            <div class="col" id="timeleft">
              <i class="far fa-clock"></i>
              ${moment(new Date(video.clashData.endDate), 'YYYYMMDD').fromNow()}
            </div>
          </div>
          <div id="profilevideo">
            <video class="vid" muted autoplay loop>
              <source src="/video/${video.video._id}" type="video/mp4" />
            </video>
            <div class="duration">1:20</div>
            <div class="challenge-details">
            <p class="challenge-title">${video.clashData.title} </p>
            <p class="author-name">Started by ${video.clashData.username} </p>
            <div class="interactions">
              <p>${video.video.likes.length} Likes</p>
              <p>${video.video.comments.length} Comments</p>
              <p>${video.clashData.participants.length} Participants</p>
            </div>
          </div>
          </div>
        </div>
      `
    videos.insertBefore(div, document.getElementById("br"))
  })
}

/*==========================
  Switch between modes
==========================*/
async function getVideos(mode) {
  clientMode = mode;
  try {
    const randVideos = await axios.post("/home/get-random-videos", { mode: clientMode })

    if (clientMode === "Public") randPublicVideoIds = [...new Set([...randVideos.data.randVideoIds])]
    else if (clientMode === "Friend") randFriendVideoIds = [...new Set([...randVideos.data.randVideoIds])]

    document.getElementById("load").children[0].innerText = "Load more"

    const parentVideoElement = document.getElementById("carouselExampleDark")

    // Remove the videos if we switch
    Array.from(parentVideoElement.children).forEach(child => child.remove())

    // Add videos to DOM if exixts
    if (!randVideos.data.videos.length) document.getElementById("load").innerHTML = `Their are no ${clientMode} clash videos right now.`
    else addVideos(randVideos.data.videos)
  } catch (err) {
    console.log(err)
  }
}

function changeColor() {
  let public = document.getElementById("public");
  let friends = document.getElementById("friends");

  let e = window.event;
  let colored, plain;

  if (e.target === public) {
    colored = public;
    plain = friends;
  } else {
    colored = friends;
    plain = public;
  }

  colored.style.background = "linear-gradient(81.23deg, #7C49F6 9.3%, #FF53B7 51.61%, #FFD458 97.6%)";
  colored.style.color = "white";
  colored.style.borderRadius = "0.25rem";
  colored.style.border = "none";
  colored.style.outline = "none";
  colored.style.boxShadow = "none";

  plain.style.background = "white";
  plain.style.color = "black";
  plain.style.boxShadow = "0px 1px 7px rgba(0, 0, 0, 0.15)";

  let mode = e.target === public ? "Public" : "Friend"
  getVideos(mode)
}

function badgeClick(elem) {
  console.log(this);
}

function reload() {
  window.location.reload()
}

function addButton(arg) {
  console.log(arg);
}

/*==========================
  Load more
==========================*/

async function loadmore(e) {
  let randVideos
  try {
    if (clientMode === "Public") {
      randVideos = await axios.post("/home/load-more", { mode: clientMode, randVideoIds: randPublicVideoIds })
      randPublicVideoIds = [...new Set([...randPublicVideoIds, ...randVideos.data.randVideoIds])]
    } else if (clientMode === "Friend") {
      randVideos = await axios.post("/home/load-more", { mode: clientMode, randVideoIds: randFriendVideoIds })
      randFriendVideoIds = [...new Set([...randFriendVideoIds, ...randVideos.data.randVideoIds])]
    }

    if (!randVideos.data.videos.length) e.innerText = "You all caught up!"
    else addVideos(randVideos.data.videos)
  } catch (err) {
    console.log(err)
  }
}

// window.addEventListener('load', () => {
//   const vid = document.querySelectorAll('.vid');

//   const height = window.innerHeight * 0.85;

//   console.log(height)

//   if (vid.length > 0) {
//     vid.forEach(el => {
//       el.style.height = `${height}px`
//     })
//   }
// })