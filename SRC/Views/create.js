import page from '../../node_modules/page/page.mjs'
import { html, render } from '../../node_modules/lit-html/lit-html.js'
import { editCreate } from '../Tools/editCreate.js';

let temp = () => html `
<section id="create-page" class="auth">
<form id="create" @submit='${editCreate}'>
    <div class="container">

        <h1>Create Game</h1>
        <label for="leg-title">Legendary title:</label>
        <input type="text" id="title" name="title" placeholder="Enter game title...">

        <label for="category">Category:</label>
        <input type="text" id="category" name="category" placeholder="Enter game category...">

        <label for="levels">MaxLevel:</label>
        <input type="number" id="maxLevel" name="maxLevel" min="1" placeholder="1">

        <label for="game-img">Image:</label>
        <input type="text" id="imageUrl" name="imageUrl" placeholder="Upload a photo...">

        <label for="summary">Summary:</label>
        <textarea name="summary" id="summary"></textarea>
        <input class="btn submit" type="submit" value="Create Game">
    </div>
</form>
</section>
`


export async function createView() {
    render(temp(), document.querySelector('main'));
}