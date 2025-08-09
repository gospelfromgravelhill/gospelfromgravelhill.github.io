---
layout: post
title: "2024 Conference Audio"
date: 2024-01-01
category: audio
---

<ul>
  {% assign conf_posts = site.categories.2024conference | sort: "date" | reverse %}
  {% for post in conf_posts %}
    <li>
      <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
    </li>
  {% endfor %}
</ul>
