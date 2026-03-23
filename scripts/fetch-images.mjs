import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIRECTUS_URL = 'https://directus.mtdnot.dev';
const DIRECTUS_TOKEN = process.env.DIRECTUS_TOKEN || '';
const PUBLIC_DIR = path.join(__dirname, '../public/images/directus');

async function fetchDocuments() {
  const url = `${DIRECTUS_URL}/items/documents?fields=id,slug,content,clearance,project_id&filter[status][_eq]=published&filter[clearance][_eq]=0`;
  const res = await fetch(url, {
    headers: { 'Authorization': `Bearer ${DIRECTUS_TOKEN}` }
  });
  const json = await res.json();
  return json.data || [];
}

async function downloadImage(assetId) {
  const url = `${DIRECTUS_URL}/assets/${assetId}`;
  const res = await fetch(url, {
    headers: { 'Authorization': `Bearer ${DIRECTUS_TOKEN}` }
  });
  if (!res.ok) {
    console.error(`Failed to download: ${assetId}`);
    return null;
  }
  return Buffer.from(await res.arrayBuffer());
}

function extractAssetIds(content) {
  if (!content) return [];
  const regex = /https:\/\/directus\.mtdnot\.dev\/assets\/([a-f0-9-]+)/g;
  const ids = [];
  let match;
  while ((match = regex.exec(content)) !== null) {
    ids.push(match[1]);
  }
  return [...new Set(ids)];
}

async function main() {
  console.log('Fetching L0 documents...');
  const docs = await fetchDocuments();
  console.log(`Found ${docs.length} documents`);

  fs.mkdirSync(PUBLIC_DIR, { recursive: true });

  const allAssetIds = new Set();
  for (const doc of docs) {
    const ids = extractAssetIds(doc.content);
    ids.forEach(id => allAssetIds.add(id));
  }

  console.log(`Found ${allAssetIds.size} unique images`);

  for (const assetId of allAssetIds) {
    const outPath = path.join(PUBLIC_DIR, `${assetId}.png`);
    if (fs.existsSync(outPath)) {
      console.log(`Skip (exists): ${assetId}`);
      continue;
    }
    console.log(`Downloading: ${assetId}`);
    const data = await downloadImage(assetId);
    if (data) {
      fs.writeFileSync(outPath, data);
    }
  }

  console.log('Done!');
}

main().catch(console.error);
