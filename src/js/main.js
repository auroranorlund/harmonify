import { redirectToAuthCodeFlow, getAccessToken, fetchProfile } from "./apiHandler.mjs";
import { checkTokenExpiration } from "./apiRefreshHandler.mjs";

const clientId = import.meta.env.VITE_CLIENT_ID;
let accessToken = localStorage.getItem("access_token");
const section = document.getElementById("login-section");
const params = new URLSearchParams(window.location.search);
const code = params.get("code");

async function home() {
    if (!code) {
        populateLogin();
    } else {
        if (!accessToken) {
            await getAccessToken(clientId, code);
        }
        else {
            checkTokenExpiration();
        }
        accessToken = localStorage.getItem("access_token");
        const profile = await fetchProfile(accessToken);
        populateLoggedIn(profile);
    }
};

home();

function populateLogin() {
    section.innerHTML = `<button id="login-button">Login With Spotify</button>`;
    const button = document.getElementById("login-button");
    button.addEventListener("click", redirectToAuthCodeFlow.bind(this, clientId));
}

function populateLoggedIn(profile) {
    section.innerHTML = `
    <p>Logged in as: ${profile.display_name}</p>
    <p>Not you? <span id="login-again">Login with a different profile.</span></p>`;
    const reLogin = document.getElementById("login-again");
    reLogin.addEventListener("click", redirectToAuthCodeFlow.bind(this, clientId));
}