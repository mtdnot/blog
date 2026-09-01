import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BLOG_DIR = path.join(__dirname, '..');
const OUTPUT_DIR = path.join(BLOG_DIR, 'src/content/posts/public');
const PUBLIC_IMAGES_DIR = path.join(BLOG_DIR, 'public/images');
const DEFAULT_VAULT_DIR = path.join(os.homedir(), 'Documents/obsidian/索');
const VAULT_DIR = process.env.OBSIDIAN_VAULT_DIR || DEFAULT_VAULT_DIR;
const SOURCE_DIR = path.join(VAULT_DIR, 'blog');
const ASSET_DIRS = [
  SOURCE_DIR,
  path.join(VAULT_DIR, 'media'),
  path.join(VAULT_DIR, 'assets'),
];
const VALID_CATEGORIES = new Set(['life', 'tech', 'business', 'research']);
const EXCLUDED_NOTES = new Set(['書くこと.md']);

function parseFrontmatter(source) {
  if (!source.startsWith('---\n')) {
    return { data: {}, body: source };
  }

  const endIndex = source.indexOf('\n---\n', 4);
  if (endIndex === -1) {
    return { data: {}, body: source };
  }

  const raw = source.slice(4, endIndex);
  const body = source.slice(endIndex + 5);
  const data = {};

  for (const line of raw.split('\n')) {
    const match = line.match(/^([A-Za-z][A-Za-z0-9_-]*):\s*(.*)$/);
    if (!match) continue;
    const [, key, rawValue] = match;
    data[key] = parseValue(rawValue.trim());
  }

  return { data, body };
}

function parseValue(value) {
  if (!value) return '';
  if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
    return value.slice(1, -1);
  }
  if (value.startsWith('[') && value.endsWith(']')) {
    return value
      .slice(1, -1)
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean)
      .map((item) => item.replace(/^['"]|['"]$/g, ''));
  }
  if (value === 'true') return true;
  if (value === 'false') return false;
  return value;
}

function formatFrontmatter(data) {
  const lines = ['---'];
  lines.push(`title: ${quoteString(data.title)}`);
  lines.push(`date: ${data.date}`);
  lines.push(`description: ${quoteString(data.description)}`);
  lines.push(`category: ${quoteString(data.category)}`);
  if (data.thumbnail) {
    lines.push(`thumbnail: ${quoteString(data.thumbnail)}`);
  }
  if (data.tags?.length) {
    lines.push(`tags: [${data.tags.map((tag) => quoteString(tag)).join(', ')}]`);
  }
  lines.push('---', '');
  return `${lines.join('\n')}`;
}

function quoteString(value) {
  return JSON.stringify(String(value));
}

function slugify(value) {
  return value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[\/\\?%*:|"<>]/g, '-');
}

function collectExistingPosts() {
  const existing = new Map();

  for (const entry of fs.readdirSync(OUTPUT_DIR)) {
    if (!entry.endsWith('.md')) continue;
    const filePath = path.join(OUTPUT_DIR, entry);
    const raw = fs.readFileSync(filePath, 'utf8');
    const { data } = parseFrontmatter(raw);
    if (!data.title) continue;
    existing.set(String(data.title), {
      slug: entry.slice(0, -3),
      date: typeof data.date === 'string' ? data.date : '',
      description: typeof data.description === 'string' ? data.description : '',
      category: typeof data.category === 'string' ? data.category : '',
      thumbnail: typeof data.thumbnail === 'string' ? data.thumbnail : '',
      tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    });
  }

  return existing;
}

function buildAssetIndex() {
  const index = new Map();

  for (const baseDir of ASSET_DIRS) {
    if (!fs.existsSync(baseDir)) continue;
    walkFiles(baseDir, (filePath) => {
      const name = path.basename(filePath);
      if (!index.has(name)) {
        index.set(name, filePath);
      }
    });
  }

  return index;
}

function walkFiles(dirPath, onFile) {
  for (const entry of fs.readdirSync(dirPath, { withFileTypes: true })) {
    if (entry.name.startsWith('.')) continue;
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      walkFiles(fullPath, onFile);
      continue;
    }
    onFile(fullPath);
  }
}

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function normalizeTags(tags) {
  if (!Array.isArray(tags)) return [];
  return tags.map((tag) => String(tag).trim()).filter(Boolean);
}

function extractImageRefs(body) {
  return [...body.matchAll(/!\[\[([^\]]+)\]\]/g)].map((match) => match[1]);
}

function resolveImageName(rawRef) {
  return rawRef.replace(/\|.*$/, '').trim();
}

function inferCategory({ fileName, title, body }) {
  const text = `${fileName}\n${title}\n${body}`.toLowerCase();

  if (
    /防災|災害|減災|復興|復旧|震災|地震|研究|multi agent|mas|複雑系|アルゴリズム|情報工学|システム|ai|agent/.test(text)
  ) {
    return 'research';
  }

  if (
    /起業|ビジネス|事業|顧客|会社|収益|お金|スタートアップ/.test(text)
  ) {
    return 'business';
  }

  if (
    /nixos|linux|astro|web|プログラム|コード|ソフトウェア|開発/.test(text)
  ) {
    return 'tech';
  }

  return 'life';
}

function sync() {
  if (!fs.existsSync(SOURCE_DIR)) {
    console.warn(`[sync-obsidian-posts] source not found: ${SOURCE_DIR}`);
    return;
  }

  const existingPosts = collectExistingPosts();
  const assetIndex = buildAssetIndex();
  const noteFiles = fs.readdirSync(SOURCE_DIR)
    .filter((name) => name.endsWith('.md'))
    .filter((name) => !EXCLUDED_NOTES.has(name))
    .sort();
  const warnings = [];
  const noteConfigs = noteFiles.map((fileName) => {
    const sourcePath = path.join(SOURCE_DIR, fileName);
    const rawSource = fs.readFileSync(sourcePath, 'utf8');
    const { data: noteData } = parseFrontmatter(rawSource);
    const fallbackTitle = path.basename(fileName, '.md');
    const title = String(noteData.title || fallbackTitle);
    const existing = existingPosts.get(title) || existingPosts.get(fallbackTitle);

    return {
      fileName,
      sourcePath,
      rawSource,
      noteData,
      fallbackTitle,
      title,
      existing,
      slug: String(noteData.slug || existing?.slug || slugify(fallbackTitle)),
    };
  });
  const titleToSlug = new Map(
    noteConfigs.map((config) => [config.title, config.slug]),
  );

  for (const { fileName, sourcePath, rawSource, noteData, title, existing, slug } of noteConfigs) {
    const { body: noteBody } = parseFrontmatter(rawSource);
    const category = String(noteData.category || existing?.category || inferCategory({ fileName, title, body: noteBody }));

    if (!VALID_CATEGORIES.has(category)) {
      warnings.push(`${fileName}: missing valid category, skipped`);
      continue;
    }

    const stat = fs.statSync(sourcePath);
    const date = String(noteData.date || existing?.date || stat.mtime.toISOString().slice(0, 10));
    const description = String(noteData.description || existing?.description || title);
    const tags = normalizeTags(noteData.tags || existing?.tags || []);
    const postImageDir = path.join(PUBLIC_IMAGES_DIR, slug);
    const imageRefs = extractImageRefs(noteBody);
    const copiedImages = [];

    fs.rmSync(postImageDir, { recursive: true, force: true });
    ensureDir(postImageDir);

    let body = noteBody.replace(/!\[\[([^\]]+)\]\]/g, (full, ref) => {
      const imageName = resolveImageName(ref);
      const sourceImagePath = assetIndex.get(imageName);
      if (!sourceImagePath) {
        warnings.push(`${fileName}: image not found: ${imageName}`);
        return full;
      }

      const targetPath = path.join(postImageDir, imageName);
      fs.copyFileSync(sourceImagePath, targetPath);
      copiedImages.push(imageName);
      return `![${imageName}](/images/${slug}/${encodeURIComponent(imageName).replace(/%2F/g, '/')})`;
    });

    body = body.replace(/\[\[([^\]]+)\]\]/g, (full, ref) => {
      const targetTitle = ref.split('|')[0].trim();
      const targetSlug = titleToSlug.get(targetTitle);
      if (!targetSlug) {
        return targetTitle;
      }
      return `[${targetTitle}](/posts/${targetSlug}/)`;
    });

    const thumbnail = String(
      noteData.thumbnail
      || existing?.thumbnail
      || (copiedImages[0] ? `/images/${slug}/${encodeURIComponent(copiedImages[0]).replace(/%2F/g, '/')}` : ''),
    );

    const frontmatter = formatFrontmatter({
      title,
      date,
      description,
      category,
      thumbnail,
      tags,
    });

    const outputPath = path.join(OUTPUT_DIR, `${slug}.md`);
    fs.writeFileSync(outputPath, `${frontmatter}${body.trim()}\n`);
  }

  if (warnings.length) {
    console.warn('[sync-obsidian-posts] warnings:');
    for (const warning of warnings) {
      console.warn(`- ${warning}`);
    }
  }
}

sync();
