import type { CollectionEntry } from 'astro:content';
type Props = {
  prevPost: CollectionEntry<'blog'>;
  nextPost: CollectionEntry<'blog'>;
};
export const PostPagination = ({ prevPost, nextPost }: Props) => {
  return (
    <nav>
      <ul>
        <li>
          {prevPost && <a href={`/posts/${prevPost.data.slug}`}>上一篇</a>}
        </li>
        <li>
          {nextPost && <a href={`/posts/${nextPost.data.slug}`}>下一篇</a>}
        </li>
      </ul>
    </nav>
  );
};
