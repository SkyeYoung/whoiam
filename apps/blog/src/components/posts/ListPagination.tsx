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
      className="flex flex-wrap justify-center gap-2 mt-6 px-2 sm:px-4"
    >
      {page.url.prev && (
        <a
          href={page.url.prev}
          className="px-3 py-2 text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md transition-colors"
          aria-label="Go to previous page"
        >
          ← 上一页
        </a>
      )}

      <div className="flex gap-1 sm:gap-2">
        {Array.from({ length: page.lastPage }, (_, i) => i + 1).map((num) => (
          <a
            key={num}
            href={`/pages/${num}`}
            className={clsx(
              'px-3 py-2 text-sm rounded-md transition-colors',
              num === page.currentPage
                ? 'bg-theme-primary text-white cursor-default'
                : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800'
            )}
            aria-label={`Go to page ${num}`}
            aria-current={num === page.currentPage ? 'page' : undefined}
          >
            {num}
          </a>
        ))}
      </div>

      {page.url.next && (
        <a
          href={page.url.next}
          className="px-3 py-2 text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md transition-colors"
          aria-label="Go to next page"
        >
          下一页 →
        </a>
      )}
    </nav>
  );
};
