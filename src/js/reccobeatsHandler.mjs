import { lookupSpotifyDetails } from "./userInfoAPICalls.mjs";

const baseURL = "https://api.reccobeats.com/v1/track/recommendation";

export async function getTrackRecs(topTracks) {
    let songIds = [];
    let reccomendIds = [];
    topTracks.items.forEach(async item => {
        const id = item.id;
        songIds.push(id);
        if (songIds.length == 5) {
            const url = `https://api.reccobeats.com/v1/track/recommendation?size=5&seeds=${songIds[0]},${songIds[1]},${songIds[2]},${songIds[3]},${songIds[4]}`;
            const result = await fetch(url, {
                method: "GET",
                headers: {Accept: "application/json"}
            })
            result.content.forEach(item => {
                const recId = item.href.replace("https://open.spotify.com/track/", "");
                reccomendIds.push(recId);
            })
            songIds = [];
        }
    });
    console.log(reccomendIds);
    return reccomendIds;
}