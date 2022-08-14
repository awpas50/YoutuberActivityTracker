const APIKey = "AIzaSyAASD2cdA6_BLWREvJYxxVIY4u1nD9JJKg";
const youtubeUser = "UC7fk0CB07ly8oSl0aqKkqFg";

function UpdateCurrentTime() {
    let currentTime = new Date().toISOString('YYYY-MM-DD');
    // call this function again in 500ms
    setTimeout(UpdateCurrentTime, 500);
    return currentTime;
}
function FetchChannelDetails() {
    return fetch(`https://www.googleapis.com/youtube/v3/search?key=${APIKey}&channelId=${youtubeUser}&part=snippet,id&order=date&maxResults=1`)
    .then(response => {
        if(response.ok) {
            return response.json();
        }
        else {
            console.log('Fetching failed.');
        }
    })
}
async function GetPreviousVideoTime(currentTime) {
    const data = await FetchChannelDetails();
    console.log(data);
    let previousVideoTime = data['items'][0]['snippet'].publishedAt;
    console.log(currentTime);
    console.log(previousVideoTime);
    let timeDifferences = currentTime - previousVideoTime;
    document.getElementById('timeDifferences').innerHTML = timeDifferences;
    console.log(timeDifferences);
}
let currentTime = UpdateCurrentTime();
let channelData = GetPreviousVideoTime(currentTime);