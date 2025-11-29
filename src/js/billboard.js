import { getTopGenres, getTop } from "./userInfoAPICalls.mjs";

document.querySelector("#top-tracks-button").addEventListener("click", (e) => {
    e.preventDefault();
    displayTopTracks();
});

document.querySelector("#top-artists-button").addEventListener("click", (e) => {
    e.preventDefault();
    displayTopArtists();
});

document.querySelector("#top-genres-button").addEventListener("click", (e) => {
    e.preventDefault();
    displayTopGenres();
});

function displayTopTracks() {
    const formElement = document.forms["get-top-tracks"]
    const form = formDataToJSON(formElement);
    console.log(form);
    const url = "https://api.spotify.com/v1/me/top/tracks";
    //const topTracks = getTop(url, form.);
}

function displayTopArtists() {

}

function displayTopGenres() {

}

function formDataToJSON(formElement) {
    const formData = new FormData(formElement);
    const convertedJSON = {};
    formData.forEach((value, key) => {
        convertedJSON[key] = value;
    });
    return convertedJSON;
}