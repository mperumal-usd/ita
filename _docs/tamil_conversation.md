---
category: Tools
order: 6
title: HSCP 1

---
<script src="{{ site.baseurl }}/scripts/track.js"></script>
<script src="{{ site.baseurl }}/scripts/speech.js"></script>

 <label for="weeks">Choose a week:</label>
    <select id="weeks">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
    </select>
<button id="exercise-btn" onclick="getExercise()">start exercise</button>
<div>
    <p type="text" id="topicSelected"></p>
</div>
  <div class="chat-container">
    <div class="chat-box" id="chatBox">
    </div>
    <div class="input-area">
        <p type="text" id="userInput"></p>
        <br>
        <button id="start-btn" disabled>start</button>
        <button id="stop-btn" onclick="sendMessage()" disabled>send</button>
        <audio id="audioPlayer" controls></audio>
    </div>
  </div>

  <button id="saveButton">Save</button>
  
<div id="overlay"></div>
<div id="passwordModal">
        <h2>Enter Password</h2>
        <input type="password" id="passwordInput" name="password" placeholder="Enter your password" required>
        <button type="button" id="submitButton">Submit</button>
        <button type="button" id="cancelButton">Cancel</button>
</div>

<script src="{{ site.baseurl }}/scripts/passwordForm.js"></script>
<script>
    let counter = 0;
    let workSheet={};

    async function  getExercise(){
        const dropdown = document.getElementById("weeks");
        const selectedValue = dropdown.value; // Get the value of the selected option
        const selectedText = dropdown.options[dropdown.selectedIndex].text; 
        const header = await getWorkSheet(null,"header")
        workSheet=await getWorkSheet(selectedText==="" ? "1": selectedText ,null);
        const startBtn = document.getElementById('start-btn');
        const audioPlayer = document.getElementById('audioPlayer');
        const topicSelected = document.getElementById('topicSelected');
        topicSelected.textContent=workSheet.intro[1],audioPlayer
        // await speakApi(workSheet.intro[0],audioPlayer)
        await speakApi(workSheet.intro[1],audioPlayer)
        startBtn.disabled = false;
    }
    
    tracker();
    async function sendMessage() {
      const userInput = document.getElementById('userInput');
      const message =  userInput.textContent.trim();
      
      if ((message || counter==0 ) && workSheet && workSheet.conversations&& workSheet.conversations.length > counter) {
        // Display the sent message
        if(message) {
            displayMessage(message, 'sent');
        }
        
        // Clear input field
        userInput.textContent="";

        // Simulate receiving a response after a brief delay
        const audioPlayer = document.getElementById('audioPlayer');
        if(counter==0){
                await speakApi(workSheet.intro[0],audioPlayer)
                await speakApi(workSheet.intro[1],audioPlayer)
          }
        let botResponse = workSheet.conversations[counter];
          counter++;
          displayMessage(botResponse, 'received');
         await speakApi(botResponse,audioPlayer)
        const startBtn = document.getElementById('start-btn');
        startBtn.disabled=false;
      }
    }

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
    window.onload = function() {
      document.getElementById('start-btn').focus();
    };
        // Check if the browser supports the Web Speech API
 
        if (!('webkitSpeechRecognition' in window)) {
            alert('Sorry, your browser does not support speech recognition.');
        } else {
        
        window.SpeechRecognition = window.SpeechRecognition
            || window.webkitSpeechRecognition;

        const recognition = new SpeechRecognition();
            recognition.lang = 'ta';
            // const recognition = new webkitSpeechRecognition(); // Create a new instance of SpeechRecognition
                
            recognition.continuous = true; // Keep recognizing speech continuously
            recognition.interimResults = true; // Show interim results

            const startBtn = document.getElementById('start-btn');
            const stopBtn = document.getElementById('stop-btn');
            const transcription = document.getElementById('userInput');

            startBtn.addEventListener('click', () => {
                recognition.start(); // Start the speech recognition
                startBtn.disabled = true;
                stopBtn.disabled = false;
            });

            stopBtn.addEventListener('click', () => {
                recognition.stop(); // Stop the speech recognition
                startBtn.disabled = false;
                stopBtn.disabled = true;
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
</script>

<!-- ####பேச்ton">பதிவைத் தொடங்கவும்</button>
<button id="speechStopButton" disabled>பதிவு செய்வதை நிறுத்து</button>
<a id="speechDownloadLink" style="display:none;">பதிவிறக்கவும்</a>சைப் பதிவுசெய்து பதிவிறக்கவும்
<script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.7.1/jszip.min.js"></script>
<button id="speechStartBut -->
<div id="tracker"></div>
<!-- <script src="{{ site.baseurl }}/scripts/recorder.js"></script> -->

