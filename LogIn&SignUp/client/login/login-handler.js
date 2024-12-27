function login() {
    var email = document.getElementById("login-email").value;
    var password = document.getElementById("login-password").value;
    var sheme = { Email: email, Password: password };
    checkUserPassAndEmail(sheme)
        .then(data => {
            console.log(data);
            if (data.success == true) {
                document.getElementById("loginError").style.color = "#4CAF50";
                document.getElementById("loginError").innerHTML = "correct!";

                window.sessionStorage.setItem("Name" , data.tokens.userName);
                window.sessionStorage.setItem("Email" , data.tokens.email);

                window.location.href = "../Home/traveler/traveler/index.html";
            }
            else {
                document.getElementById("loginError").style.color = "red";
                document.getElementById("loginError").innerHTML = "Wrong Email or Password , please try again !error";
            }
        }).catch(err => {
            document.getElementById("loginError").style.color = "red";
            document.getElementById("loginError").innerHTML = "Wrong Email or Password , please try again !";
        })
}
let VerificationNumber;
let Enteredemail;


function checkEmail() {
    Enteredemail = document.getElementById("forgotEmail").value;
    checkEmailAndGetData(Enteredemail)
        .then(data => {

            document.getElementById("VerficationError").innerHTML = "Wait a moment...";
            VerificationNumber = generateRandomCode();

            var userModal = { UserName: data.UserName, Email: data.Email, VerificationCode: VerificationNumber };
            sendVerificationCode(userModal)
                .then(data => {
                    
                    if (data.ok) {
                        document.getElementById("VerficationError").innerHTML = "Fill in the verification code we sent to your email!";
                    } else {
                        document.getElementById("VerficationError").innerHTML = "Send Faild , please try again! ";
                    }
                })
                .catch(err => {
                    console.log(err);
                })
            


            document.getElementById('forgotPasswordModal').style.display = 'none';
            document.getElementById('forgotEmail').value = ''; // Clear the input
            document.getElementById("VerificationPasswordModal").style.display = "block";
            document.getElementById("Verifiaction").value = "";



        }
        ).catch(() => {

            document.getElementById("forgotError").innerHTML = "You are not signed up yet or try another email!";
        })
}

//RANDOM NUMBER
function generateRandomCode() {
    return Math.floor(1000 + Math.random() * 9000); // Ensures a 4-digit number
}


//CONFIRM THE V.CODE
function VerifiyLogin(){
    let Verifiaction = document.getElementById("Verifiaction").value;
    if (Verifiaction == VerificationNumber) {
        // Verification successful, proceed to rewrite password modal
        document.getElementById("VerificationPasswordModal").style.display = "none"; // Hide current modal
        document.getElementById("RewritePassword").style.display = "block"; // Show rewrite password modal
    } else {
        document.getElementById("VerficationError").innerHTML = "Wrong Verification Code!";
    }
}

//FORGET PASSWORD
function changePassword(email) {
    let NewPassword = document.getElementById("NewPassword").value;
    let ConfirmPassword = document.getElementById("ConfirmPassword").value;
    let errorDiv = document.getElementById("changePasswordError");


    const passwordMinLength = 8;
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (NewPassword.length < passwordMinLength) {
        errorDiv.textContent = `Password must be at least ${passwordMinLength} characters long.`;
        errorDiv.style.color = 'red';
        return;
    }

    if (!passwordRegex.test(NewPassword)) {
        errorDiv.textContent = 'Password must include uppercase, lowercase, number, and special character.';
        errorDiv.style.color = 'red';
        return;
    }

    if (NewPassword == ConfirmPassword) {
        //API
        let model = { Email: Enteredemail, Password: NewPassword, VerificationCode: 0 };
        updateUser(model)
            .then(data => {
                if (data.ok) {
                    document.getElementById("RewritePassword").style.display = "none";
                    document.getElementById("loginError").innerHTML = "Password Changed Successfully!";
                    document.getElementById("loginError").style.color = "#4CAF50";
                    document.getElementById("login-email").value = "";
                    document.getElementById("login-password").value = "";
                } else {
                    document.getElementById("RewritePassword").style.display = "none";
                    document.getElementById("loginError").innerHTML = "Password Change Failed!";
                }
            })
            .catch(err => {
                console.log(err);
            })





    } else {
        errorDiv.innerHTML = "Passwords do not match!";
    }
}