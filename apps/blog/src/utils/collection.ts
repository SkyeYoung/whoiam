import { getCollection } from 'astro:content';
import type { BlogSchema } from '../content.config';

type BlogCollection = { data: BlogSchema };

// Sort by created_at desc
const sortByCreatedAt = (a: BlogCollection, b: BlogCollection) => {
  return b.data.created_at.getTime() - a.data.created_at.getTime();
};

type GetBlogCollectionOpt = Partial<
  Pick<BlogCollection['data'], 'categories' | 'tags' | 'draft'>
>;
export const getBlogCollection = async (
  opt: GetBlogCollectionOpt = { draft: false }
) => {
  const posts = await getCollection('blog', ({ data }) => {
    let hasThis = true;
    if (opt.draft !== undefined) {
      hasThis = opt.draft === data.draft;
    }
    if (opt.categories?.length) {
      hasThis = opt.categories.some((c) => data.categories.includes(c));
    }
    if (opt.tags?.length) {
      hasThis = opt.tags.some((t) => data.tags.includes(t));
    }
    return hasThis;
  });
  return posts.toSorted(sortByCreatedAt);
};

const getBlogInfoCount = async (
  opt: Extract<keyof BlogCollection['data'], 'tags' | 'categories'>
) => {
  const posts = await getBlogCollection();
  const map = new Map<string, number>();
  for (const post of posts) {
    for (const tag of post.data[opt]) {
      map.set(tag, (map.get(tag) || 0) + 1);
    }
  }
  return map;
};

export const getBlogTagsCount = () => getBlogInfoCount('tags');
export const getBlogCategoriesCount = () => getBlogInfoCount('categories');
