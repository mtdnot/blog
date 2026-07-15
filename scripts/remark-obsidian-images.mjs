import imagePaths from './obsidian-image-map.json' with { type: 'json' };

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function parseEmbed(value) {
  const data = {};
  for (const line of value.split('\n')) {
    const match = line.match(/^([A-Za-z][A-Za-z0-9]*):\s*(.*)$/);
    if (!match) continue;
    const [, key, rawValue] = match;
    try {
      data[key] = JSON.parse(rawValue);
    } catch {
      data[key] = rawValue.trim();
    }
  }
  return data;
}

function safeHttpUrl(value) {
  if (typeof value !== 'string') return '';
  try {
    const url = new URL(value);
    return ['http:', 'https:'].includes(url.protocol) ? url.href : '';
  } catch {
    return '';
  }
}

function renderEmbed(value) {
  const data = parseEmbed(value);
  const url = safeHttpUrl(data.url);
  if (!url) return null;

  const title = escapeHtml(String(data.title || new URL(url).hostname));
  const description = escapeHtml(String(data.description || ''));
  const image = safeHttpUrl(data.image);
  const hostname = escapeHtml(new URL(url).hostname);
  const imageHtml = image
    ? `<span class="embed-card-media"><img src="${escapeHtml(image)}" alt="" loading="lazy" decoding="async"></span>`
    : '<span class="embed-card-media embed-card-placeholder" aria-hidden="true">↗</span>';

  return `<a class="embed-card" href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">${imageHtml}<span class="embed-card-body"><strong class="embed-card-title">${title}</strong>${description ? `<span class="embed-card-description">${description}</span>` : ''}<span class="embed-card-host">${hostname}</span></span></a>`;
}

function transformNode(node) {
  if (!node.children) return;

  node.children = node.children.flatMap((child) => {
    if (child.type === 'code' && child.lang === 'embed') {
      const html = renderEmbed(child.value);
      return html ? { type: 'html', value: html } : child;
    }

    if (child.type !== 'text') {
      transformNode(child);
      return child;
    }

    const parts = child.value.split(/(!\[\[[^\]]+\]\])/g);
    if (parts.length === 1) return child;

    return parts.filter(Boolean).map((part) => {
      const match = part.match(/^!\[\[([^\]]+)\]\]$/);
      if (!match) return { type: 'text', value: part };

      const rawKey = match[1];
      const cleanKey = rawKey.replace(/\|.*$/, '');
      if (!imagePaths[cleanKey]) {
        return { type: 'text', value: part };
      }

      return {
        type: 'image',
        url: imagePaths[cleanKey],
        alt: rawKey,
      };
    });
  });
}

export default function remarkObsidianImages() {
  return transformNode;
}
