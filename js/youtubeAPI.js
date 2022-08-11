const APIKey = "AIzaSyAASD2cdA6_BLWREvJYxxVIY4u1nD9JJKg";
const youtubeUser = "UC7fk0CB07ly8oSl0aqKkqFg";

function UpdateCurrentTime() {
    let currentTime = new Date().toISOString();
    // call this function again in 500ms
    setTimeout(UpdateCurrentTime, 500);
    return currentTime;
}
function GetPreviousVideoTime() {
    return fetch(`https://www.googleapis.com/youtube/v3/search?key=${APIKey}&channelId=${youtubeUser}&part=snippet,id&order=date&maxResults=1`)
    .then(response => {
        if(response.ok) {
            return response.json();
        }
        else {
            console.log('Fetching failed.');
        }
    })
    .then(data => {
        console.log(data);
        let previousVideoTime = data['items'][0]['snippet'].publishedAt;
        return previousVideoTime;
    })
}

function CalculateTimeDifferences() {
    let newPreviousVideoTime;
    GetPreviousVideoTime().then((previousVideoTime) => {newPreviousVideoTime = previousVideoTime});
    let timeDifferences = currentTime - newPreviousVideoTime;
    console.log(timeDifferences);
    document.getElementById('timeDifferences').innerHTML = timeDifferences;
}

let currentTime = UpdateCurrentTime();
console.log(currentTime);

CalculateTimeDifferences();