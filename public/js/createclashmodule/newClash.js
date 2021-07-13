window.addEventListener('load', function () {
   if (window.location.href.includes('videoId')) {
      const uploadButton = document.querySelector('.uploadButton');
      uploadButton.value = `${window.location.href.split('?videoId=')[1]}`
      uploadButton.innerHTML = 'Uploaded <i class="far fa-check-circle successIcon"></i>';
   }
});

{/* <input placeholder="Clash Ends" onClick="turnTextToDate()" type="text" class="form-control endTimeTextStyles" required></input> */}

// const turnTextToDate = () => {
//    document.querySelector('.endTimeTextStyles').style.display = 'none';
//    document.querySelector('.endTimeStyles').style.display = 'block';
//    document.querySelector('.endTimeStyles').style.opacity = 1;
//    document.querySelector('.endTimeStyles').style.position = 'none';
// }

// Buttons On demad

const publicButton = document.querySelector('.public');
const friendButton = document.querySelector('.friend');

publicButton.addEventListener('click', () => {
   document.getElementById('continue').style.display = 'none';
   document.getElementById('start').style.display = 'inline';
})

friendButton.addEventListener('click', () => {
   document.getElementById('start').style.display = 'none';
   document.getElementById('continue').style.display = 'inline';
})

// Creating Clash

const createClashForm = document.querySelector('.createClashForm');

createClashForm.addEventListener('submit', async (e) => {
   e.preventDefault();

   if (document.querySelector('.uploadButton').value === '') {
      showAlert('Error', 'Video Not Uploaded');
      return false;
   }

   const mode = document.querySelector('input:checked').value;
   const title = document.querySelector('.clash-title').value.trim() || 'Title';
   const description = document.querySelector('.clash-des').value.trim() || 'Description';
   const endDate = document.querySelector('.clash-endTime').value;
   const category = document.querySelector('select').value;
   const keywords = document.querySelector('.clash-keys').value.includes(',') ? document.querySelector('.clash-keys').value.trim().split(',') : [document.querySelector('.clash-keys').value.trim()] || ['Hashtags'];
   const videos = [window.location.search.split('=')[1]];
   const participants = [];
   const suggestions = [];
   const view = [];
   const isSeenByAllForFriends = false;
   const isSelectedAllFollowers = false;
   const rank = null;

   console.log(endDate);

   try {
     const newClash =  await axios({
         method: 'POST',
         url: '/createclash/createNewClash',
         data: {
            mode,
            title,
            description,
            endDate,
            category,
            keywords,
            videos,
            participants,
            suggestions,
            view,
            isSeenByAllForFriends,
            isSelectedAllFollowers,
            rank
        }
     });
      
      if (newClash.data.status === 'success' && newClash.data.newClash.mode === "Public") window.location.href = `/createclash/clashcreated/${newClash.data.newClash._id}`;
      if (newClash.data.status === 'success' && newClash.data.newClash.mode === "Friend") window.location.href = `/createclash/addParticipants/${newClash.data.newClash._id}`;

   } catch (err) {
      console.log(err);
   }
})

// console.log(document.getElementById('video-not-uploaded').innerHTML)

const showAlert = (type, message) => {
   let el = document.getElementById('video-not-uploaded');
   // if()
   if (type === 'Success') el.innerHTML = `${message}`;
   if (type === 'Error') el.innerHTML = `${message}`;
   
   // document.querySelector('.check').insertAdjacentHTML('afterend', el);
   window.setTimeout(hideAlert, 30000);
};


const hideAlert = () => {
   const el = document.querySelector('.notify-text');
   if (el) el.parentElement.removeChild(el);
 };
