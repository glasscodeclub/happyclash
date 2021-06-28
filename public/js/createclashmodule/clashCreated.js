function done() {
    window.location.href = '/library';
}

function redirectToParticipantsPage  () {
    window.location.href = `/clashdetails/participants/${window.location.href.split('clashcreated/')[1]}`
}