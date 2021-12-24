import { logout } from "../Tools/api.js";
import { navUpdate } from "../Tools/updateNav.js";
import page from "../../node_modules/page/page.mjs"

export async function logoutFunc() {
    await logout();
    navUpdate();
    page.redirect('/home')
}