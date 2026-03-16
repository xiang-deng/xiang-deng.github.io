/**
 * Markdown Renderer
 * Fetches .md files and renders them via marked.js
 */

// Configure marked options
marked.setOptions({
  gfm: true,
  breaks: false,
});

// Custom renderer: external links open in new tab
const renderer = new marked.Renderer();
const originalLinkRenderer = renderer.link.bind(renderer);

renderer.link = function (href, title, text) {
  // Handle marked.js v15+ which passes an object
  if (typeof href === 'object') {
    const token = href;
    href = token.href;
    title = token.title;
    text = token.text;
  }

  const html = `<a href="${href}"${title ? ` title="${title}"` : ''}`;

  // External links get target="_blank"
  if (href && (href.startsWith('http://') || href.startsWith('https://'))) {
    return html + ` target="_blank" rel="noopener">${text}</a>`;
  }

  return html + `>${text}</a>`;
};

marked.setOptions({ renderer });

/**
 * Fetch a markdown file and render it to the target element
 * @param {string} mdPath - Path to the markdown file
 * @param {string} targetSelector - CSS selector for target element
 */
async function renderMarkdown(mdPath, targetSelector) {
  const target = document.querySelector(targetSelector);
  if (!target) return;

  try {
    const response = await fetch(mdPath);
    if (!response.ok) throw new Error('Failed to load content');

    const markdown = await response.text();
    const html = marked.parse(markdown);
    target.innerHTML = html;
    target.classList.add('loaded');
  } catch (error) {
    target.innerHTML = '<p>Error loading content. Please try refreshing the page.</p>';
    target.classList.add('loaded');
    console.error('Markdown render error:', error);
  }
}

/**
 * Transform paper <li> entries into structured two-row components.
 * Expects the markdown pattern: **Title** (Venue Year) — [link](url) · *note*
 */
function postProcessPapers(container) {
  if (!container) return;

  container.querySelectorAll('ul').forEach(ul => {
    const items = Array.from(ul.children);
    const isPaperList = items.some(li =>
      li.querySelector('strong') && /\([^)]+\d{4}\)/.test(li.textContent)
    );
    if (!isPaperList) return;

    const paperList = document.createElement('div');
    paperList.className = 'paper-list';

    items.forEach(li => {
      const strong = li.querySelector('strong');
      if (!strong) return;

      const entry = document.createElement('div');
      entry.className = 'paper-entry';

      const titleDiv = document.createElement('div');
      titleDiv.className = 'paper-title';
      titleDiv.textContent = strong.textContent;
      entry.appendChild(titleDiv);

      const metaDiv = document.createElement('div');
      metaDiv.className = 'paper-meta';

      const venueMatch = li.textContent.match(/\(([^)]+)\)/);
      if (venueMatch) {
        const venueSpan = document.createElement('span');
        venueSpan.className = 'paper-venue';
        venueSpan.textContent = venueMatch[1];
        metaDiv.appendChild(venueSpan);
      }

      li.querySelectorAll('a').forEach(a => {
        const sep = document.createElement('span');
        sep.className = 'paper-sep';
        sep.textContent = '\u00b7';
        metaDiv.appendChild(sep);

        const link = a.cloneNode(true);
        link.className = 'paper-link';
        metaDiv.appendChild(link);
      });

      const em = li.querySelector('em');
      if (em) {
        const sep = document.createElement('span');
        sep.className = 'paper-sep';
        sep.textContent = '\u00b7';
        metaDiv.appendChild(sep);

        const noteSpan = document.createElement('span');
        noteSpan.className = 'paper-note';
        noteSpan.textContent = em.textContent;
        metaDiv.appendChild(noteSpan);
      }

      entry.appendChild(metaDiv);
      paperList.appendChild(entry);
    });

    ul.parentNode.replaceChild(paperList, ul);
  });
}

/**
 * Transform experience <li> entries into structured three-row components.
 * Detects entries with <br> separators (Work / Education).
 * Awards lists (no <br>) are left unchanged.
 */
function postProcessExperience(container) {
  if (!container) return;

  container.querySelectorAll('ul').forEach(ul => {
    const items = Array.from(ul.children);
    const isExpList = items.some(li => li.querySelector('br'));
    if (!isExpList) return;

    const expList = document.createElement('div');
    expList.className = 'exp-list';

    items.forEach(li => {
      const strong = li.querySelector('strong');
      if (!strong) return;

      const entry = document.createElement('div');
      entry.className = 'exp-entry';

      const orgDiv = document.createElement('div');
      orgDiv.className = 'exp-org';
      orgDiv.textContent = strong.textContent;
      entry.appendChild(orgDiv);

      const raw = li.innerHTML.replace(/<\/?p>/gi, '');
      const parts = raw.split(/<br\s*\/?>/i);

      if (parts[1]) {
        const roleDiv = document.createElement('div');
        roleDiv.className = 'exp-role';
        const tmp = document.createElement('span');
        tmp.innerHTML = parts[1];
        roleDiv.textContent = tmp.textContent.trim();
        entry.appendChild(roleDiv);
      }

      if (parts[2]) {
        const advisorDiv = document.createElement('div');
        advisorDiv.className = 'exp-advisor';
        const tmp = document.createElement('span');
        tmp.innerHTML = parts.slice(2).join(' ').trim();
        advisorDiv.textContent = tmp.textContent.trim();
        entry.appendChild(advisorDiv);
      }

      expList.appendChild(entry);
    });

    ul.parentNode.replaceChild(expList, ul);
  });
}
