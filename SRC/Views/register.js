import page from '../../node_modules/page/page.mjs'
import { html, render } from '../../node_modules/lit-html/lit-html.js'
import { register } from '../Tools/api.js';
import { navUpdate } from '../Tools/updateNav.js';


let temp = () => html `
<section id="register-page" class="content auth">
            <form id="register" @submit="${registerFunc}">
                <div class="container">
                    <div class="brand-logo"></div>
                    <h1>Register</h1>

                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" placeholder="maria@email.com">

                    <label for="pass">Password:</label>
                    <input type="password" name="password" id="register-password">

                    <label for="con-pass">Confirm Password:</label>
                    <input type="password" name="confirm-password" id="confirm-password">

                    <input class="btn submit" type="submit" value="Register">

                    <p class="field">
                        <span>If you already have profile click <a href="/login">here</a></span>
                    </p>
                </div>
            </form>
        </section>
`


export async function registerView() {
    render(temp(), document.querySelector('main'));
}

async function registerFunc(event) {
    event.preventDefault();
    let form = event.target;
    let data = new FormData(form);
    let email = data.get('email');
    let password = data.get('password');
    let rePass = data.get('confirm-password')

    if (email.trim != '' && password.trim() != '' && rePass == password) {
        await register({ email: email, password: password });
        navUpdate();
        page.redirect('/home');
    } else {
        alert('All fields are required!')
    }
}