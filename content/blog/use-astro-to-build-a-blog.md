---
title: 使用 Astro 构建博客
slug: use-astro-to-build-a-blog
description: Astro 很好，但还不够好
draft: false
tags:
  - astro
categories: []
created_at: 2025-05-31T16:51:28.232Z
updated_at: 2025-06-10T14:27:26.230Z
fmContentType: blog
---

## 缺陷

### Markdown

Astro 自带的 `markdown` 并不像 `react-markdown` 一样支持 `components` 参数。这让 Astro 很难用，最终使我不得不使用 `react-markdown` 来作为 `*.md` 文件的渲染器。

```astro
---
const { headings, Content: MDXContent } = await render(post);
const isMDX = post.filePath?.endsWith('mdx');
---
<div>
{isMDX ? <MDXContent /> : <Content data={post.body ?? ''} />}
</div>
```
