import page from '../../node_modules/page/page.mjs'
import { html, render } from '../../node_modules/lit-html/lit-html.js'
import {get } from '../Tools/api.js';


let temp = (data) => html `
<section id="catalog-page">
<h1>All Games</h1>
<!-- Display div: with information about every game (if any) -->
${data.length > 0 
?data.map(game => html`
    <div class="allGames">
        <div class="allGames-info">
            <img src="${game.imageUrl}">
            <h6>${game.category}</h6>
            <h2>${game.title}</h2>
            <a href="/details/${game._id}" class="details-button">Details</a>
        </div>
    </div>
`)
:html`<h3 class="no-articles">No articles yet</h3>`
}
</section>
`


export async function allMoviesView() {
    let data = await get('/data/games?sortBy=_createdOn%20desc')
    render(temp(data), document.querySelector('main'));
}