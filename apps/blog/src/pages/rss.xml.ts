import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';
import { siteConfig } from '../configs/site';
import { getBlogCollection } from '@/utils/collection';
export const GET: APIRoute = async () => {
  const blog = await getBlogCollection();
  return rss({
    title: siteConfig.title,
    description: siteConfig.description,
    site: siteConfig.site,
    trailingSlash: false,
    items: blog.map((item) => ({
      title: item.data.title,
      description: item.data.description,
      pubDate: item.data.created_at,
      categories: item.data.categories,
      link: `/posts/${item.data.slug}`,
    })),
  });
};
