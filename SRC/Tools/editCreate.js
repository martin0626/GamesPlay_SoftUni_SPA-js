import { post, put } from "./api.js";
import page from '../../node_modules/page/page.mjs'


export async function editCreate(event) {
    event.preventDefault();
    let formElem = document.querySelector('form');
    let data = new FormData(formElem);
    let title = data.get('title');
    let category = data.get('category');
    let maxLevel = data.get('maxLevel');
    let imageUrl = data.get('imageUrl')
    let summary = data.get('summary');

    if (title.trim() != '' && category.trim() != '' && imageUrl.trim() != '' && maxLevel.trim() != '' && summary.trim() != '') {

        let info = {
            title: title,
            category: category,
            maxLevel: maxLevel,
            imageUrl: imageUrl,
            summary: summary
        }

        //To Implemnt
        if (event.target.id == 'edit') {
            let id = event.target.querySelector('div').id;
            await put(info, '/data/games/' + id);
        } else {
            await post(info, '/data/games');
        }
        page.redirect('/home');

    } else {

        alert('All fields are required!');
    }
}