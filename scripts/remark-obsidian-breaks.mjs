function transformNode(node) {
  if (!node || !node.children) return;

  node.children = node.children.flatMap((child) => {
    if (child.type === 'text' && child.value.includes('\n')) {
      const parts = child.value.split('\n');
      return parts.flatMap((part, index) => {
        const nodes = [];
        if (part) {
          nodes.push({ type: 'text', value: part });
        }
        if (index < parts.length - 1) {
          nodes.push({ type: 'break' });
        }
        return nodes;
      });
    }

    transformNode(child);
    return child;
  });
}

export default function remarkObsidianBreaks() {
  return transformNode;
}
