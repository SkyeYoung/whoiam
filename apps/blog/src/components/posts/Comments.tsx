import Giscus from '@giscus/react';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';

export const Comments = () => {
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const giscusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    setTheme(isDark ? 'dark' : 'light');

    const observer = new MutationObserver(() => {
      const isDark = document.documentElement.classList.contains('dark');
      setTheme(isDark ? 'dark' : 'light');
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const giscus = giscusRef.current;
    if (!giscus) return;
    const observer = new MutationObserver(() => {
      const content = giscus.children[0]?.shadowRoot;
      if (!!content) {
        setTimeout(() => setLoading(false), 1500);
        observer.disconnect();
      }
    });
    observer.observe(giscus, {
      childList: true,
      subtree: true,
    });

    return () => observer.disconnect();
  }, [theme]);

  return (
    <section className="relative min-h-80">
      <div
        className={clsx(
          'absolute top-0 left-0 z-10 backdrop-blur-xl rounded-md w-full h-full bg-zinc-800/5 flex items-center justify-center text-zinc-600 transition-all duration-300 ease-in-out',
          loading ? 'opacity-100' : 'opacity-0 h-0'
        )}
      >
        Loading comments...
      </div>
      <div id="comments" ref={giscusRef}>
        <Giscus
          repo="SkyeYoung/SkyeYoung"
          repoId="R_kgDOG-k4ew"
          category="blog"
          categoryId="DIC_kwDOG-k4e84Cq5ge"
          mapping="url"
          reactionsEnabled="1"
          emitMetadata="1"
          theme={theme}
          lang="en"
        />
      </div>
    </section>
  );
};
