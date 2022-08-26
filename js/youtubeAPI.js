const APIKey = "AIzaSyDjyF2m9NimS6rc6OXNOPyDARtLuLBrD68";
const youtubeUser = "UC7fk0CB07ly8oSl0aqKkqFg";

function fetchChannelDetails() {
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
async function getPreviousVideoTime() {
    // FetchChannelDetails using Youtube Data API v3
    const data = await fetchChannelDetails();
    // Get previous video time.
    let previousVideoTimeISOS = data['items'][0]['snippet'].publishedAt;
    return Promise.resolve(previousVideoTimeISOS);
}
function updateCurrentTime() {
    let currentTime = new Date();
    let currentTimeISOS = toIsoString(currentTime);
    return currentTimeISOS;
}
function toIsoString(date) {
    pad = function(num) {
        return (num < 10 ? '0' : '') + num;
    };

return date.getFullYear() +
    '-' + pad(date.getMonth() + 1) +
    '-' + pad(date.getDate()) +
    'T' + pad(date.getHours()) +
    ':' + pad(date.getMinutes()) +
    ':' + pad(date.getSeconds()) +
    "Z";
}

var unitmapping = {"days":24*60*60*1000,
                   "hours":60*60*1000,
                   "minutes":60*1000,
                   "seconds":1000};
                   
function getISOSTimeDiff(diff)
{
    document.getElementById('days').textContent = Math.floor(diff/unitmapping.days);
    document.getElementById('hours').textContent = Math.floor((diff%unitmapping.days)/unitmapping.hours);
    document.getElementById('minutes').textContent = Math.floor((diff%unitmapping.hours)/unitmapping.minutes);
    document.getElementById('seconds').textContent = Math.floor((diff%unitmapping.minutes)/unitmapping.seconds);

    return Math.floor(diff/unitmapping.days)+" days "+
           Math.floor((diff%unitmapping.days)/unitmapping.hours)+" hours "+
           Math.floor((diff%unitmapping.hours)/unitmapping.minutes)+" minutes "+
           Math.floor((diff%unitmapping.minutes)/unitmapping.seconds)+" seconds "+
           Math.floor((diff%unitmapping.seconds))+" milliseconds";
}

function calculateTimeDiff(previousVideoTimeISOS) {
    let currentTimeISOS = updateCurrentTime();
    let timeDifferences = currentTimeISOS - previousVideoTimeISOS;
    console.log(currentTimeISOS);
    console.log(previousVideoTimeISOS);
    console.log(getISOSTimeDiff(new Date(currentTimeISOS) - new Date(previousVideoTimeISOS)));
    console.log(timeDifferences);
    //setTimeout(calculateTimeDiff, 2000);
}

async function main() {
    //let previousVideoTimeISOS = await getPreviousVideoTime();
    let previousVideoTime = new Date(2022, 5, 13, 23, 33, 30);
    let previousVideoTimeISOS = toIsoString(previousVideoTime);
    calculateTimeDiff(previousVideoTimeISOS);
    setTimeout(main, 1000);
}

main();