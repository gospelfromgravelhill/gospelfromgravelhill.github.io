---
layout: post
title: "J. Ashley Milne — The Gospel Hymn Book Vol 4 (Playlist)"
date: 2025-10-07
category: jashleymilne
---

## 📻 Audio Playlist — Vol 4

<select id="trackList" onchange="loadTrack()">
  <option>Loading tracks…</option>
</select>

<br><br>

<audio id="audioPlayer" controls>
  <source id="audioSource" src="" type="audio/mpeg">
  Your browser does not support the audio element.
</audio>

<script>
  const BASE_URL = "https://archive.org/download/j-ashley-milne-the-gospel-hymn-book/J.%20Ashley%20Milne%20-%20The%20Gospel%20Hymn%20Book%20Vol%204/";

  document.addEventListener("DOMContentLoaded", async () => {
    const list = document.getElementById("trackList");
    list.innerHTML = "";

    try {
      const res = await fetch(BASE_URL, { mode: "cors" });
      if (!res.ok) throw new Error("Failed to load directory listing");
      const html = await res.text();

      const matches = [...html.matchAll(/href="([^"]+\.mp3)"/gi)];
      let files = [...new Set(matches.map(m => m[1]).filter(h => !h.startsWith("http")))];
      files.sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

      files.forEach(filename => {
        const leaf = filename.split("/").pop();
        let display = leaf;
        try { display = decodeURIComponent(leaf); } catch {}
        display = display.replace(/\+/g, " ").replace(/\.mp3$/i, "");

        const opt = document.createElement("option");
        opt.textContent = display;
        opt.value = BASE_URL + encodeURIComponent(filename).replace(/%2F/g, "/");
        list.appendChild(opt);
      });

      if (files.length > 0) {
        list.selectedIndex = 0;
        loadTrack();
      } else {
        const opt = document.createElement("option");
        opt.textContent = "No tracks found.";
        list.appendChild(opt);
      }
    } catch (e) {
      const opt = document.createElement("option");
      opt.textContent = "Error loading tracks.";
      document.getElementById("trackList").appendChild(opt);
      console.error(e);
    }
  });

  function loadTrack() {
    const player = document.getElementById("audioPlayer");
    const source = document.getElementById("audioSource");
    const list = document.getElementById("trackList");
    source.src = list.value;
    player.load();
    player.play();
  }
</script>
