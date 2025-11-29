import { getTopGenres, getTop } from "./userInfoAPICalls.mjs";

const resultSection = document.getElementById("results");

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

async function displayTopTracks() {
    const formElement = document.forms["get-top-tracks"]
    const form = formDataToJSON(formElement);
    console.log(form.tracksLength);
    const topTracks = await getTop("tracks", form.tracksLength);
    topTracks.items.forEach(item => {
        const track = document.createElement("div");
        track.innerHTML = `
        <img src="${item.album.images[2].url}" alt="${item.name} Cover Image">
        <p>${item.name} by <span id="track-artists"></span></p>
        `
        const artists = item.artists;
        const artistElement = document.getElementById("track-artists");
        const artistText = "";
        if (artists.length == 1) {
            artistElement.innerHTML = `${artists[0].name}`;
        }
        else {
            artists.forEach(artist =>
                artistText.concat(",", artist.name)
            )
            artistElement.innerHTML = artistText;
        }
        resultSection.appendChild(track);
    }
    );
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