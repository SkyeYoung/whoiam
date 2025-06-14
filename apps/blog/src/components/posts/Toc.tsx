import type { MarkdownHeading } from 'astro';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import RiMenu2Fill from '~icons/ri/menu-2-fill';

type Position = Pick<DOMRect, 'x' | 'y'> & {
  id: string;
  h: number;
};

export const getTocItems = (basePoint: Pick<Position, 'x' | 'y'>) => {
  const tocEls = Array.from(document.querySelectorAll('#toc a'));
  return tocEls.map((el) => {
    const rect = el.getBoundingClientRect();
    return {
      id: el.getAttribute('href')!.slice(1),
      h: rect.height,
      x: rect.x - basePoint.x - 3,
      y: rect.y - basePoint.y,
    };
  });
};

export const useVisibles = (ids: string[]) => {
  const [visibles, setVisibles] = useState<string[]>([]);

  useEffect(() => {
    if (!ids.length) return;

    const func = (entries: IntersectionObserverEntry[]) => {
      const newVisibles = entries
        .filter((entry) => entry.isIntersecting)
        .map((entry) => entry.target.id);
      const oldSet = new Set(visibles);
      const newSet = new Set(newVisibles);
      if (oldSet.symmetricDifference(newSet).size === 0) return;
      setVisibles(newVisibles);
    };

    const observer = new IntersectionObserver(func, {
      rootMargin: '-10% 0px -40% 0px',
      threshold: 0.6,
    });

    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    elements.forEach((el) => observer.observe(el!));

    return () => observer.disconnect();
  }, [ids]);

  return visibles;
};

type IdPointObj = Record<string, { start: number; end: number }>;
const updatePathD = (points: Position[], path: SVGPathElement) => {
  let pathD = '';
  let last = points[0];
  const idPointObj: IdPointObj = {};
  const padding = 2;

  const getCurTotal = (p: string) => {
    path.setAttribute('d', p);
    return path.getTotalLength();
  };
  for (const [idx, point] of points.entries()) {
    const { x, y, h } = point;
    const gapToLast = last.id === point.id ? 0 : (y - last.y - last.h) / 2;
    const start = y - gapToLast;

    const next = points[idx + 1];
    const gapToNext = next ? (next.y - y - h) / 2 : 0;
    const end = y + h + gapToNext;

    if (idx === 0) {
      pathD += `M${x},${start + padding} `;
    }
    // update Horizontal line
    if (last.x !== x) {
      pathD += `L${x},${start} `;
    }

    // init point
    idPointObj[point.id] = {
      start: getCurTotal(pathD),
      end: 0,
    };

    // update Vertical line
    pathD += `L${x},${!next ? end - padding : end} `;

    // update end point
    idPointObj[point.id] = {
      ...idPointObj[point.id],
      end: getCurTotal(pathD),
    };

    last = point;
  }

  return { idPointObj };
};

export const Toc = (props: { headings: MarkdownHeading[] }) => {
  const headings = props.headings.filter((h) => h.depth <= 4);
  const allIds = headings.map((h) => h.slug);
  const visibles = useVisibles(allIds);

  const tocRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  const [idPointObj, setIdPointObj] = useState<IdPointObj>({});
  useEffect(() => {
    const tocRect = tocRef.current!.getBoundingClientRect();
    const tocItems = getTocItems(tocRect);
    const { idPointObj } = updatePathD(tocItems, pathRef.current!);
    setIdPointObj(idPointObj);
  }, []);

  useEffect(() => {
    const path = pathRef.current;
    if (!path || !visibles.length) return;

    const total = path.getTotalLength();
    const start = idPointObj[visibles[0]].start;
    const end = idPointObj[visibles.at(-1)!].end;

    requestAnimationFrame(() => {
      path.setAttribute('stroke-dashoffset', '1');
      path.setAttribute(
        'stroke-dasharray',
        `1, ${start}, ${end - start}, ${total}`
      );
    });
  }, [visibles, idPointObj]);

  return (
    <section
      id="toc"
      className="relative w-[300px] overflow-x-auto text-zinc-600 dark:text-zinc-400 hidden md:block"
      ref={tocRef}
    >
      <div className="flex items-center gap-1">
        <RiMenu2Fill />
        <span>目录</span>
      </div>
      <svg
        className="absolute left-0 top-0 w-20"
        style={{
          pointerEvents: 'none',
          height: tocRef.current?.clientHeight || 0,
        }}
      >
        <path
          ref={pathRef}
          className="transition-all ease-in-out duration-300 text-theme-light"
          strokeLinejoin="round"
          strokeLinecap="round"
          strokeDashoffset="100%"
          strokeDasharray="100%"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        />
      </svg>
      {headings.map((heading) => (
        <a
          key={heading.slug}
          href={`#${heading.slug}`}
          className={clsx(
            `block ml-0 transition-all ease-in-out duration-300 text-sm my-2 hover:text-zinc-800 dark:hover:text-zinc-200`,
            heading.depth === 2 && 'ml-2',
            heading.depth === 3 && 'ml-5',
            heading.depth > 3 && 'ml-8',
            visibles.some((id) => id === heading.slug) &&
              'pl-4 text-zinc-800 dark:text-zinc-200'
          )}
          onClick={(e) => {
            e.preventDefault();
            const element = document.getElementById(heading.slug);
            if (!element) return;
            element.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          {heading.text}
        </a>
      ))}
    </section>
  );
};
