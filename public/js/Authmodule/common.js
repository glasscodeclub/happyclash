

function displayError(classname,idname) {
    let fieldname = document.querySelector("#" + idname);
    let emptyfield = document.querySelector("." + classname);

    if(fieldname.value == null || fieldname.value == "") {
        emptyfield.innerHTML = "This field can't be empty";
        emptyfield.style.color = "red";
    }
    else {
        emptyfield.innerHTML = "";
    }
}


function checkInputfields() {
    let username = document.getElementById('username');
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    let confirm = document.getElementById('confirm');

    if(username.value == "" || username.value == null) {
        displayError('username','username');
    }

    if(email.value == "" || email.value == null) {
        displayError('email','email');
    }

    if(password.value == "" || password.value == null) {
        displayError('password','password');
    }

    if(confirm.value == "" || confirm.value == null) {
        displayError('confirm','confirm');
    }
}


function checkPasswordEquality() {
    let confirm = document.querySelector('#confirm');
    let password = document.querySelector('#password');
    let confirmpass = document.querySelector('.confirm');

    if(password.value != null || confirm.value != null)
    {
        if(password.value != confirm.value) {
            confirmpass.innerHTML = "<strong>Passwords don't match</strong>";
            confirmpass.style.color = "red";
            return false;
        }
        else {
            confirmpass.innerHTML = "";
            return true;
        }
    }
    return true;
}