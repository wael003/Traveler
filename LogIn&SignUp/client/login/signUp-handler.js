let randomDigit;

function signup() {

    const email = document.getElementById("signup-email").value.trim();
    const password = document.getElementById("signup-password").value.trim();
    const username = document.getElementById("signup-userName").value.trim();
    const errorDiv = document.getElementById("passwordError");

    const passwordMinLength = 8;
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (password.length < passwordMinLength) {
        errorDiv.textContent = `Password must be at least ${passwordMinLength} characters long.`;
        errorDiv.style.color = 'red';
        document.getElementById('signup-password').style.border  = "2px solid red"
        return;
    }

    if (!passwordRegex.test(password)) {
        errorDiv.textContent = 'Password must include uppercase, lowercase, number, and special character.';
        errorDiv.style.color = 'red';
        document.getElementById('signup-password').style.border  = "2px solid red"
        return;
    }
    if (checkEmailProvider(email)) {
        
        const userModal = { Email: email, Password: password };
    
        checkUserInfo(userModal)
            .then(async (response) => {
                if (response.ok) {
                    const data = await response.json();
                    if (data.exists) {
                        console.log("User found, don't complete!");
                        document.getElementById("signupError").innerHTML = "Failed to add user. Email might already exist.";
                    } else {
                        randomDigit = generateRandomCode();
                        document.getElementById("VerifiyNewUser").style.display = "block";
                        document.getElementById("VerficationUserError").innerHTML = "Wait a moment...";
                        console.log("No user found, complete...");
                        const userModalToSendEmail = { UserName: username, Email: email, VerificationCode: randomDigit };
                        sendVerificationCode(userModalToSendEmail)
                            .then(async (response) => {
                               
                                if (response.ok) {
                                    document.getElementById("VerficationUserError").innerHTML = "Fill in the verification code we sent to your email!";
                                } else {
                                    const errorData = await response.json();
                                    console.error("Verification failed:", errorData);
                                    document.getElementById("VerficationUserError").innerHTML = "Send failed, please try again!";
                                }
                            })
                            .catch((err) => {
                                console.error("Error sending verification code:", err);
                            });
                    }
                } else {
                    console.error("Failed to check user info:", response);
                }
            })
            .catch((err) => {
                console.error("Error checking user info:", err);
            });
    }else{
        document.getElementById("signupError").innerHTML = "Email provider not supported , try another one!";
        document.getElementById("signup-email").style.border = "2px solid red";
    }
}

function checkEmailProvider(email){
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    const yahooRegex = /^[a-zA-Z0-9._%+-]+@yahoo\.com$/;
    const outlookRegex = /^[a-zA-Z0-9._%+-]+@outlook\.$/;
    const hotmailRegex = /^[a-zA-Z0-9._%+-]+@hotmail\.$/;

    if (gmailRegex.test(email)) {
        return true;
    } else if (yahooRegex.test(email)) {
        return true;
    } else if (outlookRegex.test(email)) {
        return true;
    } else if (hotmailRegex.test(email)) {
        return true;
    } else {
        return false;
    }
}

function VerifiyUser(){
    let username = document.getElementById("signup-userName").value;
    const verificationCode = document.getElementById("VerifiactionNewUser").value;
    let email = document.getElementById("signup-email").value;
    let password = document.getElementById("signup-password").value;
    if (verificationCode == randomDigit) {
        document.getElementById("VerifiyNewUser").style.display = "none";
        document.getElementById("VerifiactionNewUser").value = "";
        const userModal = { UserName : username,Email: email, Password: password };
        addUser(userModal)
        .then(res => {
            if (res.success) {
                // Reset form fields
                document.getElementById("signupError").innerHTML = "User add successfully.";
                document.getElementById("signup-userName").value = "";
                document.getElementById("signup-password").value = "";
                document.getElementById("signup-email").value = "";
                window.sessionStorage.setItem("Name",res.tokens.userName);
                window.sessionStorage.setItem("Email" , res.tokens.Email );
                window.location.href = "../Home/traveler/traveler/index.html";
                
            } else {
                document.getElementById("signupError").innerHTML = "Failed to add user. Email might already exist.";
                
            }
        })
        .catch(err => {
            console.error("Error adding user:", err);
            document.getElementById("signupError").innerHTML = "An error occurred while signing up.";
       
        });

        
        } else {
            document.getElementById("VerficationUserError").innerHTML = "Wrong Verification Code!";


}



}

