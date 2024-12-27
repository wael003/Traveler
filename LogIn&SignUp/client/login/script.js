document.getElementById('loginBtn').addEventListener('click', function() {
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('signupForm').style.display = 'none';
    this.classList.add('active');
    document.getElementById('signupBtn').classList.remove('active');
});

document.getElementById('signupBtn').addEventListener('click', function() {
    document.getElementById('signupForm').style.display = 'block';
    document.getElementById('loginForm').style.display = 'none';
    this.classList.add('active');
    document.getElementById('loginBtn').classList.remove('active');
});

document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = this.elements[0].value;
    const password = this.elements[1].value;

    if (email === '' || password === '') {
        document.getElementById('loginError').innerText = 'Please fill in all fields.';
    } else {
        // alert('Logged in successfully!');
    }
});

document.getElementById('signupForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const fullName = this.elements[0].value;
    const email = this.elements[1].value;
    const password = this.elements[2].value;

    if (fullName === '' || email === '' || password === '') {
        document.getElementById('signupError').innerText = 'Please fill in all fields.';
    } else {
        // alert('Signed up successfully!');
    }
});
// Show Forgot Password Modal
document.getElementById('forgotPasswordLink').addEventListener('click', function(e) {
    e.preventDefault();
    document.getElementById('forgotPasswordModal').style.display = 'block';
});

// Close Modal
document.getElementById('closeModal').addEventListener('click', function() {
    document.getElementById('forgotPasswordModal').style.display = 'none';
});
document.getElementById('closeModal3').addEventListener('click', function() {
    document.getElementById('VerifiyNewUser').style.display = 'none';
});
function changeEmailState(){
    document.getElementById('signup-email').style.border = ' 1px solid #ccc';
}
function changePasswordState(){
    document.getElementById('signup-password').style.border = ' 1px solid #ccc';
}
// document.getElementById('closeModal2').addEventListener('click', function() {
//     document.getElementById('VerificationPasswordModal').style.display = 'none';
// });

function closeSpan(){
    document.getElementById('VerificationPasswordModal').style.display = 'none';
}

// Send Reset Link Logic
// document.getElementById('sendResetLink').addEventListener('click', function() {
//     const email = document.getElementById('forgotEmail').value;
//     if (email === '') {
//         document.getElementById('forgotError').innerText = 'Please enter your email.';
//     } else {
//         alert(`Reset link sent to ${email}!`);
//         document.getElementById('forgotPasswordModal').style.display = 'none';
//         document.getElementById('forgotEmail').value = ''; // Clear the input
//         document.getElementById("VerificationPasswordModal").style.display = "block";
//     }
// });

// Close modal on click outside of the modal
window.onclick = function(event) {
    const modal = document.getElementById('forgotPasswordModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }

};


    const email = document.getElementById('signup-email');
    console.log("this is the email :" + email.value);

    document.getElementById('closeModal3').addEventListener('click', function() {
        document.getElementById('RewritePassword').style.display = 'none';
    });
    // const action = document.getElementById("sub");
    // action.onclick(sendEmail);

    
    // (function () {
    //     emailjs.init("vDrSciR36E6DvUNsW"); // Replace with your EmailJS user ID
    // })();

    // const sendEmail = () => {
    //     emailjs
    //         .send("service_m6ivpod", "template_8kzwktn", {
    //             to_name: email.value,
    //             from_name: "US",
    //             message: "This is a test email sent using EmailJS",
    //         })
    //         .then(
    //             (response) => {
    //                 console.log("SUCCESS!", response.status, response.text);
    //                 alert("Email sent successfully");
    //             },
    //             (error) => {
    //                 console.error("FAILED...", error);
    //                 alert("Failed to send email");
    //             }
    //         );
    // };



    function checkPass(){
        let NewPassword = document.getElementById("NewPassword").value ;
        let ConfirmPassword = document.getElementById("ConfirmPassword").value ;
        if(NewPassword != ConfirmPassword){
            document.getElementById("ConfirmPassword").style.background = "red";
        }
    }