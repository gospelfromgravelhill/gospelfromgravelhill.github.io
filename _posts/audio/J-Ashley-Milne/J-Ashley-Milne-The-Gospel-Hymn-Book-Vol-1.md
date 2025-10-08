---
layout: post
title: "J. Ashley Milne — The Gospel Hymn Book Vol 1 (Playlist)"
date: 2025-10-07
category: jashleymilne
---

## 📻 Audio Playlist — Vol 1

<select id="trackList" onchange="loadTrack()">
  <option>Loading tracks…</option>
</select>

<br><br>

<audio id="audioPlayer" controls>
  <source id="audioSource" src="" type="audio/mpeg">
  Your browser does not support the audio element.
</audio>

<script>
  // Base folder for this volume (Archive.org directory listing)
  const BASE_URL = "https://archive.org/download/j-ashley-milne-the-gospel-hymn-book/J.%20Ashley%20Milne%20-%20The%20Gospel%20Hymn%20Book%20Vol%201/";

  // Populate the playlist on load
  document.addEventListener("DOMContentLoaded", async () => {
    const list = document.getElementById("trackList");
    list.innerHTML = ""; // clear placeholder

    try {
      const res = await fetch(BASE_URL, { mode: "cors" });
      if (!res.ok) throw new Error("Failed to load directory listing");
      const html = await res.text();

      // Extract anchor hrefs ending with .mp3
      const matches = [...html.matchAll(/href="([^"]+\.mp3)"/gi)];
      let files = [...new Set(matches.map(m => m[1]).filter(h => !h.startsWith("http")))];

      // Sort naturally so 2 comes before 10
      files.sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

      // Build options with decoded titles (no %20) but encoded URLs for src
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

      // Autoload first track if available
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
