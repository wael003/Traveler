const urlBase = "http://localhost:3000";

async function addUser(user) {
    const response = await fetch(`${urlBase}/User`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user)
    });
    return response.json();

}
async function sendVerificationCode(params) {
    const response = await fetch(`${urlBase}/send-verification`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params),
    });
    return response;
}
async function checkUserPassAndEmail(user) {
    const response = await fetch(`${urlBase}/User/${user["Email"]}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user)
    });
    return response.json();

}
async function updateUser(user) {
    const response = await fetch(urlBase + "/User", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user)
    });
    return response;

}


// async function deleteNote(noteId) {
//     const response = await fetch(urlBase + "/notes/"+noteId, {
//         method : "DELETE",

//     });
//     return response;

// }
// async function getPasswordByEmail(emailUser) {
//     let url = `${urlBase}/User/${emailUser}/pass`;
//     let response = await fetch(url, {
//         method: "GET"
//     });
//     return response.json();

// }
async function checkEmailAndGetData(Email) {
    let url = `${urlBase}/User/${Email}`;
    let response = await fetch(url, {
        method: "GET"
    });
    return response.json();

}


async function checkUserInfo(params) {
    const response = await fetch(`${urlBase}/check-user`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params),
    });
    return response;
}
