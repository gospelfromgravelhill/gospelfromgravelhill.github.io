---
layout: post
title: "Robert McIlwaine Ministry Messages"
date: 2026-01-19
category: audio
---

<ul>
  {% assign conf_posts = site.categories.robertmcilwaine | sort: "date" | reverse %}
  {% for post in conf_posts %}
    <li>
      <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
    </li>
  {% endfor %}
</ul>
