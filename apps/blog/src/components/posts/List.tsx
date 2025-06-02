import type { BlogSchema } from '@/content.config';
import type { PropsWithChildren } from 'react';
import dayjs from 'dayjs';
import MaterialSymbolsLightTag from '~icons/material-symbols-light/tag';
type Props = {
  post: BlogSchema;
};

export const ItemDate = ({ post }: Props) => {
  return (
    <div
      className="text-xs text-zinc-600"
      style={{ viewTransitionName: `${post.slug}-date` }}
    >
      {dayjs(post.created_at).format('YYYY 年 MM 月 DD 日')}
      {dayjs(post.updated_at).isAfter(post.created_at, 'day') && (
        <span> (已编辑)</span>
      )}
    </div>
  );
};

export const ItemTags = ({ post }: Props) => {
  return (
    <div
      className="tags flex gap-1"
      style={{ viewTransitionName: `${post.slug}-tags` }}
    >
      {post.tags.map((tag, idx) => (
        <div className="flex" key={tag}>
          <MaterialSymbolsLightTag className="-mr-0.5" />
          {tag}
        </div>
      ))}
    </div>
  );
};

const ItemFooter = ({ post }: Props) => {
  return (
    <div className="flex justify-between text-sm">
      <div />
      <ItemTags post={post} />
    </div>
  );
};

export const ListItem = ({ post }: Props) => {
  return (
    <li>
      <a
        className="min-w-xl flex flex-col rounded-2xl px-4 py-3 border-dashed border-zinc-800/5 border-1"
        href={`/posts/${post.slug}`}
      >
        <ItemDate post={post} />
        <h2
          className="font-bold"
          style={{
            viewTransitionName: `${post.slug}-title`,
          }}
        >
          {post.title}
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
      </a>
    </li>
  );
};

export const List = (props: PropsWithChildren) => {
  return <ul className="flex flex-col gap-4">{props.children}</ul>;
};
