
let k = true;
let mytimer = setInterval(animate,500);

function animate() {
    let alert_red = document.getElementById("alert_red");
    let alert_green = document.getElementById("alert_green");
    if(alert_red)
    {
        if(k == true) {
            alert_red.style.backgroundColor = "rgb(240, 188, 188)";
        } else {
            alert_red.style.backgroundColor = "#f8d7da";
        } 
    
        (k == true)? k = false: k = true;
    }
    if(alert_green)
    {
        if(k == true) {
            alert_green.style.backgroundColor = "#00ff7f";
        } else {
            alert_green.style.backgroundColor = "#00cc66";
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
