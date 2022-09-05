const API_URL = 'https://api.github.com/users/';

const SEARCH_FORM = document.querySelector('.user-form');
const SEARCH_INPUT = document.querySelector('.search'); 
const MAIN = document.querySelector('.main')

async function getProfile(username) {
    try {
        const { data } = await axios(API_URL + username)

        createProfileCard(data)
        getRepos(username)
    } catch (err) {
        if (err.response.status == 404)
        createErrorCard('Not found')
    }
}

async function getRepos(username) {
    try {
        const { data } = await axios(API_URL + username + '/repos?sort=created')

        attachRepos(data)
    } catch (error) {
        createErrorCard('Problem Fetching Repositories')
    }
}

function createProfileCard(user) {
    const CARD_HTML = `<div class="card">
    <div>
        <img src="${user.avatar_url}" alt="${user.name}" class="profile-pic">
    </div>
    <div class="user-detail">
        <h2>${user.name}</h2>
        <p>${user.bio}</p>

        <ul>
            <li>${user.followers} <strong>Followers</strong></li>
            <li>${user.following} <strong>Following</strong></li>
            <li>${user.public_repos} <strong>Repositories</strong></li>
        </ul>
        <div id="repo-container"></div>
    </div>  
</div>`

    MAIN.innerHTML = CARD_HTML
}

function createErrorCard(msg) {
    const CARD_HTML = `<div class="card">
                        <h1>${msg}</h1>
                        </div>`

    MAIN.innerHTML = CARD_HTML
}


function attachRepos(repos) {
    const REPOSCONTAINER = document.querySelector('#repo-container');
    
    repos
        .slice(0, 5)
        .forEach(repo => {
            const REPOLINK = document.createElement('a')
            REPOLINK.classList.add('repo')
            REPOLINK.href = repo.html_url
            REPOLINK.target = '_blank'
            REPOLINK.innerHTML = repo.name

            REPOSCONTAINER.appendChild(REPOLINK)
    })
    
}



SEARCH_FORM.addEventListener('submit', (event) => {
    event.preventDefault()

    const USER_NAME = SEARCH_INPUT.value

    if (USER_NAME) {
        getProfile(USER_NAME)

        SEARCH_INPUT.value = ''
    }
})






