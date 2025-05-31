import type { BlogSchema } from '../content.config';

type BlogCollection = { data: BlogSchema };

// Sort by created_at desc
export const sortByCreatedAt = (a: BlogCollection, b: BlogCollection) => {
  return b.data.created_at.getTime() - a.data.created_at.getTime();
};
