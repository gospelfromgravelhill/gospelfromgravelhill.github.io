# Gospel From Gravel Hill — Website

[![Last Commit](https://img.shields.io/github/last-commit/gospelfromgravelhill/gospelfromgravelhill.github.io?logo=github)](https://github.com/gospelfromgravelhill/gospelfromgravelhill.github.io/commits/main)
![Made with Jekyll](https://img.shields.io/badge/Made%20with-Jekyll-%23cc0000)
![GitHub Pages](https://img.shields.io/badge/Hosted%20on-GitHub%20Pages-222)
[![Pages Build](https://github.com/gospelfromgravelhill/gospelfromgravelhill.github.io/actions/workflows/pages/pages-build-deployment/badge.svg?branch=main)](https://github.com/gospelfromgravelhill/gospelfromgravelhill.github.io/actions/workflows/pages/pages-build-deployment)
[![CI](https://github.com/gospelfromgravelhill/gospelfromgravelhill.github.io/actions/workflows/ci.yml/badge.svg)](https://github.com/gospelfromgravelhill/gospelfromgravelhill.github.io/actions/workflows/ci.yml)
![Code License](https://img.shields.io/badge/Code%20License-MIT-green)
![Content License](https://img.shields.io/badge/Content%20License-CC%20BY--NC--SA%204.0-blue)

> “…the glorious gospel of the blessed God…” — 1 Timothy 1:11

A structured Jekyll site with sections for **Articles**, **Audio**, **Books**, **Charts**, **Tracts**, and built‑in client‑side search.

## 📁 Structure
- Jekyll: `_includes/`, `_layouts/`, `_posts/`, `_sass/`, `_config.yml`, `Gemfile`
- Pages: `index.html`, `about.md`, `articles.md`, `audio.md`, `books.md`, `charts.md`, `tracts.md`, `recent.md`, `thank-you.md`, `404.html`
- Search: `search.md`, `search.json`
- Assets: `assets/`
- Node (asset tooling): `package.json`, `package-lock.json`
- Custom domain via `CNAME`

## ✍️ Editing Content
- **Posts**: add to `_posts/` with standard Jekyll front matter.
- **Sections**: update the respective `*.md` pages; many layouts live under `_layouts/` and `_includes/`.
- **Search index**: if you modify collections, ensure `search.json` generation still includes desired fields.

## 🧪 Run Locally

> **Prereqs**: Ruby + Bundler, and Node (LTS).

```bash
# Ruby deps
gem install bundler
bundle install

# Node deps (if used by the theme/tooling)
npm ci  # or: npm install

# Serve the site
bundle exec jekyll serve --livereload
# Then open http://127.0.0.1:4000
```

## Licensing
- **Code**: MIT — see `LICENSE`.
- **Content**: CC BY-NC-SA 4.0 — see `LICENSE-content`.
