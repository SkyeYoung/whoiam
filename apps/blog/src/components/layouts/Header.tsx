import { siteConfig } from '@/configs/site';

export const Header = () => {
  return (
    <header className="nav sticky top-0 z-50 px-4 py-4 flex">
      <div className="px-6 text-xl rounded-2xl shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur-md">
        <div className=" logo left-0 uppercase">
          <a href="/">{siteConfig.title}</a>
        </div>
      </div>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-6 px-6 text-xl rounded-2xl shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur-md">
        <a href="/">Home</a>
        <a href="/tags">Tags</a>
        <a href="/friends">Friends</a>
        <a href="/about">About</a>
      </div>
    </header>
  );
};
