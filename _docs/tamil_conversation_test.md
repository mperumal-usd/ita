---
# category: HSCP 1
# order: 3
# title: Conversation Home Work Test
---
<script src="{{ site.baseurl }}/scripts/track.js"></script>
<h1>Upload and Play a WAV File</h1>
<p>Select a WAV file to play it in the browser.</p>
<input type="file" id="fileInput" accept=".wav">
<audio id="audioPlayer" controls style="display: none;"></audio>
<button id="conversation-saveButton">Finish Conversation</button>
<script>
tracker();
</script>
<script src="{{ site.baseurl }}/scripts/test.js"></script>
<div id="tracker"></div>

