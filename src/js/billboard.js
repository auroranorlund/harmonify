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
    resultSection.innerHTML = ``;
    console.log(topTracks);
    let trackCount = 1;
    topTracks.items.forEach(item => {
        console.log(item);
        const track = document.createElement("div");
        track.innerHTML = `
        <p>${trackCount}. <img src="${item.album.images[2].url}" alt="${item.name} Cover Image"></p>
        <p>${item.name} by</p>
        `
        const artists = item.artists;
        const artistElement = document.createElement("span");
        const artistText = "";
        let artistCount = 1;
        if (artists.length == 1) {
            artistElement.innerHTML = `${artists[0].name}`;
        }
        else {
            artists.forEach(artist => {
                if (artistCount == 1) {
                    artistText = artist.name;
                }
                else {
                    artistText = artistText.concat(",", artist.name)
                }
                artistCount += 1;
            }
            )
            artistElement.innerHTML = artistText;
        }
        track.appendChild(artistElement);
        resultSection.appendChild(track);
    }
    );
}
async function displayTopArtists() {
    const formElement = document.forms["get-top-artists"];
    const form = formDataToJSON(formElement);
    const topArtists = await getTop("artists", form.artistsLength);
    resultSection.innerHTML = ``;
    console.log(topArtists);
    let artistCount = 1;
    topArtists.items.forEach(item => {
        console.log(item);
        const artist = document.createElement("div");
        artist.innerHTML = `
        <p>${artistCount}. <img src="${item.images[0].url}" alt="Picture of ${item.name}";></p>
        <p>${item.name}</p>
        `
        resultSection.appendChild(artist);
    });
}

async function displayTopGenres() {
    const formElement = document.forms["get-top-genres"];
    const form = formDataToJSON(formElement);
    const topArtists = await getTop("artists", form.artistsLength);
    const topGenres = getTopGenres(topArtists);
    resultSection.innerHTML = ``;
    console.log(topGenres);
    genreCount = 1;
    topGenres.forEach(item => {
        console.log(item);
        const genre = document.createElement("div");
        genre.innerHTML = `
        <p>${genreCount}. ${item}</p>
        `
        resultSection.appendChild(genre);
    });
}

function formDataToJSON(formElement) {
    const formData = new FormData(formElement);
    const convertedJSON = {};
    formData.forEach((value, key) => {
        convertedJSON[key] = value;
    });
    return convertedJSON;
}