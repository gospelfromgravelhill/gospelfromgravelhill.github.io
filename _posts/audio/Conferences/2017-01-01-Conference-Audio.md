---
layout: post
title: "2017 Conference Audio"
date: 2017-01-21
category: audio
---

<ul>
  {% assign conf_posts = site.categories["2017conference"] | sort: "title" | reverse %}
  {% for post in conf_posts %}
    <li>
      <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
    </li>
  {% endfor %}
</ul>
