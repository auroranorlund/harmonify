import { getTopGenres, getTop } from "./userInfoAPICalls.mjs";
import { getTrackRecs } from "./reccobeatsHandler.mjs";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

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
    const topTracks = await getTop("tracks", form.tracksLength);
    resultSection.innerHTML = `<a href="../recommendations/index.html">Get Music Recommendations</a>`;
    console.log(topTracks);
    const songIds = [];
    let trackCount = 1;
    topTracks.items.forEach(item => {
        songIds.push(item.id);

        const track = document.createElement("div");
        track.classList.add("details");

        const countElement = document.createElement("span");
        countElement.innerHTML = `#${trackCount}`
        track.appendChild(countElement);

        const imgElement = document.createElement("img");
        imgElement.setAttribute("src", item.album.images[1].url);
        imgElement.setAttribute("alt", `${item.name} Cover Image`);
        track.appendChild(imgElement);

        const labelElement = document.createElement("div");

        const nameElement = document.createElement("p");
        nameElement.innerHTML = item.name;
        labelElement.appendChild(nameElement);

        const artists = item.artists;
        const artistElement = document.createElement("p");
        artistElement.classList.add("artist-info");
        let artistText = "";
        let artistCount = 1;
        if (artists.length == 1) {
            artistElement.innerHTML = ` by ${artists[0].name}`;
        }
        else {
            artists.forEach(artist => {
                if (artistCount == 1) {
                    artistText = ` by ${artist.name}`;
                }
                else {
                    artistText = artistText.concat(", ", artist.name)
                }
                artistCount += 1;
            }
            )
            artistElement.innerHTML = artistText;
        }
        labelElement.appendChild(artistElement);
        track.appendChild(labelElement);
        resultSection.appendChild(track);
        trackCount += 1;
    }
    );
    const trackRecs = await getTrackRecs(topTracks);
    localStorage.setItem("trackRecs", JSON.stringify(trackRecs));
}

async function displayTopArtists() {
    const formElement = document.forms["get-top-artists"];
    const form = formDataToJSON(formElement);
    const topArtists = await getTop("artists", form.artistsLength);
    resultSection.innerHTML = ``;
    console.log(topArtists);
    let artistCount = 1;
    topArtists.items.forEach(item => {
        const artist = document.createElement("div");
        artist.classList.add("details");
        artist.innerHTML = `
        <span>#${artistCount}</span> <img src="${item.images[0].url}" alt="Picture of ${item.name}";></p>
        <p>${item.name}</p>
        `
        resultSection.appendChild(artist);
        artistCount += 1;
    });
}

async function displayTopGenres() {
    const formElement = document.forms["get-top-genres"];
    const form = formDataToJSON(formElement);
    const topArtists = await getTop("artists", form.genresLength);
    const topGenres = getTopGenres(topArtists);
    resultSection.innerHTML = ``;
    console.log(topGenres);
    let genreCount = 1;
    topGenres.forEach(item => {
        const genre = document.createElement("div");
        genre.classList.add("details");
        genre.classList.add("genres");
        genre.innerHTML = `
        <p><span>#${genreCount}</span> ${item}</p>
        `
        resultSection.appendChild(genre);
        genreCount += 1;
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