---
layout: post
title: "David Hierlihy Messages"
date: 2026-10-01
category: audio
---

<ul>
  {% assign conf_posts = site.categories.davidhierlihy | sort: "date" | reverse %}
  {% for post in conf_posts %}
    <li>
      <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
    </li>
  {% endfor %}
</ul>
