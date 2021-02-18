

let k = true;
let mytimer = setInterval(animate,450);

function animate() {
    let alert = document.querySelector(".alert");
    if(k == true) {
        alert.style.backgroundColor = "rgb(240, 188, 188)";
    } else {
        alert.style.backgroundColor = "#f8d7da";
    } 

    (k == true)? k = false: k = true;
}

setTimeout(() => {
    clearInterval(mytimer);
}, 6000);

// document.addEventListener("reload",()=> {
//     let alert = document.querySelector(".alert");

//     alert.style.visibility = "hidden";
// });

function removeMessage() {
    let alert = document.querySelector(".alert");

    alert.style.visibility = "hidden";
}
