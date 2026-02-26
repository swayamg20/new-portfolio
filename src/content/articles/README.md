# Articles Authoring

Add a new article by creating one markdown file in this folder.

No `App.jsx` or data file edits required.

## File name

Use kebab-case filename. It becomes the URL slug.

Example:

`my-new-article.md` -> `/articles/my-new-article`

## Frontmatter template

```md
---
title: Your Article Title
date: Feb 25, 2026
readTime: 7 min read
summary: One-line summary shown in article list.
coverImage: /images/articles/your-cover.jpg
heroLabel: Product Vision
subtitle: Optional hero subtitle shown under title.
authorName: Swayam
authorMeta: Feb 2026 - Voice AI Engineer
tags: Conversational AI, Voice UX, Product Vision
draft: false
---
```

## Body content

Standard markdown with syntax-highlighted code blocks, images, videos, and raw HTML.

### Code blocks

Fenced code blocks get automatic syntax highlighting via highlight.js. Specify the language:

````md
```js
const x = 42
```
````

To label a code block with a filename, add a `file-label` div before it:

```html
<div class="file-label">src/utils.js</div>

```js
export function add(a, b) {
  return a + b
}
```
```

### Images

Standard markdown images:

```md
![alt text](/images/articles/screenshot.png)
```

Or use a `<figure>` for captioned images:

```html
<figure>
  <img src="/images/articles/screenshot.png" alt="description" />
  <figcaption>Caption text goes here.</figcaption>
</figure>
```

### Videos

HTML5 video (place video files in `public/`):

```html
<video src="/videos/demo.mp4" controls></video>
```

With caption:

```html
<figure>
  <video src="/videos/demo.mp4" controls></video>
  <figcaption>Demo of the feature in action.</figcaption>
</figure>
```

### YouTube / external embeds

Use the responsive embed wrapper:

```html
<div class="embed-wrap">
  <iframe src="https://www.youtube.com/embed/VIDEO_ID" allowfullscreen></iframe>
</div>
```

### Tables

Standard GFM tables work:

```md
| Column A | Column B |
|----------|----------|
| value    | value    |
```

### Inline code

Use backticks for `inline code` references. They get monospace styling with a subtle background.

## Editorial blocks

Optional styled blocks for richer articles:

- `.pull-quote` — large italic pull quote
- `.section-header` + `.section-number` + `.section-line` — numbered section headers
- `.illustration-block` + `.illustration-caption` — captioned illustrations
- `.insight-box` — highlighted insight paragraph
- `.divider` — dot separator between sections
- `.closing-note` — bordered closing paragraph
- `.file-label` — filename label above a code block

## Draft mode

Set `draft: true` to hide an article from the site while editing.
