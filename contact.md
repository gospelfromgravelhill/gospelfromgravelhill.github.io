---
layout: page
title: Contact
permalink: /contact/
---

<div id="contact">
  <h1 class="pageTitle">Contact Us</h1>

  <p>If you'd like to get in touch, feel free to email us directly:<br>
  📧 <a href="mailto:olearygospelhall@gmail.com">olearygospelhall@gmail.com</a></p>

  <p>Or use the form below. We’ll get back to you as soon as we can.</p>

  <form action="https://formspree.io/f/myzpygye" method="POST">
    <label for="name">Name</label><br>
    <input type="text" id="name" name="name" required class="full-width"><br><br>

    <label for="email">Email Address</label><br>
    <input type="email" id="email" name="_replyto" required class="full-width"><br><br>

    <label for="message">Message</label><br>
    <textarea name="message" id="message" rows="6" required class="full-width"></textarea><br><br>

    <!-- Redirect to thank-you page -->
    <input type="hidden" name="_next" value="https://thegloriousgospel.github.io/thank-you/">

    <input type="submit" value="Send Message" class="button">
  </form>
</div>
