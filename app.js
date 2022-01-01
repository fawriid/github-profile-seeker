const APIURL = "https://api.github.com/users/";

const card = document.getElementById("card--wrapper");

async function getData(user) {
    const resp = await fetch(APIURL + user);
    const respData = await resp.json();

    // getUser(respData)
    return respData;
}

function getUser(data) {
    card.innerHTML = "";
    if (!data.login) {
        card.innerHTML = `
        <h1>User not found</h1>
        `;
    } else {
        card.innerHTML = `
                <div class="img__wrapper">
                    <a href="${data.avatar_url}" target="_blank">
                        <img src="${data.avatar_url}" alt="${data.login}picture">
                    </a>
                </div>
                <div class="info__wrapper" id="info--wrapper">
                    <h3>${data.login}</h3>
                    <span>${data.name}</span>
                    <p>${data.bio}</p>
                    <div class="social">
                        <p>followers: <span>${data.followers}</span></p>
                        <p>following: <span>${data.following}</span></p>
                        <p id="repos">public_repos: <span>${data.public_repos}</span></p>
                    </div>
                </div>
        `;

        const infoWrapper = document.getElementById("info--wrapper");
        const repos = document.getElementById("repos");
        repos.style.cursor = "pointer";

        const ul = document.createElement("ul");
        ul.classList.add("repos__ul", "toggle");

        repos.addEventListener("click", async () => {
            ul.classList.toggle("toggle");

            if (ul.childNodes.length < 1) {
                const resp = await fetch(data.repos_url);
                const respData = await resp.json();

                respData.forEach((element) => {
                    const li = document.createElement("li");
                    const a = document.createElement("a");
                    a.innerText = `${element.name}`;
                    a.href = `${element.html_url}`;
                    a.target = `_blank`;
                    li.appendChild(a);
                    ul.appendChild(li);
                });
                infoWrapper.appendChild(ul);
            }
        });
    }
}

const form = document.getElementById("search__form");
const search = document.getElementById("search");

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = await getData(search.value);
    getUser(data);
    search.value = "";
});
