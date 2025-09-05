---
layout: post
title: "2023 Conference Audio"
date: 2023-01-01
category: audio
---

<ul>
  {% assign conf_posts = site.categories["2023conference"] | sort: "date" | reverse %}
  {% for post in conf_posts %}
    <li>
      <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
    </li>
  {% endfor %}
</ul>
