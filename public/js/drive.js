


function createFolder() {
    let list = document.querySelector('.folderList');

    let element = document.createElement('div');
    element.setAttribute('class','folder');

    let elementtext = document.createElement('input');
    elementtext.setAttribute('type','text');
    elementtext.setAttribute('class','createname');

    let edit = document.createElement('button');
    edit.setAttribute('class','edit');
    let btntext = document.createTextNode('Edit name');
    edit.appendChild(btntext);

    let del = document.createElement('button');
    del.setAttribute('class','del');
    let deltext = document.createTextNode('Delete');
    del.appendChild(deltext);

    element.appendChild(elementtext);
    element.appendChild(edit);
    element.appendChild(del);
    list.appendChild(element);
}

// let folder = document.querySelector('.folder');
let createname = document.querySelector('.createname');

if(createname != null) {
    createname.addEventListener('focusout',()=> {
        
    
        if(createname.value == null)
        {
            folder.innerHTML = '<div class="createname">Untitled</div>';
        }
        else
        {
            folder.innerHTML = '<div class="createname">' + createname.value + '</div>';
        }
    })
}

// let edit = document.querySelector('.edit');

// edit.addEventListener('click',()=> {
//     let createname = document.querySelector('.createname');

//     createname.innerHTML = '<input type="text" class="createname" value=createname.value>';
// })

// let del = document.querySelector('.del');

// if(del && createname) {
//     del.addEventListener('click',()=> {
//         this.parent('div.folder').remove();
//     })
// }