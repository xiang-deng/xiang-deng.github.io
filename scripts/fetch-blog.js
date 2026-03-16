/**
 * Fetch Substack RSS feed and write blog.json
 * Usage: node scripts/fetch-blog.js
 */

const FEED_URL = 'https://xiangdeng.substack.com/feed';
const OUTPUT = 'content/blog.json';

async function main() {
  const res = await fetch(FEED_URL);
  if (!res.ok) throw new Error(`Feed fetch failed: ${res.status}`);

  const xml = await res.text();

  // Simple XML extraction (no dependencies)
  const items = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)];

  const posts = items.map(([, body]) => ({
    title: tag(body, 'title'),
    link: tag(body, 'link'),
    date: tag(body, 'pubDate'),
    description: stripHtml(tag(body, 'description')).slice(0, 200),
  }));

  const fs = require('fs');
  const path = require('path');
  const outPath = path.resolve(__dirname, '..', OUTPUT);
  fs.writeFileSync(outPath, JSON.stringify(posts, null, 2) + '\n');
  console.log(`Wrote ${posts.length} posts to ${OUTPUT}`);
}

function tag(xml, name) {
  // Handle both <tag>text</tag> and <tag><![CDATA[text]]></tag>
  const m = xml.match(new RegExp(`<${name}><!\\[CDATA\\[([\\s\\S]*?)\\]\\]></${name}>`))
           || xml.match(new RegExp(`<${name}>([\\s\\S]*?)</${name}>`));
  return m ? m[1].trim() : '';
}

function stripHtml(str) {
  return str.replace(/<[^>]*>/g, '').replace(/&#\d+;/g, m => {
    return String.fromCharCode(parseInt(m.slice(2, -1)));
  }).replace(/&[a-z]+;/gi, ' ').trim();
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
