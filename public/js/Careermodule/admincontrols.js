let divElem = {};
let popupElem = {};

function challenge(e, id) {
  console.log(e);
  const div = document.createElement("div");
  div.innerHTML = `
  <div class="div1">
    <div class="mt-4 mb-1 keyword">
      Clash details
    </div>
    <div style="line-height: 1.2rem; color: black;" class="keyword">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
      debitis fuga aspernatur unde, in nesciunt, laborum voluptatibus
      nobis consectetur dolorum enim quisquam porro delectus minus
      <div class="mt-4 keyword">
        Ends on
      </div>
      <div style="font-size: 0.9rem; color: #000">15/05/2021</div>
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
              <video width="400px" muted autoplay loop>
                  <source src="/Video/sample" type="video/mp4">
              </video>
              <div class="overlay d-flex justify-content-between flex-column">
                  <div class="d-flex justify-content-between">
                      <p>Rank 3/40</p>
                      <p>1:20</p>
                  </div>
                  <div>
                      <p>2h ago</p>
                      <h2 class="mb-0">Dance Challenge</h2>
                      <p>Started by Wade Warren</p>
                      <div class="d-flex justify-content-around mt-3">
                          <p>72 Likes</p>
                          <p>23 Comments</p>
                          <p>40 Participants</p>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </div>
  </div>
  <hr />
  <div class="div1">
    <div
      style="
        display: flex;
        align-items: center;
        justify-content: space-between;
      "
    >
      <div style="display: flex; align-items: baseline; margin-top: 0.5rem;">
        <div style="font-size: 0.9rem">Participants (70)</div>
        
        <div>
        <p class="a1" onclick="console.log(this)">See All&nbsp;&nbsp;<i class="fas fa-angle-right"></i> </a>
        </div>
      </div>
      <div data-target-add="#add-friends" onclick="test()"  style="font-size: 2rem; cursor:pointer; margin-top: -0.7rem; ">+</div>
    </div>
    <div>
      <div class="row">
        <div class="col" onclick="console.log(this)" style="text-align: center">
          <img class="profile_image" src="/img/profile.png" class="p1" />
          <h6 style="font-size: 0.7rem" class="name">Jane Cooper</h6>
        </div>
        <div class="col" onclick="console.log(this)" style="text-align: center">
          <img class="profile_image" src="/img/profile1.png" class="p1" />
          <h6 style="font-size: 0.7rem" class="name">Jane Cooper</h6>
        </div>
        <div class="col" onclick="console.log(this)" style="text-align: center">
          <img class="profile_image" src="/img/profile2.png" class="p1" />
          <h6 style="font-size: 0.7rem" class="name">Jane Cooper</h6>
        </div>
        <div class="col" onclick="console.log(this)" style="text-align: center">
          <img class="profile_image" src="/img/profile3.png" class="p1" />
          <h6 style="font-size: 0.7rem" class="name">Jane Cooper</h6>
        </div>
      </div>
      <div
        class="mt-4 mb-2"
        style="
          display: flex;
          align-items: center;
          justify-content: center;
        "
      >
        <button
          onclick="console.log(this)"
          style="
            background: linear-gradient(
              81.23deg,
              #7c49f6 9.3%,
              #ff53b7 51.61%,
              #ffd458 97.6%
            );
            border: none;
            font-size: 0.9rem;
          "
          class="btn btn-dark submit"
        >
          Save Changes
        </button>
      </div>
    </div>
  </div>`;

  if (divElem[id]) {
    document.getElementById(`song-details-${id}`).removeChild(divElem[id]);
    divElem[id] = null;
  } else {
    document.getElementById(`song-details-${id}`).appendChild(div);
    divElem[id] = div;
  }
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

window.addEventListener("load", ()=> {
  const buttons = document.querySelectorAll(".p1")
  const color = ['#67A3A3', '#66C07F', '#9F7CDE', '#58A6E4']
  var count = 0;
  buttons.forEach((button => {
    button.style.backgroundColor = color[count];
    count++;
  }))

})

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
