export type Locale = 'ja' | 'en';

export function getLocaleFromPath(pathname: string): Locale {
  return pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'ja';
}

export function localeBase(locale: Locale): string {
  return locale === 'en' ? '/en' : '';
}

export function localizePath(path: string, locale: Locale): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  const cleaned = normalized === '/' ? '' : normalized.replace(/\/$/, '');
  return locale === 'en' ? `/en${cleaned}/`.replace(/\/+/g, '/') : `${cleaned || ''}/`.replace(/\/+/g, '/');
}

export function switchLocalePath(pathname: string, target: Locale): string {
  const current = getLocaleFromPath(pathname);
  if (current === target) return pathname;

  if (target === 'en') {
    return pathname === '/' ? '/en/' : `/en${pathname}`.replace(/\/+/g, '/');
  }

  return pathname.replace(/^\/en(?=\/|$)/, '') || '/';
}

export const ui = {
  ja: {
    home: 'ホーム',
    about: '私について',
    products: 'プロダクト',
    slides: 'スライド',
    promise: '約束',
    notice: '利用表記',
    allPosts: '記事一覧',
    toc: '目次',
    latest: 'latest',
    empty: 'empty',
    noImage: 'no image',
    author: '著者',
  },
  en: {
    home: 'Home',
    about: 'About',
    products: 'Products',
    slides: 'Slides',
    promise: 'Promise',
    notice: 'Credits',
    allPosts: 'All posts',
    toc: 'Contents',
    latest: 'latest',
    empty: 'empty',
    noImage: 'no image',
    author: 'Author',
  },
} as const;
