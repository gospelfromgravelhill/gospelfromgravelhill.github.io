---
layout: post
title: "1986 Conference Audio"
date: 1986-01-20
category: audio
---

<ul>
  {% assign conf_posts = site.categories["1986conference"] | sort: "title" | reverse %}
  {% for post in conf_posts %}
    <li>
      <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
    </li>
  {% endfor %}
</ul>
