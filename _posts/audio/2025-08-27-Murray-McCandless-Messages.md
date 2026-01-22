---
layout: post
title: "Murray McCandless Ministry Messages"
date: 2025-08-27
category: audio
---

<ul>
  {% assign conf_posts = site.categories.murraymccandless | sort: "date" | reverse %}
  {% for post in conf_posts %}
    <li>
      <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
    </li>
  {% endfor %}
</ul>
