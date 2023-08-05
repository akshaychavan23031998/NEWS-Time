const API_KEY = "c15760b2b97f4ef28db8ead1fc835b82";

const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("India"));

function reload() {
    window.location.reload();
}
async function fetchNews(query) {
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    // console.log(res);
    const data = await res.json();
    // console.log(data);
    bindData(data.articles);
}
function bindData(articles) {
    const cardsContainer = document.getElementById('cards-container');
    const newsCardTemplate = document.getElementById('template-news-card');

    cardsContainer.innerHTML = '';

    articles.forEach(articles => {
        if(!articles.urlToImage) return;
        const cartClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cartClone, articles);
        cardsContainer.appendChild(cartClone);
    });
}

function fillDataInCard(cartClone, articles) {
    const newsImg = cartClone.querySelector('#news-img');
    const newsTitle = cartClone.querySelector('#news-title');
    const newsSource = cartClone.querySelector('#news-source');
    const newsDesc = cartClone.querySelector('#news-desc');

    newsImg.src = articles.urlToImage;
    newsTitle.innerHTML = articles.title;
    newsDesc.innerHTML = articles.description

    const date = new Date(articles.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta"
    })
    newsSource.innerHTML = `${articles.source.name}.${date}`;

    cartClone.firstElementChild.addEventListener("click", ()=> {
        window.open(articles.url, "_blank");
    });
}

let curSelectedNav = null;
function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove('active');
    curSelectedNav = navItem;
    curSelectedNav.classList.add('active');
}

const searchButton = document.getElementById('search-button');
const searchText = document.getElementById('search-text');

searchButton.addEventListener('click', () => {
    const query = searchText.value;
    if(!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove('active');
    curSelectedNav = null;
});


