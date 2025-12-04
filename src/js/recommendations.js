import { lookupSpotifyDetails } from "./userInfoAPICalls.mjs";

const section = document.querySelector("#recommendations");

async function displayTrackRecs() {
    section.innerHTML = ``;
    const trackIds = JSON.parse(localStorage.getItem("trackRecs"));
    console.log(trackIds);
    for (const id in trackIds) {
        const trackDetails = await lookupSpotifyDetails(id);
        console.log(trackDetails);

        const track = document.createElement("div");
        track.innerHTML = `
        <img src="${trackDetails.album.images[2].url}" alt="${trackDetails.name} Cover Image">
        <p>${trackDetails.name} by</p>
        `
        const artists = item.artists;
        const artistElement = document.createElement("span");
        let artistText = "";
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
                    artistText = artistText.concat(", ", artist.name)
                }
                artistCount += 1;
            }
            )
            artistElement.innerHTML = artistText;
        }
        track.appendChild(artistElement);
    };
}

displayTrackRecs();