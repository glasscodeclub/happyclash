function createFolder() {
    let list = document.querySelector('.folderList');

    let element = document.createElement('div');
    element.setAttribute('class','folder');

    let elementtext = document.createElement('input');
    elementtext.setAttribute('type','text');
    elementtext.setAttribute('class','createname');
    elementtext.setAttribute('onfocusout','setName()');
    elementtext.autofocus = true;

    let del = document.createElement('button');
    del.setAttribute('class','del');
    del.setAttribute('onclick','deleteElement()');
    let deltext = document.createTextNode('Delete');
    del.appendChild(deltext);

    element.appendChild(elementtext);
    element.appendChild(del);
    list.appendChild(element);

}

function editElement() {
    let edit = window.event.target;
    let element = edit.parentElement;
    
    element.innerHTML = '<input type="text" class="createname" onfocusout="setName()" value="'+element.querySelector('.createname').textContent+'"><button class="del" onclick="deleteElement()">Delete</button>';
    element.querySelector('.createname').select();
}

function setName() {
    let setname = window.event.target;
    let element = setname.parentElement;

    if(setname.value != null && setname.value != "") {
        element.innerHTML = '<div class="createname">'+setname.value+'</div><button class="edit" onclick="editElement()">Edit</button><button class="del" onclick="deleteElement()">Delete</button>';
    }
    else {
        element.innerHTML = '<div class="createname">'+'Untitled'+'</div><button class="edit" onclick="editElement()">Edit</button><button class="del" onclick="deleteElement()">Delete</button>';
    }
}

function deleteElement() {
    let delelement = window.event.target;
    let element = delelement.parentElement;

    element.remove();
}



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
    let password = document.getElementById('password');

    if(username.value == "" || username.value == null) {
        displayError('username','username');
    }


    if(password.value == "" || password.value == null) {
        displayError('password','password');
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


function removeMessage() {
    let alert = document.querySelector(".alert");

    alert.remove();
}
