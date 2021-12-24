import page from '../../node_modules/page/page.mjs'
import { html, render } from '../../node_modules/lit-html/lit-html.js'
import {get } from '../Tools/api.js';


let temp = (data) => html `
<section id="welcome-world">

<div class="welcome-message">
    <h2>ALL new games are</h2>
    <h3>Only in GamesPlay</h3>
</div>
<img src="./images/four_slider_img01.png" alt="hero">

<div id="home-page">
    <h1>Latest Games</h1>
   ${data.length > 0
    ?data.map(game => html`
    <div class="game">
        <div class="image-wrap">
            <img src="${game.imageUrl}">
        </div>
        <h3>${game.title}</h3>
        <div class="rating">
            <span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
        </div>
        <div class="data-buttons">
            <a href="/details/${game._id}" class="btn details-btn">Details</a>
        </div>
    </div> 
    `)
    :html`<p class="no-articles">No games yet</p>`
    }
    

    <!-- Display paragraph: If there is no games  -->
    
</div>
</section>
`


export async function homeView() {
    let data = await get('/data/games?sortBy=_createdOn%20desc&distinct=category')
    if (data.length > 3){
        data = data.slice(0, 3);
    }
    render(temp(data), document.querySelector('main'));
}