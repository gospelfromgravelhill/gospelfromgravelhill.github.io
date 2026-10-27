---
layout: default
title: Search
permalink: /search/
search_exclude: true
---

<h1>Search</h1>

<div class="site-search">
	<label for="search-input" class="search-label">Search the site</label>

	<input
		id="search-input"
		type="search"
		placeholder="Search posts and pages…"
		autocomplete="off"
		aria-describedby="search-status"
	>

	<p id="search-status" class="search-status" aria-live="polite"></p>

	<ul id="results-container" class="noList search-results"></ul>
</div>

<script>
(function () {
	'use strict';

	const searchInput = document.getElementById('search-input');
	const resultsContainer = document.getElementById('results-container');
	const searchStatus = document.getElementById('search-status');

	let searchIndex = [];
	let indexLoaded = false;

	function normalise(value) {
		return String(value || '').toLowerCase();
	}

	function clearResults() {
		resultsContainer.innerHTML = '';
	}

	function displayMessage(message) {
		searchStatus.textContent = message;
	}

	function createResult(item) {
		const li = document.createElement('li');
		li.className = 'search-result';

		const link = document.createElement('a');
		link.href = item.url;
		link.className = 'search-result__title';
		link.textContent = item.title || 'Untitled';

		li.appendChild(link);

		if (item.date) {
			const date = document.createElement('div');
			date.className = 'search-result__date';
			date.textContent = item.date;
			li.appendChild(date);
		}

		if (item.excerpt) {
			const excerpt = document.createElement('p');
			excerpt.className = 'search-result__excerpt';
			excerpt.textContent = item.excerpt;
			li.appendChild(excerpt);
		}

		return li;
	}

	function search(query) {
		clearResults();

		const terms = normalise(query)
			.trim()
			.split(/\s+/)
			.filter(Boolean);

		if (!terms.length) {
			displayMessage('');
			return;
		}

		if (!indexLoaded) {
			displayMessage('Search index is still loading…');
			return;
		}

		const matches = searchIndex
			.map(function (item) {
				const title = normalise(item.title);
				const excerpt = normalise(item.excerpt);
				const content = normalise(item.content);

				let score = 0;

				const allTermsMatch = terms.every(function (term) {
					let matched = false;

					if (title.includes(term)) {
						score += 10;
						matched = true;
					}

					if (excerpt.includes(term)) {
						score += 4;
						matched = true;
					}

					if (content.includes(term)) {
						score += 1;
						matched = true;
					}

					return matched;
				});

				return {
					item: item,
					score: allTermsMatch ? score : 0
				};
			})
			.filter(function (result) {
				return result.score > 0;
			})
			.sort(function (a, b) {
				if (b.score !== a.score) {
					return b.score - a.score;
				}

				return normalise(a.item.title).localeCompare(
					normalise(b.item.title)
				);
			})
			.slice(0, 50);

		if (!matches.length) {
			displayMessage('No results found.');
			return;
		}

		displayMessage(
			matches.length === 1
				? '1 result found.'
				: matches.length + ' results found.'
		);

		matches.forEach(function (result) {
			resultsContainer.appendChild(createResult(result.item));
		});
	}

	fetch('{{ "/search.json" | relative_url }}', {
		headers: {
			'Accept': 'application/json'
		}
	})
		.then(function (response) {
			if (!response.ok) {
				throw new Error(
					'Search index returned HTTP ' + response.status
				);
			}

			return response.json();
		})
		.then(function (data) {
			if (!Array.isArray(data)) {
				throw new Error('Search index is not a valid array.');
			}

			searchIndex = data;
			indexLoaded = true;

			if (searchInput.value.trim()) {
				search(searchInput.value);
			}
		})
		.catch(function (error) {
			console.error('Search error:', error);

			displayMessage(
				'Search could not be loaded. Please try again later.'
			);
		});

	searchInput.addEventListener('input', function () {
		search(searchInput.value);
	});
})();
</script>