---
layout: post
title: "2014 Conference Audio"
date: 2014-01-21
category: audio
---

<ul>
  {% assign conf_posts = site.categories["2014conference"] | sort: "title" | reverse %}
  {% for post in conf_posts %}
    <li>
      <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
    </li>
  {% endfor %}
</ul>
