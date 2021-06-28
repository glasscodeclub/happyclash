// Some Previous Assumptions -> need ajax request to check if video exists or not and if its owner is the user or not

window.addEventListener('load', function () {
   if (window.location.href.includes('videoId')) {
      const uploadButton = document.querySelector('.uploadButton');
      uploadButton.value = `${window.location.href.split('?videoId=')[1]}`
      uploadButton.innerHTML = 'Uploaded <i class="far fa-check-circle successIcon"></i>';
   }
});

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
   const selectedAllFollowers = false;
   const rank = null;

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
            selectedAllFollowers,
            rank
        }
     });

      if (newClash.data.status === 'success' && newClash.data.newClash.mode === "Public") window.location.href = `/createclash/clashcreated/${newClash.data.newClash._id}`;
      if (newClash.data.status === 'success' && newClash.data.newClash.mode === "Friend") window.location.href = `/createclash/addParticipants/${newClash.data.newClash._id}`;

   } catch (err) {
      console.log(err);
   }
})
