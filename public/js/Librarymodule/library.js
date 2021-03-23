

// let myvideo = document.querySelector('.myvideo'); 

// myvideo.addEventListener("error", function (e) {
//     play.style.visibility=  'hidden';
//     threedots.style.visibility=  'hidden';
// });


document.querySelector('.dots').addEventListener('click',()=> {
    let menu = document.getElementsByClassName('menu');

    menu.innerHTML += '<div class="dropdown-menu"><a class="dropdown-item" href="#">Action</a><a class="dropdown-item" href="#">Another action</a><a class="dropdown-item" href="#">Something else here</a</div>'
    console.log(menu.innerHTML);
})

// function displayMenu() {
//     let menu = document.getElementsByClassName('menu');

//     menu.innerHTML += '<div class="dropdown-menu"><a class="dropdown-item" href="#">Action</a><a class="dropdown-item" href="#">Another action</a><a class="dropdown-item" href="#">Something else here</a</div>'
//     console.log(menu.innerHTML);
// }
