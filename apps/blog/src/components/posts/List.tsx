import type { BlogSchema } from '@/content.config';
import type { PropsWithChildren } from 'react';
import React, { useRef } from 'react';
import dayjs from 'dayjs';

type Props = {
  post: BlogSchema;
};

export const ItemDate = ({ post }: Props) => {
  return (
    <div
      className="text-xs text-zinc-600 pl-0.5"
      style={{ viewTransitionName: `${post.slug}-date` }}
    >
      {dayjs(post.created_at).format('YYYY 年 MM 月 DD 日')}
    </div>
  );
};

export const ItemTags = ({ post }: Props) => {
  return (
    <div
      className="tags flex gap-2 text-sm"
      style={{ viewTransitionName: `${post.slug}-tags` }}
    >
      {post.tags.map((tag) => (
        <a
          key={tag}
          href={`/tags/${tag}`}
          className="px-2 py-1 text-xs text-zinc-600 bg-zinc-100 rounded-md hover:bg-zinc-200 transition-colors duration-200 no-underline"
        >
          {tag}
        </a>
      ))}
    </div>
  );
};

const ItemFooter = ({ post }: Props) => {
  return (
    <div className="flex justify-between items-center text-sm mt-3">
      <ItemDate post={post} />
      <ItemTags post={post} />
    </div>
  );
};

export const ListItem = ({ post }: Props) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const handleItemClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.tagName === 'A' || target.closest('a')) {
      return;
    }
    e.preventDefault();
    ref.current?.click();
  };

  return (
    <li>
      <div
        className="min-w-xl flex flex-col rounded-2xl px-4 pt-3 pb-2 border-dashed border-zinc-800/5 border-1 hover:bg-zinc-50 transition-colors duration-200 cursor-pointer"
        onClick={handleItemClick}
      >
        <h2
          className="font-bold"
          style={{
            viewTransitionName: `${post.slug}-title`,
          }}
        >
          <a
            ref={ref}
            href={`/posts/${post.slug}`}
            className="hover:text-violet-800 transition-colors duration-200 no-underline"
          >
            {post.title}
          </a>
        </h2>
        {post.description.length >= 200 && (
          <div
            className="font-light text-zinc-500 break-all leading-loose line-clamp-3"
            style={{
              viewTransitionName: `${post.slug}-description`,
            }}
          >
            {post.description}
          </div>
        )}
        <ItemFooter post={post} />
      </div>
    </li>
  );
};

export const List = (props: PropsWithChildren) => {
  return <ul className="flex flex-col gap-4">{props.children}</ul>;
};
