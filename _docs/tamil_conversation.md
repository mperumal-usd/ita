---
category: HSCP
order: 2
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
        <button id="conversation-start-btn" disabled>start</button>
        <button id="conversation-clear-btn" >clear</button>
        <button id="conversation-stop-btn" onclick="sendMessage()" disabled>send</button>
        <audio id="audioPlayer" controls></audio>
    </div>
  </div>
<button id="conversation-saveButton">Save</button>
<script src="{{ site.baseurl }}/scripts/conversation.js"></script>
<script>
tracker();
</script>

<!-- ####பேச்ton">பதிவைத் தொடங்கவும்</button>
<button id="speechStopButton" disabled>பதிவு செய்வதை நிறுத்து</button>
<a id="speechDownloadLink" style="display:none;">பதிவிறக்கவும்</a>சைப் பதிவுசெய்து பதிவிறக்கவும்
<script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.7.1/jszip.min.js"></script>
<button id="speechStartBut -->
<div id="tracker"></div>
<!-- <script src="{{ site.baseurl }}/scripts/recorder.js"></script> -->

