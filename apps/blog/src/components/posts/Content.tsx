import { MarkdownAsync } from 'react-markdown';

import { rehypePlugins, remarkPlugins, shikiConfig } from '@/configs/md';
import remarkGfm from 'remark-gfm';
import rehypeShiki from '@shikijs/rehype';
import { transformerTwoslash } from '@shikijs/twoslash';

const Content = (props: { data: string }) => {
  return (
    <MarkdownAsync
      remarkPlugins={[...remarkPlugins, remarkGfm]}
      rehypePlugins={[
        ...rehypePlugins,
        [
          rehypeShiki,
          {
            ...shikiConfig,
            inline: 'tailing-curly-colon',
          },
        ],
      ]}
      children={props.data}
    />
  );
};

export default Content;
