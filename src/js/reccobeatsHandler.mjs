import { lookupSpotifyDetails } from "./userInfoAPICalls.mjs";

const baseURL = "https://api.reccobeats.com/v1/track/recommendation";

export async function getTrackRecs(topTracks) {
    let songIds = [];
    let reccomendIds = [];
    for (const item of topTracks.items) {
        const id = item.id;
        songIds.push(id);
        if (songIds.length == 5) {
            const url = `https://api.reccobeats.com/v1/track/recommendation?size=5&seeds=${songIds[0]},${songIds[1]},${songIds[2]},${songIds[3]},${songIds[4]}`;
            const myHeaders = new Headers();
            myHeaders.append("Accept", "application/json");
            const requestOptions = {
                method: "GET",
                headers: myHeaders,
                redirect: "follow"
            };
            const result = await fetch(url, requestOptions);
            console.log(result);
            const response = await result.json();
            console.log(response);
            for (const item of response) {
                const recId = item.href.replace("https://open.spotify.com/track/", "");
                reccomendIds.push(recId);
            };
            songIds = [];
        }
    };
    console.log(reccomendIds);
    return reccomendIds;
}