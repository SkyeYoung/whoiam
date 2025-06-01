import { siteConfig } from '@/configs/site';
import now from '~build/time';

export const Footer = () => {
  return (
    <footer className="flex justify-between px-[20%] py-2 ring-1 ring-zinc-800/5">
      <div>
        © {now.getFullYear()} {siteConfig.title}. All rights reserved.
      </div>
      <div className="flex gap-4">
        <a href="/sitemap-index.xml">Sitemap</a>
        <a href="/rss.xml">RSS</a>
      </div>
    </footer>
  );
};
