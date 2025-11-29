const clientId = import.meta.env.VITE_CLIENT_ID;

// Gets the time that the API token will expire based on user's current time
export function getExpirationTime() {
    const date = new Date();
    const currentTime = date.getHours();
    date.setHours(currentTime + 1);
    return date;
}

// Checks if the current API token has expired
export function checkTokenExpiration() {
    const expirationTime = new Date(localStorage.getItem("expiration_time"));
    const now = new Date();
    if (now >= expirationTime) {
        refreshToken();
    }
}

// Uses the refresh token kept in localStorage to get a new API token
async function refreshToken() {
    const refreshToken = localStorage.getItem("refresh_token");
    const url = "https://accounts.spotify.com/api/token";
    const payload = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token: refreshToken,
            client_id: clientId
        }),
    }
    const body = await fetch(url, payload);
    const response = await body.json();

    localStorage.setItem('access_token', response.access_token);
    if (response.refresh_token) {
        localStorage.setItem('refresh_token', response.refresh_token);
    }
}