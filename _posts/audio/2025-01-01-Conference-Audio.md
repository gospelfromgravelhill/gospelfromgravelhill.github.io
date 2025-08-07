---
layout: post
title: "2025 Conference Audio"
date: 2025-01-01
category: audio
---

<ul>
<li><a href="{{ 'audio/2025-Conference/2025-07-04-2025-Pugwash-Junction-Conference/' | relative_url }}">2025-07-04 - 2025 Pugwash Junction Conference</a></li>
<li><a href="{{ 'audio/2025-Conference/2025-06-07-Halifax-Bible-Conference/' | relative_url }}">2025-06-07 - Halifax Bible Conference</a></li>
<li><a href="{{ 'audio/2025-Conference/2025-05-23-2025-Hickory-Conference/' | relative_url }}">2025-05-23 - 2025 Hickory Conference</a></li>
<li><a href="{{ 'audio/2025-Conference/2025-05-17-2025-PEI-Conference/' | relative_url }}">2025-05-17 - 2025 PEI Conference</a></li>
<li><a href="{{ 'audio/2025-Conference/2025-04-18-Bridgewater-Bible-Conference/' | relative_url }}">2025-04-18 - Bridgewater Bible Conference</a></li>
<li><a href="{{ 'audio/2025-Conference/2025-03-30-Pope-Road-Days-Meeting/' | relative_url }}">2025-03-30 - Pope Road Days Meeting</a></li>
<li><a href="{{ 'audio/2025-Conference/2025-03-29-Nash-Road-Apologetics-Conference/' | relative_url }}">2025-03-29 - Nash Road - Apologetics Conference</a></li>
<li><a href="{{ 'audio/2025-Conference/2025-03-14-Cork-Conference/' | relative_url }}">2025-03-14 - Cork Conference</a></li>
<li><a href="{{ 'audio/2025-Conference/2025-03-08-Cambridge-Bible-Reading-Conference/' | relative_url }}">2025-03-08 - Cambridge Bible Reading Conference</a></li>
<li><a href="{{ 'audio/2025-Conference/2025-03-01-Oleary-Winter-Weekend/' | relative_url }}">2025-03-01 - O'leary Winter Weekend</a></li>
<li><a href="{{ 'audio/2025-Conference/2025-02-01-Sussex-Days-Meeting/' | relative_url }}">2025-02-01 - Sussex Days Meeting</a></li>
<li><a href="{{ 'audio/2025-Conference/2025-01-17-Orangewood-Gospel-Hall-Conference/' | relative_url }}">2025-01-17 - Orangewood Gospel Hall Conference</a></li>
<li><a href="{{ 'audio/2025-Conference/2025-01-04-Winter-Bible-Studies-The-Epistle-of-1st-John/' | relative_url }}">2025-01-04 - Winter Bible Studies - The Epistle of 1st John</a></li>
</ul>


<ul>
  {% assign conf_posts = site.categories.2025conference | sort: "date" | reverse %}
  {% for post in conf_posts %}
    <li>
      <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
    </li>
  {% endfor %}
</ul>
