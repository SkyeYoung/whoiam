import { visit } from 'unist-util-visit';
import type { Root, Element } from 'hast';

export default function rehypeImage() {
  return (tree: Root) => {
    visit(tree, 'element', (node: Element, index, parent) => {
      if (node.tagName === 'img' && node.properties) {
        const { src, alt, width, height, ...otherProps } = node.properties;

        const imgElement: Element = {
          type: 'element',
          tagName: 'img',
          properties: {
            class:
              'cursor-zoom-in rounded border-solid border-gray-300 border-1 object-cover lightbox-image',
            src,
            'data-raw-src': src,
            alt,
            ...(width && { width }),
            ...(height && { height }),
            ...otherProps,
          },
          children: [],
        };

        const figcaptionElement: Element = {
          type: 'element',
          tagName: 'figcaption',
          properties: {
            class: 'text-sm text-gray-500 mt-2',
          },
          children: [
            {
              type: 'element',
              tagName: 'span',
              properties: {
                class: 'select-none',
              },
              children: [
                {
                  type: 'text',
                  value: '— ',
                },
              ],
            },
            {
              type: 'text',
              value: String(alt || ''),
            },
          ],
        };

        const figureElement: Element = {
          type: 'element',
          tagName: 'figure',
          properties: {},
          children: [imgElement, figcaptionElement],
        };

        if (parent && typeof index === 'number') {
          (parent as Element).children[index] = figureElement;
        }
      }
    });
  };
}
