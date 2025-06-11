import { visit } from 'unist-util-visit';
import type { Root, Element } from 'hast';
import { getLocalPlaceholder } from './getPlaceHolder';

export default function rehypeImage() {
  return async (tree: Root) => {
    const nodesToProcess: Array<{
      node: Element;
      index: number;
      parent: Element;
    }> = [];

    visit(
      tree,
      (node): node is Element => {
        return node.type === 'element' && (node as Element).tagName === 'img';
      },
      (node: Element, index, parent) => {
        if (node.properties && parent && typeof index === 'number') {
          nodesToProcess.push({
            node,
            index,
            parent: parent as Element,
          });
        }
      }
    );

    const promises = nodesToProcess.map(async ({ node, index, parent }) => {
      const { src, alt, width, height, ...otherProps } = node.properties!;

      const imgElement: Element = {
        type: 'element',
        tagName: 'img',
        properties: {
          class:
            'cursor-zoom-in rounded border-solid border-gray-300 border-1 object-cover lightbox-image',
          src,
          ...(typeof src === 'string' &&
            src.startsWith('./') && {
              style: (await getLocalPlaceholder(src)).style,
            }),
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

      parent.children[index] = figureElement;
    });

    await Promise.all(promises);

    return tree;
  };
}
