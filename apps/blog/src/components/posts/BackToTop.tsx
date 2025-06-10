import RiArrowUpLine from '~icons/ri/arrow-up-line';
import { useEffect, useState } from 'react';
import clsx from 'clsx';

export const BackToTop = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }}
      className={clsx(
        'mt-6 rounded-full text-zinc-400 hover:text-zinc-800 duration-300 flex items-center gap-2 transition-all ease-in-out',
        show ? 'opacity-100' : 'opacity-0'
      )}
    >
      <div className="rounded-full p-1 bg-zinc-800/5 hover:bg-zinc-800/10 text-sm">
        <RiArrowUpLine />
      </div>
      <span>回到顶部</span>
    </a>
  );
};
