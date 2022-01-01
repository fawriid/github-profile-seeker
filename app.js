const APIURL = "https://api.github.com/users/";

const card = document.getElementById("card--wrapper")


async function getData(user) {
    const resp = await fetch(APIURL + user)
    const respData = await resp.json()
    
    // getUser(respData)
    return respData
}


function getUser(data) {
    card.innerHTML = ""
    if (!(data.login)) {
        card.innerHTML = `
        <h1>User not found</h1>
        `
        
    }
     else {
        card.innerHTML = `
        <div class="img__wrapper">
                    <img src="${data.avatar_url}" alt="${data.login}picture">
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
}



const form = document.getElementById("search__form")
const search = document.getElementById("search")

form.addEventListener("submit", async (e) => {
    e.preventDefault()
    const data = await getData(search.value) 
    getUser(data)
    search.value = ""
})
