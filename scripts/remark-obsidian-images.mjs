import imagePaths from './obsidian-image-map.json' with { type: 'json' };

function transformNode(node) {
  if (!node.children) return;

  node.children = node.children.flatMap((child) => {
    if (child.type !== 'text') {
      transformNode(child);
      return child;
    }

    const parts = child.value.split(/(!\[\[[^\]]+\]\])/g);
    if (parts.length === 1) return child;

    return parts.filter(Boolean).map((part) => {
      const match = part.match(/^!\[\[([^\]]+)\]\]$/);
      if (!match || !imagePaths[match[1]]) {
        return { type: 'text', value: part };
      }

      return {
        type: 'image',
        url: imagePaths[match[1]],
        alt: match[1],
      };
    });
  });
}

export default function remarkObsidianImages() {
  return transformNode;
}
