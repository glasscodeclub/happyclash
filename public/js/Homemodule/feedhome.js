function changeColor() {
  console.log("changeColor");
  let public = document.getElementById("public");
  let friends = document.getElementById("friends");

  let e = window.event;
  let colored, plain;

  if (e.target === public) {
    colored = public;
    plain = friends;
  } else {
    colored = friends;
    plain = public;
  }

  colored.style.background =
    "linear-gradient(81.23deg, #7C49F6 9.3%, #FF53B7 51.61%, #FFD458 97.6%)";
  colored.style.color = "white";
  colored.style.borderRadius = "0.25rem";
  colored.style.border = "none";
  colored.style.outline = "none";
  colored.style.boxShadow = "none";

  plain.style.background = "white";
  plain.style.color = "black";
  plain.style.boxShadow = "0px 1px 7px rgba(0, 0, 0, 0.15)";
}

function badgeClick(elem) {
  console.log(this);
}

function reload(){
  console.log("Reload button was hit")
}