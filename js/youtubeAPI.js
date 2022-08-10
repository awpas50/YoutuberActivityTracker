const youtubeKey = "AIzaSyAASD2cdA6_BLWREvJYxxVIY4u1nD9JJKg";
const youtubeUser = "UC7fk0CB07ly8oSl0aqKkqFg";
const subCount = document.getElementById('subCount');
const details = document.getElementById('details');
const contentDetails = document.getElementById('contentDetails');

let getContentDetails = () => {
    fetch(`https://www.googleapis.com/youtube/v3/search?key=${youtubeKey}&channelId=${youtubeUser}&part=snippet,id&order=date&maxResults=1`)
    .then(response => {
        return response.json()
    })
    .then(data => {
        console.log(data);
    })
}

// let getSubscribers = () => {
//     fetch(`https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${youtubeUser}&key=${youtubeKey}`)
//     .then(response => {
//         return response.json()
//     })
//     .then(data => {
//         console.log(data);
//         subCount.innerHTML = data["items"][0].statistics.subscriberCount;
//     })
// }

getContentDetails();
//getSubscribers();