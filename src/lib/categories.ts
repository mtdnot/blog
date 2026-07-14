export const categoryOrder = ['life', 'tech', 'business', 'research'] as const;

export type CategoryKey = typeof categoryOrder[number];

export const categoryMeta: Record<CategoryKey, { label: { ja: string; en: string }; description: { ja: string; en: string } }> = {
  life: {
    label: { ja: '生活', en: 'Life' },
    description: { ja: '日々のこと、習慣、活動ログ。', en: 'Daily life, routines, and logs.' },
  },
  tech: {
    label: { ja: '技術', en: 'Tech' },
    description: { ja: '開発、設計、環境構築の記録。', en: 'Development, design, and environment notes.' },
  },
  business: {
    label: { ja: 'ビジネス', en: 'Business' },
    description: { ja: '事業、運営、意思決定のメモ。', en: 'Business, operations, and decision notes.' },
  },
  research: {
    label: { ja: '研究', en: 'Research' },
    description: { ja: '調査、実験、検討の記録。', en: 'Research, experiments, and investigation notes.' },
  },
};
