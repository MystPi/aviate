import { annotate as ann } from 'rough-notation';
import type { Action } from 'svelte/action';

export const annotate: Action<HTMLElement, number> = (node, delay) => {
  const annotation = ann(node, { type: 'highlight', color: 'rgb(139, 92, 246, 0.2)' });
  setTimeout(() => annotation.show(), delay);
};
