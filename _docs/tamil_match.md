---
category: Tools
order: 7
title: தமிழ் உரைநடை
---
<script src="{{ site.baseurl }}/scripts/track.js"></script>
<h2>Fill in the Blanks - Drag and Drop Exercise</h2>

<p>Drag the correct answers to the blanks:</p>

<div id="questions"><div id="question" data-id="1"></div>
    <div>
        <div class="draggable" id="answer1" draggable="true" ondragstart="drag(event)"></div>
        <div class="draggable" id="answer2" draggable="true" ondragstart="drag(event)"></div>
    </div>
</div>

<p class="message" id="message"></p>
<button id="next-match-btn" onclick="onNext()">next</button>

<script src="{{ site.baseurl }}/scripts/drag-and-drop.js"></script>
