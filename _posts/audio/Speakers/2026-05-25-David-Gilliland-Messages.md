---
layout: post
title: "David Gilliland Messages"
date: 2026-05-25
category: audio
---

<ul>
  {% assign conf_posts = site.categories.davidgilliland | sort: "date" | reverse %}
  {% for post in conf_posts %}
    <li>
      <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
    </li>
  {% endfor %}
</ul>
