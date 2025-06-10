import type { Root } from 'hast';
import { visit } from 'unist-util-visit';
import type { Element } from 'hast';

export const DEFAULT_FAVICON_SIZE = 32;

interface RehypeExternalLinksOptions {
  getFaviconLink: (href: string) => Promise<string> | string;
  showFavicon?: boolean;
  showExternalIcon?: boolean;
}

interface LinkToProcess {
  node: Element;
  index: number;
  parent: Element;
  href: string;
}

export function rehypeExternalLinks(options: RehypeExternalLinksOptions) {
  const {
    getFaviconLink,
    showFavicon = true,
    showExternalIcon = false,
  } = options;

  return async function (tree: Root) {
    const linksToProcess: LinkToProcess[] = [];

    visit(
      tree,
      (node): node is Element => {
        return node.type === 'element' && (node as Element).tagName === 'a';
      },
      (node: Element, index, parent) => {
        if (
          node.properties &&
          node.properties.href &&
          parent &&
          typeof index === 'number'
        ) {
          const href = String(node.properties.href);
          if (isExternalLink(href)) {
            linksToProcess.push({
              node,
              index,
              parent: parent as Element,
              href,
            });
          }
        }
      }
    );

    const promises = linksToProcess.map(
      async ({ node, index, parent, href }) => {
        const children: Element[] = [];
        if (showFavicon) {
          const faviconSrc = await getFaviconLink(href);

          const faviconEl: Element = {
            type: 'element',
            tagName: 'img',
            properties: {
              src: faviconSrc,
              alt: `${href} favicon`,
              width: 16,
              height: 16,
              loading: 'lazy',
              class:
                'no-underline rounded-full inline-block mr-0.5 mt-0 mb-0.5 align-middle',
            },
            children: [],
          };

          children.push(faviconEl);
        }

        node.properties!.target = '_blank';
        node.properties!.rel = 'noopener noreferrer';
        children.push(node);

        if (showExternalIcon) {
          const externalIconEl: Element = {
            type: 'element',
            tagName: 'img',
            properties: {
              src: '/external.png',
            },
            children: [],
          };
          children.push(externalIconEl);
        }

        const spanElement: Element = {
          type: 'element',
          tagName: 'span',
          properties: {
            class: 'external-link-wrapper inline mx-1',
          },
          children,
        };

        parent.children[index] = spanElement;
      }
    );

    await Promise.all(promises);
  };
}

function isExternalLink(href: string): boolean {
  return href.startsWith('http://') || href.startsWith('https://');
}

export default rehypeExternalLinks;
