const profileUrl = 'https://speakerdeck.com/mtdnot';

function extractSpeakerDeckUrls(html: string) {
  const matches = html.matchAll(/href="(\/mtdnot\/[^"]+)"/g);
  const urls = new Set<string>();

  for (const match of matches) {
    const path = match[1];
    if (
      path === '/mtdnot/following' ||
      path === '/mtdnot/followers' ||
      path === '/mtdnot/stars'
    ) {
      continue;
    }
    urls.add(`https://speakerdeck.com${path}`);
  }

  return [...urls];
}

export async function getSpeakerDeckEmbeds() {
  let urls: string[] = [];

  try {
    const profileResponse = await fetch(profileUrl);
    if (!profileResponse.ok) {
      throw new Error(`profile fetch failed: ${profileResponse.status}`);
    }
    const html = await profileResponse.text();
    urls = extractSpeakerDeckUrls(html);
  } catch {
    urls = [];
  }

  return Promise.all(
    urls.map(async (url) => {
      try {
        const response = await fetch(`https://speakerdeck.com/oembed.json?url=${encodeURIComponent(url)}`);
        if (!response.ok) throw new Error(`oEmbed failed: ${response.status}`);
        const data = await response.json();
        return {
          url,
          title: data.title ?? url,
          html: data.html ?? '',
        };
      } catch {
        return {
          url,
          title: url.split('/').pop()?.replaceAll('-', ' ') ?? 'SpeakerDeck',
          html: '',
        };
      }
    })
  );
}

export { profileUrl as speakerDeckProfileUrl };
