import { redirectToAuthCodeFlow, getAccessToken, fetchProfile } from "./apiHandler.mjs";
import { checkTokenExpiration } from "./apiRefreshHandler.mjs";
import { loadHeaderFooter } from "./utils.mjs";

const clientId = import.meta.env.VITE_CLIENT_ID;
let accessToken = localStorage.getItem("access_token");
const section = document.getElementById("login-section");
const params = new URLSearchParams(window.location.search);
const code = params.get("code");

// Checks to see if the user has already logged in to determine whether to display the login button or "logged in as" content
async function home() {
if (!accessToken) {
    if (!code) {
        populateLogin();
    }
    else {
        await getAccessToken(clientId, code);
        accessToken = localStorage.getItem("access_token");
        const profile = await fetchProfile(accessToken);
        populateLoggedIn(profile);
    }
    }
else {
    checkTokenExpiration();
    accessToken = localStorage.getItem("access_token");
    const profile = await fetchProfile(accessToken);
    populateLoggedIn(profile);
}
};

loadHeaderFooter();
home();

// Provides a button for the user to login
function populateLogin() {
    section.innerHTML = `<button id="login-button">Login With Spotify</button>`;
    const button = document.getElementById("login-button");
    button.addEventListener("click", redirectToAuthCodeFlow.bind(this, clientId));
}

// Tells the user what Spotify account they are logged in to and gives them an option to log in again if they need to
function populateLoggedIn(profile) {
    section.innerHTML = `
    <p>Logged in as: ${profile.display_name}</p>
    <p>Not you? <span id="login-again">Login with a different profile.</span></p>
    <a href="../billboard/index.html">Billboard</a>`;
    const reLogin = document.getElementById("login-again");
    reLogin.addEventListener("click", redirectToAuthCodeFlow.bind(this, clientId));
}