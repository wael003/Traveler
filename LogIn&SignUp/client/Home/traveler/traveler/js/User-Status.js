
let actionButton = document.getElementById("login-btn") ;
document.addEventListener('DOMContentLoaded', () => {
    console.log("window loaded");
    console.log(window.sessionStorage.length)
    if(window.sessionStorage.length >= 2){

        getUserInfo(window.sessionStorage.getItem("Email"))
        .then(data=>{
            console.log(data);
            document.getElementById("User").textContent = data.UserName;
            document.getElementById("ProfilePic").src = data.ProfilePic;
            document.getElementById("username").textContent = data.UserName;
            data.Bio ? document.getElementById("bio").textContent = data.Bio : document.getElementById("bio").textContent = "null";
            document.getElementById("email").textContent = data.Email;
            data.Phone ? document.getElementById("address").textContent = data.Address :document.getElementById("address").textContent = "null";
            data.Address ? document.getElementById("phone").textContent = data.Phone : document.getElementById("phone").textContent = "null";
        })
        .catch(err =>{
            console.log(err);
        })

        console.log(true);
        actionButton.textContent = "Profile";
        actionButton.onclick = () => window.location.href = 'Profile.html';
       

    }else{
        console.log(false);
        actionButton.textContent = "Login";
        actionButton.onclick = () => window.location.href = '../../../login/LogIn.html';
    }

});