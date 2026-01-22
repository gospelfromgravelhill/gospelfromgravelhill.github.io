---
layout: post
title: "2016 Conference Audio"
date: 2016-01-21
category: audio
---

<ul>
  {% assign conf_posts = site.categories["2016conference"] | sort: "title" | reverse %}
  {% for post in conf_posts %}
    <li>
      <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
    </li>
  {% endfor %}
</ul>
