---
layout: post
title: "John Bunyan - The Pilgrim’s Progress"
category: books
---
<div style="text-align: center;">
This Book is available to read and download as a `.pdf` or listen to as an mp3

<h2>📥 Download</h2>

<a href="{{ '/assets/books/John-Bunyan-Pilgrims-Progress-with-illustrations.pdf' | relative_url }}" download class="button">John Bunyan - Pilgrim's Progress (with illustrations)</a><br>

<a href="{{ '/assets/books/John-Bunyan-Pilgrims-Progress-Part-2.pdf' | relative_url }}" download class="button">John Bunyan - Pilgrim's Progress part 2</a>
<br><br>

<h2>🎵 Audiobook (mp3)</h2>
This audio reading of The Pilgrim’s Progress is read by Joy Chan

Part One
<select id="trackList" onchange="loadTrack()">
  <option value="/assets/books/Pilgrims-Progress/21171-01.mp3">Author’s Apology for his Book - 00:11:27</option>
  <option value="/assets/books/Pilgrims-Progress/21171-02.mp3">The First Stage - 00:34:09</option>
  <option value="/assets/books/Pilgrims-Progress/21171-03.mp3">The Second Stage - 00:29:19</option>
  <option value="/assets/books/Pilgrims-Progress/21171-04.mp3">The Third Stage - 00:45:50</option>
  <option value="/assets/books/Pilgrims-Progress/21171-05.mp3">The Fourth Stage - 00:24:17</option>
  <option value="/assets/books/Pilgrims-Progress/21171-06.mp3">The Fifth Stage - 00:45:25</option>
  <option value="/assets/books/Pilgrims-Progress/21171-07.mp3">The Sixth Stage - 00:27:53</option>
  <option value="/assets/books/Pilgrims-Progress/21171-08.mp3">The Seventh Stage - 00:46:31</option>
  <option value="/assets/books/Pilgrims-Progress/21171-09.mp3">The Eighth Stage - 00:09:53</option>
  <option value="/assets/books/Pilgrims-Progress/21171-10.mp3">The Ninth Stage - 00:63:50</option>
  <option value="/assets/books/Pilgrims-Progress/21171-11.mp3">The Tenth Stage - 00:33:13</option>
  <option value="/assets/books/Pilgrims-Progress/21171-12.mp3">Conclusion of Part First - 00:01:52</option>
  <option value="/assets/books/Pilgrims-Progress/21171-13.mp3">The Author’s Way - 00:14:38</option>
  <option value="/assets/books/Pilgrims-Progress/21171-14.mp3">Pilgrimage of Christiana and Her Children - 00:28:57</option>
  <option value="/assets/books/Pilgrims-Progress/21171-15.mp3">The First Stage - 00:19:30</option>
  <option value="/assets/books/Pilgrims-Progress/21171-16.mp3">The Second Stage - 00:36:36</option>
  <option value="/assets/books/Pilgrims-Progress/21171-17.mp3">The Third Stage - 00:22:40</option>
  <option value="/assets/books/Pilgrims-Progress/21171-18.mp3">The Fourth Stage - 00:43:14</option>
  <option value="/assets/books/Pilgrims-Progress/21171-19.mp3">The Fifth Stage - 00:25:40</option>
  <option value="/assets/books/Pilgrims-Progress/21171-20.mp3">The Sixth Stage (part 1) - 00:40:20</option>
  <option value="/assets/books/Pilgrims-Progress/21171-21.mp3">The Sixth Stage (part 2) - 00:43:37</option>
  <option value="/assets/books/Pilgrims-Progress/21171-22.mp3">The Seventh Stage - 00:25:09</option>
  <option value="/assets/books/Pilgrims-Progress/21171-23.mp3">The Eighth Stage - 00:56:56</option>
  <option value="/assets/books/Pilgrims-Progress/21171-24.mp3">Author’s Farewell - 00:00:57</option>
</select>

<audio id="audioPlayer" controls>
  <source id="audioSource" src="/assets/books/Pilgrims-Progress/21171-01.mp3" type="audio/mpeg">
  Your browser does not support the audio element.
</audio>

<script>
  function loadTrack() {
    var player = document.getElementById("audioPlayer");
    var source = document.getElementById("audioSource");
    var list = document.getElementById("trackList");
    source.src = list.value;
    player.load();
    player.play();
  }
</script>