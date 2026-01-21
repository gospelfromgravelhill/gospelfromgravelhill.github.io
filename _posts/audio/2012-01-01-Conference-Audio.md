---
layout: post
title: "2012 Conference Audio"
date: 2012-01-21
category: audio
---

<ul>
  {% assign conf_posts = site.categories["2012conference"] | sort: "title" | reverse %}
  {% for post in conf_posts %}
    <li>
      <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
    </li>
  {% endfor %}
</ul>
