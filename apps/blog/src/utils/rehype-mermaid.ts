import { visit } from 'unist-util-visit';
import type { Plugin } from 'unified';
import type { Root, Element } from 'hast';

export const rehypeMermaid: Plugin<[], Root> = () => {
  return (tree: Root) => {
    visit(tree, 'element', (node: Element) => {
      if (
        node.tagName === 'pre' &&
        node.children &&
        node.children.length === 1 &&
        node.children[0].type === 'element' &&
        node.children[0].tagName === 'code'
      ) {
        const codeElement = node.children[0] as Element;
        const className = codeElement.properties?.className as
          | string[]
          | undefined;

        if (className && className.includes('language-mermaid')) {
          // Get the mermaid code content
          const textNode = codeElement.children?.[0];
          if (textNode && textNode.type === 'text') {
            const mermaidCode = textNode.value as string;

            // Replace the pre/code structure with a div that will be processed by client-side JavaScript
            node.tagName = 'div';
            node.properties = {
              className: ['mermaid-diagram'],
              'data-mermaid': mermaidCode,
            };
            node.children = [
              {
                type: 'element',
                tagName: 'div',
                properties: {
                  className: ['mermaid-loading'],
                },
                children: [
                  {
                    type: 'text',
                    value: 'Loading diagram...',
                  },
                ],
              },
              {
                type: 'element',
                tagName: 'pre',
                properties: {
                  className: ['mermaid-source'],
                  style: 'display: none;',
                },
                children: [
                  {
                    type: 'text',
                    value: mermaidCode,
                  },
                ],
              },
            ];
          }
        }
      }
    });
  };
};
