---
category: HSCP 1
order: 3
title: Conversation Home Work Test
---
<script src="{{ site.baseurl }}/scripts/track.js"></script>
<h1>Upload and Play a WAV File</h1>
<p>Select a WAV file to play it in the browser.</p>
<input type="file" id="fileInput" accept=".wav">
<audio id="audioPlayer" controls style="display: none;"></audio>
<button id="conversation-saveButton">Finish Conversation</button>
<script>
tracker();
 const fileInput = document.getElementById('fileInput');
const audioPlayer = document.getElementById('audioPlayer');
const audioBlobList=[];
fileInput.addEventListener('change', function(event) {
            const file = event.target.files[0];
            if (file) {
                audioBlobList.push(file)
                const objectURL = URL.createObjectURL(file);
                audioPlayer.src = objectURL;
                audioPlayer.style.display = 'block';
                audioPlayer.play();
            }
  });
const saveButton = document.getElementById("conversation-saveButton");
saveButton.addEventListener("click",async (event) => {
    const formData = new FormData();
    const filename = `audio.wav`;
    formData.append(`audioFiles[]`,audioBlobList[0], filename);
    const messageArray = "test";
    textContent.trim());
    formData.append("content",JSON.stringify(messageArray));
    formData.append("work","conversation");
    // console.log(messageArray);
    fetch('https://infinite-sands-52519-06605f47cb30.herokuapp.com/save_form', {
        method: 'POST',
        headers: {
            'Authorization': sessionStorage.getItem('sessionToken')
        },
        body: formData
    })
        .then(response => {
            if (response.status === 401) {
                // Handle 401 Unauthorized - user is not authenticated
                console.log('Unauthorized! Redirecting to login...');
                // Redirect to login page (or handle error accordingly)
                window.location.href = "https://mperumal-usd.github.io/ita/Login"; // Redirect to login page
                return; // Stop further execution if 401 is encountered
            }
            // If the status is OK or other success code, handle it
            return response.json();  // Parse the JSON response
        })
        .then(data => {
            alert('Work saved successfully!  ' + (data.id ? "id :" + data.id : ""));
        })
        .catch(error => {
            alert('Failed to save work.'+ JSON.stringify(error));
        });
});
</script>
<div id="tracker"></div>

