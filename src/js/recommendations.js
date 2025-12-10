import { lookupSpotifyDetails } from "./userInfoAPICalls.mjs";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

const section = document.querySelector("#recommendations");

async function displayTrackRecs() {
    section.innerHTML = ``;
    const trackIds = JSON.parse(localStorage.getItem("trackRecs"));
    console.log(trackIds);
    for (const id in trackIds) {
        const trackDetails = await lookupSpotifyDetails(trackIds[id]);
        console.log(trackDetails);

        const track = document.createElement("div");
        track.classList.add("details");

        const imgElement = document.createElement("img");
        imgElement.setAttribute("src", trackDetails.album.images[1].url);
        imgElement.setAttribute("alt", `${trackDetails.name} Cover Image`);
        track.appendChild(imgElement);

        const labelElement = document.createElement("div");

        const nameElement = document.createElement("p");
        nameElement.innerHTML = trackDetails.name;
        labelElement.appendChild(nameElement);

        const artists = trackDetails.artists;
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
        section.appendChild(track);
    };
}

displayTrackRecs();