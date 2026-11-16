---
layout: post
title: "John Fitzpatrick Messages"
date: 2026-11-15
category: audio
---

<ul>
  {% assign conf_posts = site.categories.johnfitzpatrick | sort: "date" | reverse %}
  {% for post in conf_posts %}
    <li>
      <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
    </li>
  {% endfor %}
</ul>
