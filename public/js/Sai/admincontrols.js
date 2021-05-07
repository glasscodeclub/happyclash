let divElem = {};
let popupElem = {};

function challenge(e, id) {
  console.log(e);
  const div = document.createElement("div");
  div.innerHTML = `<div class="div1">
  <div style="font-size: 0.7rem; color: grey" class="mt-4 mb-1">
    Clash details
  </div>
  <div style="font-size: 0.9rem; line-height: 1.2rem">
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
    debitis fuga aspernatur unde, in nesciunt, laborum voluptatibus
    nobis consectetur dolorum enim quisquam porro delectus minus
    <div style="font-size: 0.7rem; color: grey" class="mt-4">
      Ends on
    </div>
    <div style="font-size: 0.9rem">15/05/2021</div>
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
    <div style="font-size: 0.85rem">Your Video</div>
    <div>
      <button
        style="
          color: white;
          background-color: red;
          font-size: 0.7rem;
          border: none;
        "
        onclick="console.log(this)"
      >
        Delete
      </button>
    </div>
  </div>
  <div class="row mt-4">
    <div class="col" style="text-align: center; position: relative">
      <img
        class="vid"
        style="height: 70vh; width: 90vw; position: relative"
        src="https://s3-alpha-sig.figma.com/img/6ef4/0d39/15190984843b6f0f3e0980aee083e327?Expires=1620604800&Signature=GaOVP7v3NBVDnjKmU~n73B8Y~QG051XzJ-TadufITgk88tiCZkdRdYnnl0b2mfV8jav0huMbnkXsgA-WfyyadpzgSezvInmC-oLFfvRshs-hh0Uovx8Vnu06VdmyQHdr5gz2zhzinlQIC-1yzaURMoEeUuArhHCMZzK3DqUBG2trXAYfGKrx9ryEBLoMeDYDu2LXiV8~9Vu7gJoDhG1MW0w~uaH3mBtwXH10R0SoI~BmcYPcZ52JP6VgtJCQToH6vFAJrUDPJcFtJzP-LXKWRBSARSyfHKepBrLnP7wfog10lvephcQ6Xv~~Gt37bApg9Xno-R1DcvTkLNe2bPzrIg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
        alt="Img"
      />
      <div
        style="
          position: absolute;
          top: 10px;
          left: 30px;
          font-size: 0.8rem;
          color: white;
        "
      >
        Rank 12/20
      </div>
      <div
        style="
          position: absolute;
          top: 10px;
          right: 30px;
          font-size: 0.8rem;
          color: white;
        "
      >
        1:20
      </div>
      <div
        style="
          position: absolute;
          bottom: 140px;
          left: 30px;
          font-size: 0.9rem;
          color: white;
        "
      >
        2h ago
      </div>
      <div
        style="
          position: absolute;
          bottom: 100px;
          left: 30px;
          font-size: 1.7rem;
          background: -webkit-linear-gradient(
            45deg,
            #924bec,
            #e552c4,
            #ffbf7b
          );
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        "
      >
        Piano Challenge
      </div>
      <div
        style="
          position: absolute;
          bottom: 80px;
          left: 30px;
          font-size: 0.8rem;
          color: white;
        "
      >
        Started by John doe
      </div>
      <div
        style="
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        "
      >
        <img
          src="/img/Play.svg"
          width="50"
          height="50"
          onclick="console.log(this)"
        />
      </div>
      <div
        style="
          position: absolute;
          bottom: 20px;
          left: 30px;
          right: 30px;
          display: flex;
          font-size: 0.8rem;
          justify-content: space-between;
          color: white;
        "
      >
        <div>96 Likes</div>
        <div>40 Comments</div>
        <div>20 Participants</div>
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
    <div style="display: flex; align-items: center">
      <div style="font-size: 0.9rem">Participants (70)</div>
      <div
        onclick="console.log(this)"
        style="font-size: 0.7rem; color: grey; margin-left: 10px"
      >
        See All >
      </div>
    </div>
    <div onclick="addParticipants(this,${id})" style="font-size: 2rem">+</div>
  </div>
  <div>
    <div
      style="
        display: flex;
        align-items: center;
        justify-content: space-between;
      "
    >
      <div onclick="console.log(this)" style="text-align: center">
        <img style="width: 15vw" src="img/profile.png" class="p1" />
        <h6 style="font-size: 0.6rem">Jane Cooper</h6>
      </div>
      <div onclick="console.log(this)" style="text-align: center">
        <img style="width: 15vw" src="img/profile1.png" class="p1" />
        <h6 style="font-size: 0.6rem">Jane Cooper</h6>
      </div>
      <div onclick="console.log(this)" style="text-align: center">
        <img style="width: 15vw" src="img/profile2.png" class="p1" />
        <h6 style="font-size: 0.6rem">Jane Cooper</h6>
      </div>
      <div onclick="console.log(this)" style="text-align: center">
        <img style="width: 15vw" src="img/profile3.png" class="p1" />
        <h6 style="font-size: 0.6rem">Jane Cooper</h6>
      </div>
      <div onclick="console.log(this)" style="text-align: center">
        <img style="width: 15vw" src="img/profile4.png" class="p1" />
        <h6 style="font-size: 0.6rem">Jane Cooper</h6>
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

function addParticipants(e, id) {
  console.log(e);
  const div = document.createElement("div");
  div.innerHTML = `<div
  onclick="addParticipants(this,${id})"
  style="
    z-index: 10;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
  "
>
  <div
    style="
      height: 50vh;
      width: 80vw;
      background: white;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border-radius: 5px;
      position: relative;
    "
  >
    <div style="padding: 15px 15px 0px 15px">
      <div
        style="
          display: flex;
          align-items: center;
          justify-content: space-between;
        "
      >
        <div>Choose friends to add:</div>
        <div onclick="addParticipants(this,${id})" style="font-weight: bold; font-weight: 5rem">x</div>
      </div>
      <div class="mt-2">
        <input
          type="text"
          placeholder="Username/Email/Phone"
          style="width: 100%; border: none; border-radius: 100px"
        />
      </div>
      <div
        class="mt-3"
        style="
          display: flex;
          align-items: center;
          justify-content: flex-end;
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
            width: 15vw;
            height: 20px;
            padding: 0;
            font-size: 0.7rem;
          "
          class="btn btn-dark submit"
        >
          Send
        </button>
      </div>
    </div>
    <hr />
    <div style="padding: 0px 15px">
      <div>Suggested</div>
      <div
        style="
          display: flex;
          align-items: center;
          justify-content: space-between;
        "
      >
        <div onclick="console.log(this)" style="text-align: center">
          <img style="width: 15vw" src="img/profile.png" class="p1" />
          <h6 style="font-size: 0.6rem">Jane Cooper</h6>
        </div>
        <div onclick="console.log(this)" style="text-align: center">
          <img style="width: 15vw" src="img/profile1.png" class="p1" />
          <h6 style="font-size: 0.6rem">Jane Cooper</h6>
        </div>
        <div onclick="console.log(this)" style="text-align: center">
          <img style="width: 15vw" src="img/profile2.png" class="p1" />
          <h6 style="font-size: 0.6rem">Jane Cooper</h6>
        </div>
      </div>
      <div
        style="
          display: flex;
          align-items: center;
          justify-content: space-between;
        "
      >
        <div onclick="console.log(this)" style="text-align: center">
          <img style="width: 15vw" src="img/profile.png" class="p1" />
          <h6 style="font-size: 0.6rem">Jane Cooper</h6>
        </div>
        <div onclick="console.log(this)" style="text-align: center">
          <img style="width: 15vw" src="img/profile1.png" class="p1" />
          <h6 style="font-size: 0.6rem">Jane Cooper</h6>
        </div>
        <div onclick="console.log(this)" style="text-align: center">
          <img style="width: 15vw" src="img/profile2.png" class="p1" />
          <h6 style="font-size: 0.6rem">Jane Cooper</h6>
        </div>
      </div>
    </div>
  </div>
</div>`;

  if (popupElem[id]) {
    document.getElementById(`suggest-popup-${id}`).removeChild(popupElem[id]);
    popupElem[id] = null;
  } else {
    document.getElementById(`suggest-popup-${id}`).appendChild(div);
    popupElem[id] = div;
  }
}
