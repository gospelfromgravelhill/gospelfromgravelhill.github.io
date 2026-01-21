---
layout: post
title: "2004 Conference Audio"
date: 2004-01-20
category: audio
---

<ul>
  {% assign conf_posts = site.categories["2004conference"] | sort: "title" | reverse %}
  {% for post in conf_posts %}
    <li>
      <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
    </li>
  {% endfor %}
</ul>
