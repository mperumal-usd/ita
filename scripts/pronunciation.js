document.getElementById('record-btn').addEventListener('click', function() {
    if (!('webkitSpeechRecognition' in window)) {
        alert('Speech recognition not supported in this browser.');
        return;
    }

    const recognition = new webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = function() {
        document.getElementById('status').textContent = 'Recording...';
    };

    recognition.onresult = function(event) {
        const transcript = event.results[0][0].transcript;
        document.getElementById('status').textContent = 'Recording stopped.';
        document.getElementById('result').textContent = 'You said: ' + transcript;
        comparePronunciation(transcript);
    };

    recognition.onerror = function(event) {
        document.getElementById('status').textContent = 'Error occurred: ' + event.error;
    };

    recognition.onend = function() {
        document.getElementById('status').textContent = 'Recording ended.';
    };

    recognition.start();
});

function comparePronunciation(userTranscript) {
    const expectedTranscript = "hello world";
    const resultElement = document.getElementById('result');
    
    if (userTranscript.toLowerCase().trim() === expectedTranscript.toLowerCase()) {
        resultElement.textContent += " - Pronunciation is correct!";
    } else {
        resultElement.textContent += " - Pronunciation is incorrect. Try again.";
    }
}
