

function displayError(classname,idname) {
    let username = document.querySelector("#" + idname);
    let emptyuser = document.querySelector("." + classname);

    if(username.value == null || username.value == "") {
        emptyuser.innerText = "This field can't be empty";
        emptyuser.style.color = "red";
    }
    else {
        emptyuser.innerText = "";
    }
}