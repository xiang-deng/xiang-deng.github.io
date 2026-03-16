# Architecture

A static site using plain HTML/CSS/JS with markdown-driven content.

---

## Overview

```
┌─────────────────────────────────────────────────────────────────────────┐
│                              Browser                                     │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│   ┌─────────────┐    fetch()     ┌─────────────┐    marked.js          │
│   │  HTML Page  │ ──────────────▶│  .md file   │ ──────────────▶ DOM   │
│   │  (shell)    │                │  (content)  │                        │
│   └─────────────┘                └─────────────┘                        │
│                                                                         │
│   ┌─────────────┐    fetch()     ┌─────────────┐    parse              │
│   │  blog.html  │ ──────────────▶│  RSS feed   │ ──────────────▶ DOM   │
│   └─────────────┘                │  (Substack) │                        │
│                                  └─────────────┘                        │
└─────────────────────────────────────────────────────────────────────────┘
```

**Key Principles:**
- No build step required
- Content managed via markdown files
- HTML files are minimal shells
- JavaScript fetches and renders markdown at runtime
- Hosted on GitHub Pages as static files

---

## File Structure

```
homepage_new/
│
├── index.html                 # About page (home)
├── experience.html            # Experience page
├── portfolio.html             # Portfolio page
├── blog.html                  # Blog page (RSS feed)
│
├── css/
│   └── style.css              # All styles (single file)
│
├── js/
│   ├── marked.min.js          # Markdown parser library
│   ├── renderer.js            # Fetches MD, renders to DOM
│   └── blog.js                # Fetches RSS, renders post list
│
├── content/
│   ├── about.md               # About page content
│   ├── experience.md          # Experience page content
│   └── portfolio.md           # Portfolio content (organized by direction)
│
├── assets/
│   ├── profile.jpg            # Profile photo
│   └── favicon.ico            # Site favicon
│
├── theme.md                   # Design documentation
└── arch.md                    # This file
```

---

## HTML Structure

Each HTML page follows a consistent template:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Page Title - Xiang Deng</title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@400;600&family=Inter:wght@400;500;600&family=JetBrains+Mono&display=swap" rel="stylesheet">

    <!-- Styles -->
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <nav class="nav">
        <div class="nav-container">
            <a href="/" class="nav-logo">Xiang Deng</a>
            <div class="nav-links">
                <a href="/" class="nav-link">About</a>
                <a href="/experience.html" class="nav-link">Experience</a>
                <a href="/portfolio.html" class="nav-link">Portfolio</a>
                <a href="/blog.html" class="nav-link">Blog</a>
            </div>
        </div>
    </nav>

    <main class="main">
        <div class="container">
            <article id="content">
                <!-- Markdown content renders here -->
                <noscript>
                    <p>Please enable JavaScript to view this page.</p>
                </noscript>
            </article>
        </div>
    </main>

    <footer class="footer">
        <div class="container">
            <!-- Social links, copyright -->
        </div>
    </footer>

    <!-- Scripts -->
    <script src="js/marked.min.js"></script>
    <script src="js/renderer.js"></script>
    <script>
        renderMarkdown('content/about.md', '#content');
    </script>
</body>
</html>
```

---

## Markdown Content System

### How It Works

1. **HTML Shell** - Provides layout (nav, footer, container)
2. **JavaScript** - Fetches the `.md` file specified in a data attribute or script
3. **marked.js** - Parses markdown to HTML
4. **DOM** - Rendered HTML inserted into `#content`

### Content Files

#### `content/about.md`
```markdown
# About

![Profile](/assets/profile.jpg)

Hi, I am a researcher working on agents and coding with large language models...

## Research Interests

- **Large-scale pretraining** for heterogeneous data
- **Natural language agents** that interact with the real world

## Contact

- [Google Scholar](https://scholar.google.com/...)
- [GitHub](https://github.com/xiang-deng)
- [LinkedIn](https://linkedin.com/in/...)
- Email: ...
```

#### `content/experience.md`
```markdown
# Experience

## Work

### Scale AI
**Senior Research Scientist** · Oct 2025 - Present

### Google Labs
**Research Engineer** · Aug 2023 - Oct 2025

...

## Education

### The Ohio State University
**Ph.D., Computer Science** · 2018 - 2023

...

## Awards

- Presidential Fellowship, OSU, 2022
- 3rd place, Alexa Prize TaskBot Challenge, 2022
...
```

#### `content/portfolio.md`
```markdown
# Portfolio

My research organized by direction.

---

## LLM Agents

Works on building agents that can interact with the real world.

- **Paper Title** (Venue 2024) — [paper](#) · [code](#)
- **Paper Title** (Venue 2023) — [paper](#)
...

---

## Pretraining & Representation Learning

Works on learning representations from heterogeneous data.

- **Paper Title** (Venue 2022) — [paper](#) · [code](#)
...

---

## Structured Data & Tables

Works on understanding and reasoning over structured data.

- **Paper Title** (Venue 2021) — [paper](#)
...
```

### Markdown Features Supported

The renderer will support standard markdown plus:

- Headings (h1-h6)
- Paragraphs, line breaks
- Bold, italic, strikethrough
- Links (external and internal)
- Images (with optional sizing via HTML)
- Lists (ordered, unordered, nested)
- Blockquotes
- Code (inline and fenced blocks with syntax highlighting)
- Horizontal rules
- Tables

---

## JavaScript Modules

### `js/renderer.js`

Core markdown rendering functionality:

```javascript
/**
 * Fetch a markdown file and render it to the target element
 * @param {string} mdPath - Path to the markdown file
 * @param {string} targetSelector - CSS selector for target element
 */
async function renderMarkdown(mdPath, targetSelector) {
    const target = document.querySelector(targetSelector);

    try {
        const response = await fetch(mdPath);
        if (!response.ok) throw new Error('Failed to load content');

        const markdown = await response.text();
        const html = marked.parse(markdown);
        target.innerHTML = html;

    } catch (error) {
        target.innerHTML = '<p>Error loading content.</p>';
        console.error(error);
    }
}

// Configure marked options
marked.setOptions({
    gfm: true,           // GitHub Flavored Markdown
    breaks: false,       // Don't convert \n to <br>
    headerIds: true,     // Add IDs to headers for linking
});
```

### `js/blog.js`

RSS feed fetcher for Substack integration:

```javascript
/**
 * Fetch RSS feed and render blog posts
 * @param {string} feedUrl - Substack RSS feed URL
 * @param {string} targetSelector - CSS selector for target element
 */
async function renderBlogFeed(feedUrl, targetSelector) {
    const target = document.querySelector(targetSelector);

    // Use CORS proxy for cross-origin RSS fetch
    const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(feedUrl)}`;

    try {
        const response = await fetch(proxyUrl);
        const data = await response.json();

        // Parse XML
        const parser = new DOMParser();
        const xml = parser.parseFromString(data.contents, 'text/xml');

        // Extract posts
        const items = xml.querySelectorAll('item');
        const posts = Array.from(items).map(item => ({
            title: item.querySelector('title')?.textContent,
            link: item.querySelector('link')?.textContent,
            date: item.querySelector('pubDate')?.textContent,
            description: item.querySelector('description')?.textContent,
        }));

        // Render
        target.innerHTML = posts.map(post => `
            <article class="blog-post">
                <h3><a href="${post.link}" target="_blank">${post.title}</a></h3>
                <time>${formatDate(post.date)}</time>
                <p>${truncate(post.description, 200)}</p>
            </article>
        `).join('');

    } catch (error) {
        target.innerHTML = '<p>Error loading blog posts.</p>';
        console.error(error);
    }
}

function formatDate(dateStr) {
    return new Date(dateStr).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function truncate(str, len) {
    // Strip HTML tags and truncate
    const text = str.replace(/<[^>]*>/g, '');
    return text.length > len ? text.slice(0, len) + '...' : text;
}
```

---

## Data Flow

### Content Pages (About, Experience, Portfolio)

```
1. User visits experience.html
2. Browser loads HTML shell (nav, footer, styles)
3. Script runs: renderMarkdown('content/experience.md', '#content')
4. JS fetches content/experience.md
5. marked.js parses MD → HTML
6. HTML inserted into #content
7. CSS styles the rendered content
```

### Blog Page

```
1. User visits blog.html
2. Browser loads HTML shell
3. Script runs: renderBlogFeed('https://yourname.substack.com/feed', '#content')
4. JS fetches RSS via CORS proxy
5. XML parsed to extract posts
6. Posts rendered as HTML list
7. Links point to Substack (external)
```

---

## Routing

No client-side routing needed. Standard multi-page navigation:

| URL | File | Content Source |
|-----|------|----------------|
| `/` | `index.html` | `content/about.md` |
| `/experience.html` | `experience.html` | `content/experience.md` |
| `/portfolio.html` | `portfolio.html` | `content/portfolio.md` |
| `/blog.html` | `blog.html` | Substack RSS feed |

GitHub Pages serves files directly. No server-side processing.

---

## Updating Content

### To update About/Experience/Portfolio:

1. Edit the corresponding `.md` file in `content/`
2. Commit and push to GitHub
3. Changes appear immediately (no build needed)

### To add a blog post:

1. Write and publish on Substack
2. RSS feed updates automatically
3. Blog page fetches latest posts on load

### To add a new page:

1. Create `newpage.html` (copy template from existing page)
2. Create `content/newpage.md`
3. Update nav links in all HTML files
4. Commit and push

---

## Dependencies

| Library | Version | Purpose | Size |
|---------|---------|---------|------|
| marked.js | 15.x | Markdown parsing | ~40kb |
| Google Fonts | - | Typography (Crimson Pro, Inter, JetBrains Mono) | ~100kb |

No other dependencies. No build tools. No npm.

---

## Browser Support

Modern browsers only (ES6+):
- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

Uses:
- `fetch()` API
- `async/await`
- CSS custom properties
- Template literals

---

## Deployment

### GitHub Pages

1. Push to `main` branch
2. GitHub Pages serves from root or `/docs` folder
3. Configure custom domain if desired

### Local Development

```bash
# Simple local server (Python)
python -m http.server 8000

# Or Node.js
npx serve .

# Then visit http://localhost:8000
```

No build step required. Edit files, refresh browser.

---

## Future Enhancements (Out of Scope)

- Dark mode toggle
- Search functionality
- Reading time estimates
- Table of contents generation
- Syntax highlighting for code blocks (highlight.js)
- Image lazy loading
- PWA/offline support

These can be added incrementally without changing the core architecture.
