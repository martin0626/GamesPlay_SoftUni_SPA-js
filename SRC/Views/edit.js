import page from '../../node_modules/page/page.mjs'
import { html, render } from '../../node_modules/lit-html/lit-html.js'
import {get } from '../Tools/api.js';
import { editCreate } from '../Tools/editCreate.js';

let temp = (game) => html `
<section id="edit-page" class="auth">
<form id="edit" @submit="${editCreate}">
    <div id="${game._id}" class="container">
        <h1>Edit Game</h1>
        <label for="leg-title">Legendary title:</label>
        <input type="text" id="title" name="title" value="${game.title}">

        <label for="category">Category:</label>
        <input type="text" id="category" name="category" value="${game.category}">

        <label for="levels">MaxLevel:</label>
        <input type="number" id="maxLevel" name="maxLevel" min="1" value="${game.maxLevel}">

        <label for="game-img">Image:</label>
        <input type="text" id="imageUrl" name="imageUrl" value="${game.imageUrl}">

        <label for="summary">Summary:</label>
        <textarea name="summary" id="summary">${game.summary}</textarea>
        <input class="btn submit" type="submit" value="Edit Game">

    </div>
</form>
</section>
`


export async function editView(ctx) {
    let id = ctx.params.id;
    let game = await get('/data/games/' + id)
    render(temp(game), document.querySelector('main'));
}