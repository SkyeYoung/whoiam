import type { Page } from 'astro';
import type { CollectionEntry } from 'astro:content';
import clsx from 'clsx';

type Props = {
  page: Page<CollectionEntry<'blog'>>;
};

export const ListPagination = ({ page }: Props) => {
  if (page.lastPage === 1) return null;

  return (
    <nav
      role="navigation"
      aria-label="Pagination"
      className="flex justify-between mt-4 px-4"
    >
      <a
        href={page.url.prev}
        className="previous-page"
        aria-label="Go to previous page"
      >
        {page.url.prev || (true && 'Prev')}
      </a>

      {Array.from({ length: page.lastPage }, (_, i) => i + 1).map((num) => (
        <a
          key={num}
          href={`/pages/${num}`}
          className={clsx(
            num === page.currentPage && 'opacity-50 cursor-not-allowed'
          )}
          aria-label={`Go to page ${num}`}
          aria-disabled={num === page.currentPage}
        >
          {num}
        </a>
      ))}

      <a
        href={page.url.next}
        className="next-page"
        aria-label="Go to next page"
      >
        {page.url.next || (true && 'Next')}
      </a>
    </nav>
  );
};
