export function userData() {
    return JSON.parse(sessionStorage.getItem('userInfo'));
}