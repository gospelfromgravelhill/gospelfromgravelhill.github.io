# GitHub Pages (Commit-Driven Shortlinks)

**How it works**  
Each short link is just a folder with an `index.html` file that redirects instantly.  
A GitHub Action creates/updates these redirect pages when you trigger it.

**Pros:**  
- 100% free (no extra infrastructure).  
- Works with your custom domain.  

**Cons:**  
- Each new link requires a commit (a few seconds to deploy).

### Folder Layout
```
/s/hello-world/index.html   -> redirects to your long URL
```

### Redirect Template
```html
<!doctype html><meta charset="utf-8">
<link rel="canonical" href="$TARGET">
<meta http-equiv="refresh" content="0; url=$TARGET">
<title>Redirecting…</title>
<a href="$TARGET">Click here if not redirected</a>
<script>location.replace("$TARGET");</script>
```

### GitHub Action: Create Shortlink
Save this as `.github/workflows/create-shortlink.yml`.

```yaml
name: Create shortlink
on:
  workflow_dispatch:
    inputs:
      slug: { description: "Slug (e.g. hello)", required: true }
      url:  { description: "Destination URL", required: true }
      title:{ description: "Optional page title", required: false }
  issue_comment:
    types: [created]

permissions:
  contents: write

jobs:
  make:
    if: github.event_name == 'workflow_dispatch' ||
        (github.event_name == 'issue_comment' &&
         startsWith(github.event.comment.body, '/shorten '))
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Parse inputs (slash command supported)
        id: parse
        run: |
          if [ "${{ github.event_name }}" = "issue_comment" ]; then
            BODY="${{ github.event.comment.body }}"
            SLUG=$(echo "$BODY" | awk '{print $2}')
            URL=$(echo  "$BODY" | awk '{print $3}')
            TITLE=$(echo "$BODY" | cut -d' ' -f4-)
          else
            SLUG="${{ github.event.inputs.slug }}"
            URL="${{ github.event.inputs.url }}"
            TITLE="${{ github.event.inputs.title }}"
          fi
          echo "slug=$SLUG"   >> $GITHUB_OUTPUT
          echo "url=$URL"     >> $GITHUB_OUTPUT
          echo "title=$TITLE" >> $GITHUB_OUTPUT

      - name: Create redirect page
        run: |
          mkdir -p "s/${{ steps.parse.outputs.slug }}"
          TPL='<!doctype html><meta charset="utf-8">
<link rel="canonical" href="$TARGET">
<meta http-equiv="refresh" content="0; url=$TARGET">
<title>${{ steps.parse.outputs.title || 'Redirecting…' }}</title>
<a href="$TARGET">Click here if not redirected</a>
<script>location.replace("$TARGET");</script>'
          echo "${TPL//\$TARGET/${{ steps.parse.outputs.url }}}" > "s/${{ steps.parse.outputs.slug }}/index.html"

      - name: Commit
        run: |
          git config user.name  "shortlink-bot"
          git config user.email "actions@users.noreply.github.com"
          git add "s/${{ steps.parse.outputs.slug }}/index.html"
          git commit -m "short: ${{ steps.parse.outputs.slug }} -> ${{ steps.parse.outputs.url }}" || echo "No changes"
          git push
```

**Usage**
- Manual: Trigger from **Actions → Create shortlink**.  
- Issue/PR comment: `/shorten hello https://example.com/long/path`

The short link will be:  
```
https://yourdomain/s/hello
```

---
