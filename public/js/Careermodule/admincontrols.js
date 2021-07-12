// todo - if no one have joined the clash and clash, and clash video is only one (creator one) then if he deletes his video, clash should also be deleted


let divElem = {};
let popupElem = {};
let ptsList

function challenge(e, id, ongoingClashes, ongoingVideos, ongoingParticipantsList, prevClashes, prevVideos, prevParticipantsList) {
  let clash, video, participants, isPrev = false

  if (id <= ongoingClashes.length) {
    let index = id - 1
    clash = ongoingClashes[index]
    video = ongoingVideos[index]
    participants = ongoingParticipantsList[index]
    ptsList = clash.participants
  } else {
    isPrev = true
    let index = id - ongoingClashes.length - 1
    clash = prevClashes[index]
    video = prevVideos[index]
    participants = prevParticipantsList[index]
    ptsList = clash.participants
  }

  document.getElementById("clashId").value = clash._id

  const div = document.createElement("div");
  div.innerHTML = `
    <div class="div1">
      <div class="mt-4 mb-1 keyword">
        Clash details
      </div>
      <div style="line-height: 1.2rem; color: black;" class="keyword">
        ${clash.description}
        <div class="mt-4 keyword">
          Ends on
        </div>
        <div style="font-size: 0.9rem; color: #000">${new Date(clash.endDate).toDateString()}</div>
      </div>
    </div>
    <hr />
    <div class="div1">
      <div style="display: flex; align-items: center; justify-content: space-between; width:300px; margin:auto;">
        <div style="font-size: 1rem">Your Video</div>
        <div>
          <button
            style="color: white; background-color: #ef5757; font-size: 0.7rem; border: none; width: 60px; padding: 3px; border-radius: 3px;"
            onclick="del()"
          >
            Delete
          </button>
        </div>
      </div>
      <div class="container mt-2">
        <div class="row">
            <div class="col d-flex justify-content-center mb-2">
                <video width="400px" style="height: 400px; background-color: black;" muted autoplay loop>
                    <source src="/Video/${video._id}" type="video/mp4">
                </video>
                <div class="overlay d-flex justify-content-between flex-column">
                  <div class="d-flex justify-content-between">
                    <p>Rank 3/40</p>
                    <p>1:20</p>
                  </div>
                  <div>
                    <p>${new Date(clash.startDate).toTimeString().slice(0, 8)}</p>
                    <h2 class="mb-0">${clash.title}</h2>
                    <p>Started by ${clash.username}</p>
                    <div class="d-flex justify-content-around mt-3">
                      <p>${video.likes.length} Likes</p>
                      <p>${video.comments.length} Comments</p>
                      <p>${participants.length} Participants</p>
                    </div>
                  </div>
                </div>
            </div>
        </div>
      </div>
    </div>
    <hr />
    <div class="div1">
      <div style="display: flex; align-items: center; justify-content: space-between;">
        <div style="display: flex; align-items: baseline; margin-top: 0.5rem;">
          <div style="font-size: 0.9rem">Participants (${participants.length})</div>
          <div>
            <a class="a1" href="/clashDetails/participants/${clash._id}" onclick="console.log(this)">See All&nbsp;&nbsp;<i class="fas fa-angle-right"></i> </a>
          </div>
        </div>
        ${isPrev
      ? ''
      : `<div data-target-add="#add-friends" onclick="test()"  style="font-size: 2rem; cursor:pointer; margin-top: -0.7rem; ">+</div>`
    }
      </div>
      <div>
        <div class="row mt-2">
          ${!participants.length
      ? `<h5 style="display: flex; justify-content: center;">No Participants</h5>`
      : participants.map((participant, index) => {
        if (index < 4) {
          return (
            `
              <div class="col" onclick="console.log(this)" style="text-align: center">
                <img class="profile_image" src=/image/${participant.profilePic} class="p1" />
                <h6 style="font-size: 0.7rem" class="name">${participant.username}</h6>
              </div>
            `
          )
        }
      }).join('')
    }
        </div>
        ${isPrev
      ? ''
      : `<div class="mt-2 mb-2" style="display: flex; align-items: center; justify-content: center;">
            <button onclick="saveChanges()"
              style="background: linear-gradient(81.23deg, #7c49f6 9.3%, #ff53b7 51.61%, #ffd458 97.6%); border: none; font-size: 0.9rem;"
              class="btn btn-dark submit"
            > Save Changes </button>
          </div>`
    }
      </div>
    </div>
  `;

  if (divElem[id]) {
    const details = e.closest(".row")
    var check = details.querySelector(".down-arrow")
    check.classList.remove('upside');
    document.getElementById(`song-details-${id}`).removeChild(divElem[id]);
    divElem[id] = null;
  } else {
    const details = e.closest(".row")
    var check = details.querySelector(".down-arrow")
    check.classList.add('upside');
    document.getElementById(`song-details-${id}`).appendChild(div);
    divElem[id] = div;
  }

  // make followers grey if already participating
  const users = document.querySelectorAll(".user-info")
  users.forEach(user => {
    let currUser = user.children[0].innerText
    if (ptsList.includes(currUser)) {
      user.parentNode.parentNode.classList.add('disable')
    }
  })
}

function play() {
  console.log("Play button was clicked")
}

function del() {
  console.log("Delete button was clicked")
}

function playVideo(e) {
  const overlay = document.querySelector(".overlay");
  const video = document.getElementsByTagName("video");
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

window.addEventListener("load", () => {
  const buttons = document.querySelectorAll(".p1")
  buttons.forEach((button => {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    let rgb = `rgb(${r}, ${g}, ${b})`
    button.style.backgroundColor = rgb;
  }))
})

/* ==================================================================================== */
// Selecting followers 
function selectAdd(e) {
  const check = e.querySelector(".selected")
  check.classList.add("select")
}

function selectRemove(e) {
  const check = e.querySelector(".selected")
  check.classList.remove("select")
}

// FOR SELECTING ALL FOLLOWERS
let newParticipantsArray = [];
let allFollowersOnScreen = [];

function selectAll() {
  const allFollowBtn = document.querySelector('#select-all');
  const allFollowers = document.querySelectorAll("[data-select]");
  allFollowBtn.classList.toggle("all-selected")
  if (allFollowBtn.classList.contains("all-selected")) {
    allFollowBtn.innerHTML = "All Selected";
    allFollowers.forEach(follower => {
      selectAdd(follower);
    })
  }
  else {
    allFollowBtn.innerHTML = "Select All";
    allFollowers.forEach(follower => {
      selectRemove(follower);
    })
  }
  if (newParticipantsArray.length > 0) {
    newParticipantsArray = [];
  }
}

// Updating newParticipants array
function updateParticipantArray(participant, command) {
  if (command === 'add') {
    newParticipantsArray.push(participant);
  } else if (command === 'remove') {
    newParticipantsArray = newParticipantsArray.filter(el => el !== participant);
  }
}

// Adding participants
function select(e, id) {
  const check = e.querySelector(".selected")
  check.classList.toggle("select")

  const checkArray = Array.prototype.slice.call(check.classList);
  const participant = document.getElementById(id).innerText

  if (checkArray.includes('select')) {
    updateParticipantArray(participant, 'add')
  } else {
    updateParticipantArray(participant, 'remove')
  }
}

const saveChanges = async () => {
  const selectAllButtons = Array.prototype.slice.call(document.querySelector('#select-all').classList);

  let data = { newParticipantsArray: newParticipantsArray };

  if (selectAllButtons.includes("all-selected")) data = { newParticipantsArray: [], view: [], isAllSelected: true };

  try {
    const updatedClash = await axios({
      method: 'POST',
      url: `/career/addParticipants/${document.getElementById("clashId").value}`,
      data: data
    });

    if (updatedClash.data.status === 'success') window.location.href = `/career/admincontrols`;

  } catch (err) {
    console.log(err);
  }
}
/* ==================================================================================== */


/* ==================================================================================== */
// Send request functionality
const searchBar = document.querySelector('.invitation-bar');
const searchResultBlock = document.querySelector('.searchResults-list');
const searchResultsContainer = document.querySelector('.searchResultsContainer')

const send = async (e) => {
  const invitationTo = searchBar.value.trim();

  if (invitationTo === '') return false;

  const data = invitationTo.split('').includes('@') ? { email: invitationTo, byInvite: true } : { username: invitationTo, byInvite: true };

  try {
    const updatedClash = await axios({
      method: 'POST',
      url: `/career/addParticipants/${document.getElementById("clashId").value}`,
      data: data
    });

    if (updatedClash.data.status === 'success') {
      document.querySelector('.invitation-bar').value = '';
      showAlert('Success', 'Request Sent');
    }

  } catch (err) {
    document.querySelector('.invitation-bar').value = '';
    showAlert('Error', err.response.data.message);
  }
}

const showAlert = (type, message) => {
  let el;
  if (type === 'Success') el = `<h5 class="notify-text" style="font-size:16px; color:cadetblue;">${message}</h5>`;
  if (type === 'Error') el = `<h5 class="notify-text" style="font-size:16px; color:red";">${message}</h5>`;

  document.querySelector('.choose-friend-headline').insertAdjacentHTML('afterend', el);
  window.setTimeout(hideAlert, 1000 * 5);
};

const hideAlert = () => {
  const el = document.querySelector('.notify-text');
  if (el) el.parentElement.removeChild(el);
};
/* ==================================================================================== */


/* ==================================================================================== */
// Search functionality
const searchResults = async searchKey => {
  try {
    let users = await axios.post("/career/admincontrols", { value: searchKey })
    if (users.statusText === 'OK') {
      users = users.data.filter(user => !ptsList.includes(user.username))
      if (users.length >= 4) return [users[0], users[1], users[2]]
      else return users
    }
  } catch (err) {
    console.log(err);
  }
};

const sendUsernameToInputField = (username) => {
  searchResultsContainer.classList.remove('addMe');
  document.querySelector('.invitation-bar').value = username;
}

const appendSearchResults = (data, searchResultBlock) => {
  const html = `<li class="searchResults-listItem" onclick="sendUsernameToInputField('${data.username}')"><img src=/image/${data.profilePic} alt="user"> <h6>${data.username}</h6> </li>`;
  searchResultBlock.insertAdjacentHTML('beforeend', html);
};

const appendLoadingSpinner = searchResultBlock => {
  const html = `<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>`;
  searchResultBlock.insertAdjacentHTML('afterbegin', html);
};

const appendFailureMessage = searchResultBlock => {
  const html = `<h4 class="noResultsFound">User not found!! 🥱🥱</h4>`;
  searchResultBlock.insertAdjacentHTML('afterbegin', html);
};

const search = async (searchKey, searchResultBlock) => {

  if (searchKey.split('').length === 0) return false;

  searchResultBlock.innerHTML = '';

  appendLoadingSpinner(searchResultBlock);

  try {
    appendLoadingSpinner(searchResultBlock);
    const users = await searchResults(searchKey);

    searchResultBlock.innerHTML = '';

    if (users.length !== 0) {
      users.forEach(el => {
        appendSearchResults(el, searchResultBlock);
      });
    } else if (users.length === 0) {
      appendFailureMessage(searchResultBlock);
    }
  } catch (err) {
    console.log(err);
  }
};

searchBar.addEventListener('focus', () => {
  document.addEventListener('keyup', async e => {
    if (e.target.value.trim().split('').length === 0 && Array.prototype.slice.call(document.querySelector('.searchResultsContainer').classList).includes('addMe')) {
      document.querySelector('.searchResultsContainer').classList.remove('addMe');
    } else if (e.target.value.trim().split('').length !== 0) {
      document.querySelector('.searchResultsContainer').classList.add('addMe');
    }
    await search(e.target.value.trim(), searchResultBlock);
  });
})
/* ==================================================================================== */

// function addParticipants(e, id) {
//   console.log(e);
//   const div = document.createElement("div");
//   div.innerHTML = `<div
//   onclick="addParticipants(this,${id})"
//   style="
//     z-index: 10;
//     position: fixed;
//     top: 0;
//     left: 0;
//     right: 0;
//     bottom: 0;
//     background: rgba(0, 0, 0, 0.7);
//   "
// >
//   <div
//     style="
//       height: 50vh;
//       width: 80vw;
//       background: white;
//       top: 50%;
//       left: 50%;
//       transform: translate(-50%, -50%);
//       border-radius: 5px;
//       position: relative;
//     "
//   >
//     <div style="padding: 15px 15px 0px 15px">
//       <div
//         style="
//           display: flex;
//           align-items: center;
//           justify-content: space-between;
//         "
//       >
//         <div>Choose friends to add:</div>
//         <div onclick="addParticipants(this,${id})" style="font-weight: bold; font-weight: 5rem">x</div>
//       </div>
//       <div class="mt-2">
//         <input
//           type="text"
//           placeholder="Username/Email/Phone"
//           style="width: 100%; border: none; border-radius: 100px"
//         />
//       </div>
//       <div
//         class="mt-3"
//         style="
//           display: flex;
//           align-items: center;
//           justify-content: flex-end;
//         "
//       >
//         <button
//           onclick="console.log(this)"
//           style="
//             background: linear-gradient(
//               81.23deg,
//               #7c49f6 9.3%,
//               #ff53b7 51.61%,
//               #ffd458 97.6%
//             );
//             border: none;
//             width: 15vw;
//             height: 20px;
//             padding: 0;
//             font-size: 0.7rem;
//           "
//           class="btn btn-dark submit"
//         >
//           Send
//         </button>
//       </div>
//     </div>
//     <hr />
//     <div style="padding: 0px 15px">
//       <div>Suggested</div>
//       <div
//         style="
//           display: flex;
//           align-items: center;
//           justify-content: space-between;
//         "
//       >
//         <div onclick="console.log(this)" style="text-align: center">
//           <img style="width: 15vw" src="img/profile.png" class="p1" />
//           <h6 style="font-size: 0.6rem">Jane Cooper</h6>
//         </div>
//         <div onclick="console.log(this)" style="text-align: center">
//           <img style="width: 15vw" src="img/profile1.png" class="p1" />
//           <h6 style="font-size: 0.6rem">Jane Cooper</h6>
//         </div>
//         <div onclick="console.log(this)" style="text-align: center">
//           <img style="width: 15vw" src="img/profile2.png" class="p1" />
//           <h6 style="font-size: 0.6rem">Jane Cooper</h6>
//         </div>
//       </div>
//       <div
//         style="
//           display: flex;
//           align-items: center;
//           justify-content: space-between;
//         "
//       >
//         <div onclick="console.log(this)" style="text-align: center">
//           <img style="width: 15vw" src="img/profile.png" class="p1" />
//           <h6 style="font-size: 0.6rem">Jane Cooper</h6>
//         </div>
//         <div onclick="console.log(this)" style="text-align: center">
//           <img style="width: 15vw" src="img/profile1.png" class="p1" />
//           <h6 style="font-size: 0.6rem">Jane Cooper</h6>
//         </div>
//         <div onclick="console.log(this)" style="text-align: center">
//           <img style="width: 15vw" src="img/profile2.png" class="p1" />
//           <h6 style="font-size: 0.6rem">Jane Cooper</h6>
//         </div>
//       </div>
//     </div>
//   </div>
// </div>`;

//   if (popupElem[id]) {
//     document.getElementById(`suggest-popup-${id}`).removeChild(popupElem[id]);
//     popupElem[id] = null;
//   } else {
//     document.getElementById(`suggest-popup-${id}`).appendChild(div);
//     popupElem[id] = div;
//   }
// }



// POPUP JS
