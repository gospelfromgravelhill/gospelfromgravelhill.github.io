---
layout: post
title: "2010 Conference Audio"
date: 2010-01-20
category: audio
---

<ul>
  {% assign conf_posts = site.categories["2010conference"] | sort: "title" | reverse %}
  {% for post in conf_posts %}
    <li>
      <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
    </li>
  {% endfor %}
</ul>
