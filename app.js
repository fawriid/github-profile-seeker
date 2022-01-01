const APIURL = "https://api.github.com/users/";

const card = document.getElementById("card--wrapper")


async function getData(user) {
    const resp = await fetch(APIURL + user)
    const respData = await resp.json()
    
    getUser(respData)
    return respData
}
getData("lorin")
function getUser(data) {
    card.innerHTML = ""
    card.innerHTML = `
    <div class="img__wrapper">
                <img src="${data.avatar_url}" alt="">
            </div>
            <div class="info__wrapper">
                <h3>${data.login}</h3>
                <span>${data.name}</span>
                <p>${data.bio}</p>
                <div class="social">
                    <p>followers: <span>${data.followers}</span></p>
                    <p>following: <span>${data.following}</span></p>
                    <p>public_repos: <span>${data.public_repos}</span></p>
                </div>
            </div>
    `;
}
