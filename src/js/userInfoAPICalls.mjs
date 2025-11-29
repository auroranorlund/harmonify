import { checkTokenExpiration } from "./apiRefreshHandler.mjs";

export async function getTop(url, timeRange) {
    checkTokenExpiration();
    const token = localStorage.getItem("api_token");
    const result = await fetch(url, {
        method: "GET", headers: {
            Authorization: `Bearer ${token}`,
            Time_Range: `${timeRange}`,
        }
    });

    return await result.json();
}

export function getTopGenres(topArtists) {
    let genres = [];
    topArtists.forEach(artist => {
        let artistGenres = artist.genres;
        artistGenres.forEach(genre => {
            genres.push(genre);
        }
        );
    });
    console.log(genres);
    const counts = {};
    genres.forEach(genre => {
        let count = genres.filter(genre => genre === genre).length;
        counts[genre] = count;
    });
    console.log(counts);
    let sortable = [];
    for (let genre in counts) {
        sortable.push([genre, counts[genre]]);
    }
    sortable.sort(function (a, b) {
        return a[1] - b[1];
    });
    console.log(sortable);
    genres = [];
    sortable.forEach(item => {
        genres.push(item[0]);
    });
    console.log(genres);
    genres = [...new Set(genres)];
    console.log(genres);
}