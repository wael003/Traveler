const urlBase = "http://localhost:3000";

async function getUserInfo(email) {
    let url = `${urlBase}/User/${email}`;
    let response = await fetch(url, {
        method: "GET"
    });
    return response.json();

}