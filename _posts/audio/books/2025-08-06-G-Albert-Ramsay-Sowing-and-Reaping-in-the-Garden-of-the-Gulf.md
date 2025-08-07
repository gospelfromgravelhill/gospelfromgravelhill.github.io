---
layout: post
title: "G. Albert Ramsay - Sowing and Reaping in the Garden of the Gulf"
category: books
---

This Book is available to read online and download as a `.pdf` or `.cbz` archive.

## 📥 Download

<a href="{{ '/assets/books/G-Albert-Ramsay-Sowing-and-Reaping-in-the-Garden-of-the-Gulf.cbz' | relative_url }}" download class="button">Download .CBZ File</a><br>
<a href="{{ '/assets/books/G-Albert-Ramsay-Sowing-and-Reaping-in-the-Garden-of-the-Gulf.pdf' | relative_url }}" download class="button">Download .pdf File</a>


<div class="book-pages">
  {% for i in (1..153) %}
    {% assign filename = i | prepend: '000' | slice: -3 %}
    <a href="{{ '/assets/books/garden-of-the-gulf/page' | append: filename | append: '.jpg' | relative_url }}" data-lightbox="book" data-title="Page {{ i }}">
      <img src="{{ '/assets/books/garden-of-the-gulf/page' | append: filename | append: '.jpg' | relative_url }}" alt="Page {{ i }}" loading="lazy" />
    </a>
  {% endfor %}
</div>
