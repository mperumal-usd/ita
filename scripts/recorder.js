let mediaRecorder;
let recordedChunks = [];

// Get the buttons and link elements
const startButton = document.getElementById('speechStartButton');
const stopButton = document.getElementById('speechStopButton');
const downloadLink = document.getElementById('speechDownloadLink');

// Start recording
startButton.addEventListener('click', async () => {
    // Request microphone access
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    // Create a MediaRecorder instance
    mediaRecorder = new MediaRecorder(stream);

    // Handle data available event
    mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
            recordedChunks.push(event.data);
        }
    };

    // Handle stop event
    mediaRecorder.onstop = async () => {
        // Create a blob from the recorded chunks
        const audioBlob = new Blob(recordedChunks, { type: 'audio/webm' });

        // Convert the blob into a file and compress it
        const compressedFile = await compressAudio(audioBlob);

        // Create a URL for the compressed file
        const url = URL.createObjectURL(compressedFile);
        downloadLink.href = url;
        downloadLink.download = 'recording.zip';
        downloadLink.style.display = 'block';
    };

    // Start recording
    mediaRecorder.start();
    startButton.disabled = true;
    stopButton.disabled = false;
});

// Stop recording
stopButton.addEventListener('click', () => {
    mediaRecorder.stop();
    startButton.disabled = false;
    stopButton.disabled = true;
});

// Compress audio using JSZip
async function compressAudio(audioBlob) {
    const jszip = new JSZip();
    jszip.file('audio.webm', audioBlob);

    // Generate the ZIP file
    const zipBlob = await jszip.generateAsync({ type: 'blob' });
    return zipBlob;
}
