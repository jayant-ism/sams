let userName = sessionStorage.getItem("name");
let point = sessionStorage.getItem("point");

document.querySelector(".user_name").innerHTML = userName;
document.querySelector(".points").innerHTML = point;
