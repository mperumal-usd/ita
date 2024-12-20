---
category: Tools
order: 5
title: தமிழ் பேச்சு

---
<script src="{{ site.baseurl }}/scripts/track.js"></script>

<h1>உரை ->  பேச்சு</h1>
<textarea id="text-to-speak" rows="10" cols="50" placeholder="இது ஒரு தமிழ் உரைநடை மாற்றி. உதாரணம்: நான் இன்னைக்கு தமிழ் ஸ்கூலுக்கு போனேன். உங்கள் உரையை இங்கு பதிவு செய்யவும்..  neengal ipppadiuym tamizhai type seiyalaam  "></textarea><br>
<!-- <button onclick="speakText()">Speak</button> -->
<button id="playAudioBtn">Fetch and Play Audio</button>
<audio id="audioPlayer" controls></audio>


<script src="{{ site.baseurl }}/scripts/speech.js"></script>
<h1>தமிழ் பேச்சு -> உரைநடை மாற்றி</h1>
<button id="start-btn">கேட்கத் தொடங்குங்கள்</button>
<button id="stop-btn" disabled>கேட்பதை நிறுத்து</button>
<p id="transcription"></p>

<script>
        // Check if the browser supports the Web Speech API
              tracker();
              document.getElementById('playAudioBtn').addEventListener('click',speak);

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
            const transcription = document.getElementById('transcription');

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

                transcription.innerHTML = `<strong>Final:</strong> ${finalTranscript}<br><strong>Interim:</strong> ${interimTranscript}`;
            };

            recognition.onerror = (event) => {
                console.error('Speech recognition error detected: ' + event.error);
            };

            recognition.onend = () => {
                startBtn.disabled = false;
                stopBtn.disabled = true;
            };
        }
</script>

####பேச்சைப் பதிவுசெய்து பதிவிறக்கவும்
<script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.7.1/jszip.min.js"></script>
<button id="speechStartButton">பதிவைத் தொடங்கவும்</button>
<button id="speechStopButton" disabled>பதிவு செய்வதை நிறுத்து</button>
<a id="speechDownloadLink" style="display:none;">பதிவிறக்கவும்</a>
<div id="tracker"></div>
<script src="{{ site.baseurl }}/scripts/recorder.js"></script>

