// To select each checkbox on click
// passed this pointer as argument to select only perticular followers

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

function selectAll () {
    const allFollowBtn = document.querySelector('#select-all');
    const allFollowers = document.querySelectorAll("[data-select]");
    allFollowBtn.classList.toggle("all-selected")
    if(allFollowBtn.classList.contains("all-selected"))
    {
        allFollowBtn.innerHTML = "All Selected";
        allFollowers.forEach(follower => {
            selectAdd(follower);
        })
    }
    else
    {
        allFollowBtn.innerHTML = "Select All";
        allFollowers.forEach(follower => {
            selectRemove(follower);
        })
    }

    if (newParticipantsArray.length > 0) {
        newParticipantsArray = [];
    }


}


// POPUPS FUNCTIONALITY

const openPopup = document.querySelectorAll("[data-target]")
const closePopup = document.querySelectorAll("[data-close-button]")
const overlay = document.getElementById('overlay')

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

overlay.addEventListener('click',() => {
    const popups = document.querySelectorAll(".popup.active")
    popups.forEach(popup => {
        closePop(popup)
    })
})

function openPop(pop){
    if(pop==null) return;
    pop.classList.add('active')
    overlay.classList.add('active')
}

function closePop(pop){
    if(pop==null) return;
    pop.classList.remove('active')
    overlay.classList.remove('active')
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

function select(e) {
    const check = e.querySelector(".selected")
    check.classList.toggle("select")

    const checkArray = Array.prototype.slice.call(check.classList);

    if (checkArray.includes('select')) {
        updateParticipantArray(e.id ,'add')
    } else {
        updateParticipantArray(e.id ,'remove')
    }
}


// API Requests

const Continue = async (e) => {
    const selectAllButtons = Array.prototype.slice.call(document.querySelector('.select-all').classList);

    let data = { newParticipantsArray : newParticipantsArray };

    if (selectAllButtons.includes("all-selected")) data = { newParticipantsArray: [], view: [], isAllSelected: true };

    try {
        const updatedClash = await axios({
            method: 'POST',
            url: `/createclash/addParticipants/${window.location.href.split('addParticipants/')[1]}`,
            data : data
        });
        
        if (updatedClash.data.status === 'success') window.location.href = `/createclash/whocanwatch/${updatedClash.data.clash._id}`;

    } catch (err) {
        console.log(err);
    }
}

const ContinueWithoutAddingFollowers = (e) => {
    window.location.href = `/createclash/whocanwatch/${window.location.href.split('/addParticipants/')[1]}`;
}

const sendRequest = async () => {
    
    const invitationTo = document.querySelector('.invitation-bar').value.trim();

    if (invitationTo === '') return false;

    const data = invitationTo.split('').includes('@') ? { email: invitationTo, byInvite: true } : { username: invitationTo, byInvite: true };
    
    try {
        const updatedClash = await axios({
            method: 'POST',
            url: `/createclash/addParticipants/${window.location.href.split('addParticipants/')[1]}`,
            data : data
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

const deleteClash = async () => {
    try {
        const deletedClash = await axios({
            method: 'DELETE',
            url: `/createclash/deleteClash/${window.location.href.split('addParticipants/')[1]}`
        });


        if (deletedClash.status === 204 && deletedClash.data === '') window.location.href = '/library';
    } catch (err) {
        console.log(err.response);
    }
}

const showAlert = (type, message) => {
    let el;
    if (type === 'Success') el = `<h5 class="notify-text" style="font-size:16px; color:cadetblue;">${message}</h5>`;
    if (type === 'Error') el = `<h5 class="notify-text" style="font-size:16px; color:red";">${message}</h5>`;
    
    document.querySelector('.choose-friend-headline').insertAdjacentHTML('afterend', el);
    window.setTimeout(hideAlert, 2000);
};


const hideAlert = () => {
    const el = document.querySelector('.notify-text');
    if (el) el.parentElement.removeChild(el);
  };
