import page from '../../node_modules/page/page.mjs'
import { html, render } from '../../node_modules/lit-html/lit-html.js'
import { login } from '../Tools/api.js';
import { navUpdate } from '../Tools/updateNav.js';


let temp = () => html `
<section id="login-page" class="auth">
<form id="login" @submit="${loginFunc}">

    <div class="container">
        <div class="brand-logo"></div>
        <h1>Login</h1>
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" placeholder="Sokka@gmail.com">

        <label for="login-pass">Password:</label>
        <input type="password" id="login-password" name="password">
        <input type="submit" class="btn submit" value="Login">
        <p class="field">
            <span>If you don't have profile click <a href="/register">here</a></span>
        </p>
    </div>
</form>
</section>
`


export async function loginView() {
    render(temp(), document.querySelector('main'));
}


async function loginFunc(event) {
    event.preventDefault();
    let form = event.target;
    let data = new FormData(form);
    let email = data.get('email');
    let password = data.get('password');

    if (email.trim != '' && password.trim() != '') {
        await login({ email: email, password: password });
        navUpdate();
        page.redirect('/home');
    } else {
        alert('All fields are required!')
    }
}