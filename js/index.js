const form = document.querySelector("#github-form");
const userList = document.getElementById("user-list")
const reposList = document.getElementById("repos-list")

form.addEventListener("submit", search)

// username, avatar, and link for profile

function search(e) {
    e.preventDefault()
    userList.innerHTML = ""
    reposList.innerHTML = ""
    const username = e.target.search.value
    fetch(`https://api.github.com/search/users?q=${username}`)
    .then(resp => resp.json())
    .then(data => renderProfiles(data.items))
}

function renderProfiles(users) {
    users.forEach(user => renderProfile(user))
}

function renderProfile(user) {
    const login = user.login
    const avatar = user.avatar_url
    const url = user.html_url

    const li = document.createElement("li")
    li.id = login
    li.addEventListener("click", e => repoShower(e))

    const h2 = document.createElement("h2")
    h2.innerText = login

    const img = document.createElement("img")
    img.src = avatar
    img.style.height = "7rem"

    const a = document.createElement("a")
    a.innerText = url
    a.href = url
    li.append(h2, img, a)
    userList.append(li)
}

function repoShower(e) {
    const userPath = e.path[1].id
    fetch(`https://api.github.com/users/${userPath}/repos`)
    .then(resp => resp.json())
    .then(repos => appendRepos(repos))
}

function appendRepos(repos) {
    reposList.innerHTML = ""    
    repos.forEach(repo => appendRepo(repo))
}

function appendRepo(repo) {
    const li = document.createElement("li")
    li.innerText = repo.name
    reposList.append(li)
}