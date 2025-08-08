---
layout: default
title: Search
permalink: /search/
---

<h1>Search</h1>

<input id="search-input" type="search" placeholder="Search posts and pages…">
<ul id="results-container" class="noList"></ul>

<script src="https://unpkg.com/simple-jekyll-search@1.10.0/dest/simple-jekyll-search.min.js"></script>
<script>
  SimpleJekyllSearch({
    searchInput: document.getElementById('search-input'),
    resultsContainer: document.getElementById('results-container'),
    json: '{{ "/search.json" | relative_url }}',
    fuzzy: false,                 // turn OFF fuzzy = stricter matches
    limit: 20,
    noResultsText: '<li>No results found.</li>',
    searchResultTemplate: `
      <li style="margin:0 0 1rem;">
        <a href="{url}"><strong>{title}</strong></a><br>
        <small>{date}</small>
      </li>`
  });
</script>

