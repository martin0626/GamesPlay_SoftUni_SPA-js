import page from '../node_modules/page/page.mjs'
import { html, render } from '../node_modules/lit-html/lit-html.js'
import { homeView } from './Views/home.js';
import { registerView } from './Views/register.js';
import { loginView } from './Views/login.js';
import { createView } from './Views/create.js';
import { logoutFunc } from './Views/logout.js';
import { navUpdate } from './Tools/updateNav.js';
import { allMoviesView } from './Views/allGames.js';
import { detailsView } from './Views/details.js';
import { editView } from './Views/edit.js';

page('/allMovies', allMoviesView)
page('/', homeView);
page('/home', homeView);
page('/login', loginView);
page('/register', registerView);
// page('/profile', profileView);
page('/create', createView);
page('/logout', logoutFunc);
page('/details/:id', detailsView);
page('/edit/:id', editView)
homeView()


page.start();
navUpdate()