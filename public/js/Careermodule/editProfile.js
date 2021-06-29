const profile = document.getElementsByClassName("p1")

function RemoveClick(params) {
  profile[0].src = '/Images/defaultImage.jpg'
}

function ChangeClick(params) {
  console.log(params);
  console.log("Change button was hit");
}

function DeleteAccount() {
  console.log("Delete Account was Hit!");
}