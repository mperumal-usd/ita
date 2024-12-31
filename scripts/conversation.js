let counter = 0;
let workSheet = {};
let mediaRecorder;
let audioChunks = [];
let audioBlob;
const saveButton = document.getElementById("conversation-saveButton");
const clearButton = document.getElementById("conversation-clear-btn");

clearButton.addEventListener('click',()=>{
    const userInput = document.getElementById('userInput');
    userInput.value="";
});

async function getExercise() {
    const dropdown = document.getElementById("weeks");
    const selectedValue = dropdown.value; // Get the value of the selected option
    const selectedText = dropdown.options[dropdown.selectedIndex].text;
    const header = await getWorkSheet(null, "header")
    workSheet = await getWorkSheet(selectedText === "" ? "1" : selectedText, null);
    const startBtn = document.getElementById('conversation-start-btn');
    const audioPlayer = document.getElementById('audioPlayer');
    const topicSelected = document.getElementById('topicSelected');
    topicSelected.textContent = workSheet.intro[1], audioPlayer
    // await speakApi(workSheet.intro[0],audioPlayer)
    await speakApi(workSheet.intro[1], audioPlayer)
    startBtn.disabled = false;
}

async function sendMessage() {
    const userInput = document.getElementById('userInput');
    const message = userInput.textContent.trim();
    if ((message || counter == 0) && workSheet && workSheet.conversations && workSheet.conversations.length > counter) {
        // Display the sent message
        if (message) {
            displayMessage(message, 'sent');
        }
        // Clear input field
        userInput.textContent = "";
        // Simulate receiving a response after a brief delay
        const audioPlayer = document.getElementById('audioPlayer');
        if (counter == 0) {
            await speakApi(workSheet.intro[0], audioPlayer)
            await speakApi(workSheet.intro[1], audioPlayer)
        }
        let botResponse = workSheet.conversations[counter];
        counter++;
        displayMessage(botResponse, 'received');
        await speakApi(botResponse, audioPlayer)
        const startBtn = document.getElementById('conversation-start-btn');
        startBtn.disabled = false;
    }
}

saveButton.addEventListener("click", (event) => {
    const chatBox = document.getElementById("chatBox");

    // Get all messages inside the chat box
    const messages = chatBox.querySelectorAll(".message");

    // Optional: Store all message values in an array
    const messageArray = Array.from(messages).map(message => message.textContent.trim());
    console.log(messageArray);
    fetch('https://infinite-sands-52519-06605f47cb30.herokuapp.com/save_work', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: sessionStorage.getItem('sessionToken')
        },
        body: JSON.stringify({  "content": messageArray, 'work': "conversation","blob":audioBlob })
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
            document.getElementById('passwordModal').style.display = 'none';
        })
        .catch(error => {
            alert('Failed to save work.');
        });
});


// Function to display a message
function displayMessage(message, type) {
    const chatBox = document.getElementById('chatBox');
    const msgElement = document.createElement('div');
    msgElement.classList.add('message', type);
    msgElement.textContent = message;
    chatBox.appendChild(msgElement);
    chatBox.scrollTop = chatBox.scrollHeight;  // Scroll to the bottom
}
// Optionally, focus the input field on page load
window.onload = function () {
    document.getElementById('conversation-start-btn').focus();
};
// Check if the browser supports the Web Speech API
if (!('webkitSpeechRecognition' in window)) {
    alert('Sorry, your browser does not support speech recognition.');
} else {
    window.SpeechRecognition = window.SpeechRecognition
        || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    let mediaRecorder;
    let audioChunks = [];
    let audioBlob;
    recognition.lang = 'ta';
    recognition.continuous = true; // Keep recognizing speech continuously
    recognition.interimResults = true; // Show interim results
    const startBtn = document.getElementById('conversation-start-btn');
    const stopBtn = document.getElementById('conversation-stop-btn');
    const transcription = document.getElementById('userInput');
    startBtn.addEventListener('click', async () => {
        recognition.start(); // Start the speech recognition
        startBtn.disabled = true;
        stopBtn.disabled = false;
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorder = new MediaRecorder(stream);
            mediaRecorder.ondataavailable = (event) => {
                audioChunks.push(event.data);
            };
            mediaRecorder.onstop = () => {
                audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
                const audioURL = URL.createObjectURL(audioBlob);
                console.log('Audio URL:', audioURL);
                // Clear chunks for the next recording
                audioChunks = [];
            };
            mediaRecorder.start();
            console.log('Audio recording started');
        } catch (error) {
            console.error('Error accessing microphone:', error);
        }
    });
    stopBtn.addEventListener('click', () => {
        recognition.stop(); // Stop the speech recognition
        startBtn.disabled = false;
        stopBtn.disabled = true;
        if (mediaRecorder) {
            mediaRecorder.stop();
            console.log('Audio recording stopped');
        }
    });
    recognition.onresult = (event) => {
        let interimTranscript = '';
        let finalTranscript = '';
        for (let i = 0; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
                finalTranscript += transcript;
            } else {
                interimTranscript += transcript;
            }
        }
        transcription.innerHTML = `${finalTranscript}`;
    };
    recognition.onerror = (event) => {
        console.error('Speech recognition error detected: ' + event.error);
    };
    recognition.onend = () => {
        // startBtn.disabled = false;
        // stopBtn.disabled = true;
    };
}