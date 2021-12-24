import page from '../../node_modules/page/page.mjs'
import { html, render } from '../../node_modules/lit-html/lit-html.js'
import { del, get, post } from '../Tools/api.js';
import { userData } from '../Tools/user.js';


let temp = (game, isOwner, comments) => html `
<section id="game-details">
            <h1>Game Details</h1>
            <div class="info-section">

                <div class="game-header">
                    <img class="game-img" src="${game.imageUrl}" />
                    <h1>${game.title}</h1>
                    <span class="levels">MaxLevel: ${game.maxLevel}</span>
                    <p class="type">${game.category}</p>
                </div>

                <p class="text">${game.summary}</p>

                <!-- Bonus ( for Guests and Users ) -->
                <div class="details-comments">
                    <h2>Comments:</h2>
                    <ul>
                        <!-- list all comments for current game (If any) -->
                        ${comments.length > 0
                        ?comments.map(c=> html`
                            <li class="comment">
                                <p>Content: ${c.comment}</p>
                            </li>
                        `)
                        :html`<p class="no-comment">No comments.</p>`}
                        
                        
                    </ul>
                    <!-- Display paragraph: If there are no games in the database -->
                    
                </div>

                <!-- Edit/Delete buttons ( Only for creator of this game )  -->
                ${isOwner
                ? html`<div class="buttons">
                            <a href="/edit/${game._id}" class="button">Edit</a>
                            <a href="#" class="button" @click="${delElem}">Delete</a>
                        </div>`
                :''}
                
            </div>

            <!-- Bonus -->
            <!-- Add Comment ( Only for logged-in users, which is not creators of the current game ) -->
            ${!isOwner && userData() != null
            ?html`<article class="create-comment">
                    <label>Add new comment:</label>
                    <form @submit="${comment}" class="form">
                        <textarea name="comment" placeholder="Comment......"></textarea>
                        <input class="btn submit" type="submit" value="Add Comment">
                    </form>
                </article>`
            :''}
            

        </section>
`

let id = ''
export async function detailsView(ctx) {
    id = ctx.params.id;
    let game = await get('/data/games/' + id)
    let comments = await get(`/data/comments?where=gameId%3D%22${id}%22`)
    let isOwner = userData() != null && game._ownerId == userData().user_id

    render(temp(game, isOwner, comments), document.querySelector('main'));
}


async function delElem() {
    await del('/data/games/' + id);
    page.redirect('/home');
}

async function comment(event){
    event.preventDefault();
    let form = event.target;
    let data = new FormData(form);
    let comment = data.get('comment');
    if(comment.trim() != ''){
        let info = {comment: comment, gameId: id}
        post(info, '/data/comments');
        form.reset();
        page.redirect('/details/' + id);
    }else{
        alert('Comment must be filled!');
    }
    
}