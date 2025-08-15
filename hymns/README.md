# Hymns (drop-in app)

Upload this folder to `https://YOURDOMAIN/hymns/`.

- Loads two datasets: **Believers Hymn Book** (`data/bhb_songs.json`) and **SSF Songs** (`data/ssfss_songs.min.json`).
- Renders verses with **chorus/refrain repeated after every stanza** when present.
- **Accurate search** (AND-match, phrase search with quotes, field weighting, number boost).
- Colors adjusted to a light, clean theme similar to gospel.fromgravelhill.ca.

## Deep links
`#/hymn/<datasetIndex>/<id>` — e.g., `#/hymn/0/1` for BHB #1, `#/hymn/1/12` for SSF #12.

## Tweaks
- To fine-tune colors, edit CSS variables at the top of `assets/css/style.css`.
- If you move this folder, change `"baseUrl"` in `config.json` accordingly.
