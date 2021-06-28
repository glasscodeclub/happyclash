'use strict';

/* globals MediaRecorder */

var width = screen.width;
console.log("Width: ",width);

var height = screen.height;
console.log("Height: ",height);


let mediaRecorder;
let recordedBlobs;

const errorMsgElement = document.querySelector('span#errorMsg');
const recordedVideo = document.querySelector('video#recorded');
const gum = document.querySelector('video#gum');
const recordButton = document.querySelector('button#record');
const playButton = document.querySelector('button#play');
const downloadButton = document.querySelector('button#download');
const uploadButton =document.querySelector('button#upload')
const threeDots = document.querySelector('#threedots');



uploadButton.addEventListener('click',()=>{
  var fd = new FormData();
  var videoBlob=new Blob(recordedBlobs, {type: 'video/mp4'});
  fd.append('videoFile', videoBlob,"recordedVideo.mp4");
  $.ajax({
      type: 'POST',
      url: '/camera',
      data: fd,
      processData: false,
      contentType: false,
      error: function(err) {
        console.log("error")
        window.location.assign("/error");
      },
      success: function(result) {
        window.location.assign("/library")
      }
  })
})
recordButton.addEventListener('click', () => {
  if (recordButton.name === 'Record') {
    gum.style="display:static";
    if(recordedVideo){
      recordedVideo.pause();
    } 
    recordButton.name = 'StopRec'
    threeDots.classList.remove('active')
    recordedVideo.style="display:none";
    recordButton.classList.add('stop');
    playButton.classList.add('disabled');
    uploadButton.classList.add('disabled');
    
    //
    startRecording();
  } else {
    stopRecording();
    //
    recordButton.name = 'Record';
    playButton.classList.remove('disabled');
    uploadButton.classList.remove('disabled');
    recordButton.classList.remove('stop');
    threeDots.classList.add('active');
    playButton.disabled = false;
    downloadButton.disabled = false;
    uploadButton.disabled = false;
  }
});


playButton.addEventListener('click', () => {
  let superBuffer = new Blob(recordedBlobs, {type: 'video/webm'});
    gum.style="display:none"; 
    recordedVideo.src = null;
    recordedVideo.srcObject = null;
    recordedVideo.src = window.URL.createObjectURL(superBuffer);
    recordedVideo.controls = true;
    recordedVideo.style="display:static";
    recordedVideo.play();
});


downloadButton.addEventListener('click', () => {
  const blob = new Blob(recordedBlobs, {type: 'video/mp4'});
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = url;
  a.download = 'recordedVideo.mp4';
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }, 100);
});

function handleDataAvailable(event) {
  console.log('handleDataAvailable', event);
  if (event.data && event.data.size > 0) {
    recordedBlobs.push(event.data);
  }
}

function startRecording() {
  recordedBlobs = [];
  let options = {mimeType: 'video/webm;codecs=vp9,opus'};
  try {
    mediaRecorder = new MediaRecorder(window.stream, options);
  } catch (e) {
    // console.error('Exception while creating MediaRecorder:', e);
    errorMsgElement.innerHTML = `Exception while creating MediaRecorder: ${JSON.stringify(e)}`;
    // window.alert(`Exception while creating MediaRecorder: ${JSON.stringify(e)}`);
    return;
  }

  console.log('Created MediaRecorder', mediaRecorder, 'with options', options);
  // recordButton.textContent = 'Stop Recording';
  playButton.disabled = true;
  downloadButton.disabled = true;
  mediaRecorder.onstop = (event) => {
    console.log('Recorder stopped: ', event);
    console.log('Recorded Blobs: ', recordedBlobs);
  };
  mediaRecorder.ondataavailable = handleDataAvailable;
  mediaRecorder.start();
  console.log('MediaRecorder started', mediaRecorder);
}

function stopRecording() {
  mediaRecorder.stop();
}

function handleSuccess(stream) {
  recordButton.disabled = false;
  console.log('getUserMedia() got stream:', stream);
  window.stream = stream;

  const gumVideo = document.querySelector('video#gum');
  gumVideo.srcObject = stream;
}

async function init(constraints) {
  try {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    handleSuccess(stream);
  } catch (e) {
    // console.error('navigator.getUserMedia error:', e);
    errorMsgElement.innerHTML = `navigator.getUserMedia error:${e.toString()}`;
    // window.alert(`navigator.getUserMedia error:${e.toString()}`);
  }
}

document.querySelector('button#start').addEventListener('click', async () => {
  //const hasEchoCancellation = document.querySelector('#echoCancellation').checked;
  const constraints = {
    audio: {
      echoCancellation: {exact: true}
    },
    video: {
      width: width, height: height
    }
  };
  console.log('Using media constraints:', constraints);
  await init(constraints);
});


//POPUP JS CODECS


const openPopup = document.querySelectorAll("[data-target]")
const closePopup = document.querySelectorAll("[data-close-button]")
const overlay = document.getElementById("overlay")

openPopup.forEach(popup =>{
  popup.addEventListener('click', () => {
    const pop = document.querySelector(popup.dataset.target)
    openPop(pop)
  })
})

closePopup.forEach(popup =>{
  popup.addEventListener('click', () => {
    const pop = popup.closest(".popup")
    closePop(pop)
  })
})

overlay.addEventListener('click', () => {
  const pop = document.querySelector(".popup.active")
  closePop(pop)
})

function openPop(pop){
  if(pop == null) return;
  pop.classList.add("active")
  overlay.classList.add("active")
}

function closePop(pop){
  if(pop == null) return;
  pop.classList.remove("active")
  overlay.classList.remove("active")
}


function back(){
  console.log('back button was hit...')
}
 



