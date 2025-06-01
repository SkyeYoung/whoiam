import type { MarkdownHeading } from 'astro';
import clsx from 'clsx';

export const Toc = ({ headings }: { headings: MarkdownHeading[] }) => {
  return (
    <div>
      {headings.map((heading) => (
        <>
          <a
            key={heading.slug}
            href={`#${heading.slug}`}
            className={clsx(
              `block ml-0`,
              heading.depth === 1 && 'ml-2',
              heading.depth === 2 && 'ml-4',
              heading.depth > 2 && 'ml-8'
            )}
          >
            {heading.text}
          </a>
        </>
      ))}
    </div>
  );
};
