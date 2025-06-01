import { siteConfig } from '@/configs/site';
import now from '~build/time';

export const Footer = () => {
  return (
    <footer className="mt-10 w-full py-2 ring-1 ring-zinc-800/5">
      <div className="max-w-3xl 2xl:max-w-4xl mx-auto flex justify-between">
        <div>
          © {now.getFullYear()} {siteConfig.title}. All rights reserved.
        </div>
        <div className="flex gap-4">
          <a href="/sitemap-index.xml">Sitemap</a>
          <a href="/rss.xml">RSS</a>
        </div>
      </div>
    </footer>
  );
};
