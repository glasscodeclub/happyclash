
let k = true;
let mytimer = setInterval(animate,500);

function animate() {
    let alert = document.querySelector(".alert");
    if(alert)
    {
        if(k == true) {
            alert.style.backgroundColor = "rgb(240, 188, 188)";
        } else {
            alert.style.backgroundColor = "#f8d7da";
        } 
    
        (k == true)? k = false: k = true;
    }
}

setTimeout(() => {
    clearInterval(mytimer);
}, 4500);



function removeMessage() {
    let alert = document.querySelector(".alert");

    alert.remove();
}
