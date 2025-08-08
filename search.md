---
layout: default
title: Search
permalink: /search/
---

<h1>Search</h1>

<input id="search-input" type="search" placeholder="Search posts and pages…" style="width:100%;padding:.6rem;font-size:1rem;">
<ul id="results-container" class="noList"></ul>

<!-- Simple-Jekyll-Search script -->
<script src="https://unpkg.com/simple-jekyll-search@1.10.0/dest/simple-jekyll-search.min.js"></script>
<script>
  SimpleJekyllSearch({
    searchInput: document.getElementById('search-input'),
    resultsContainer: document.getElementById('results-container'),
    json: '{{ "/search.json" | relative_url }}',
    fuzzy: true,
    noResultsText: '<li>No results found.</li>',
    limit: 20,
    templateMiddleware: function(prop, value, template){
      return value;
    },
    searchResultTemplate: `
      <li style="margin:0 0 1rem 0;">
        <a href="{url}"><strong>{title}</strong></a><br>
        <small>{date}</small>
      </li>`
  });
</script>
