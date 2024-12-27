// const urlBase = "http://localhost:3000";

// window.onload(e=>{
//     console.log("window loaded");
//     console.log(window.sessionStorage.length)
//     if(window.sessionStorage.length >1){
//         document.getElementById("login-btn").innerHTML = "Profile";
//     }else{
//         document.getElementById("login-btn").innerHTML = "Login";
//     }
// })
// document.getElementById("login-btn").textContent = "Profile";
let actionButton = document.getElementById("login-btn") ;
document.addEventListener('DOMContentLoaded', () => {
    console.log("window loaded");
    console.log(window.sessionStorage.length)
    if(window.sessionStorage.length >= 2){
        console.log(true);
        actionButton.textContent = "Profile";
        actionButton.onclick = () => window.location.href = './Profile';
    }else{
        console.log(false);
        actionButton.textContent = "Login";
        actionButton.onclick = () => window.location.href = '../../../login/LogIn.html';
    }

});