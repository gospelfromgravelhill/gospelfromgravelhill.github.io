---
layout: post
title: "David Gooding Ministry Messages"
date: 2025-08-25
category: audio
---

<ul>
  {% assign conf_posts = site.categories.davidgooding | sort: "date" | reverse %}
  {% for post in conf_posts %}
    <li>
      <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
    </li>
  {% endfor %}
</ul>
