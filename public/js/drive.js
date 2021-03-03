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
    
    element.innerHTML = '<input type="text" class="createname" value="'+element.querySelector('.createname').textContent+'"><button class="del" onclick="deleteElement()">Delete</button>';
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