/**
 * Blog Feed Renderer
 * Loads pre-fetched blog posts from local JSON
 */

/**
 * Render blog posts from local JSON file
 * @param {string} jsonUrl - path to blog.json
 * @param {string} targetSelector - CSS selector for target element
 */
async function renderBlogFeed(jsonUrl, targetSelector) {
  const target = document.querySelector(targetSelector);
  if (!target) return;

  try {
    const response = await fetch(jsonUrl);
    if (!response.ok) throw new Error('Failed to load blog data');

    const posts = await response.json();

    if (posts.length === 0) throw new Error('No posts found');

    target.innerHTML = posts.map(post => `
      <article class="blog-post">
        <h3><a href="${escapeHtml(post.link)}" target="_blank" rel="noopener">${escapeHtml(post.title)}</a></h3>
        <time>${formatDate(post.date)}</time>
        <p><em>${truncate(escapeHtml(post.description), 200)}</em></p>
      </article>
    `).join('');

    target.classList.add('loaded');
  } catch (error) {
    target.innerHTML = `
      <div class="blog-fallback">
        <p>Blog posts are hosted on Substack.</p>
        <p><a href="https://xiangdeng.substack.com" target="_blank" rel="noopener">Visit my Substack &rarr;</a></p>
      </div>
    `;
    target.classList.add('loaded');
    console.error('Blog feed error:', error);
  }
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  try {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return dateStr;
  }
}

function truncate(str, len) {
  if (!str) return '';
  return str.length > len ? str.slice(0, len) + '...' : str;
}

function escapeHtml(str) {
  if (!str) return '';
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
