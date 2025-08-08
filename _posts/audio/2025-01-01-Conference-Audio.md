---
layout: post
title: "2025 Conference Audio"
date: 2025-01-01
category: audio
---

<ul>
  {% assign conf_posts = site.categories.2025conference | sort: "date" | reverse %}
  {% for post in conf_posts %}
    <li>
      <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
      <span class="post-date">{{ post.date | date: "%B %d, %Y" }}</span>
    </li>
  {% endfor %}
</ul>
