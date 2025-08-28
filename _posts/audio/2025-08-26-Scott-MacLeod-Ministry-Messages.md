---
layout: post
title: "Scott MacLeod Ministry Messages"
date: 2025-08-26
category: audio
---

<ul>
  {% assign conf_posts = site.categories.scottmacleod | sort: "date" | reverse %}
  {% for post in conf_posts %}
    <li>
      <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
    </li>
  {% endfor %}
</ul>
