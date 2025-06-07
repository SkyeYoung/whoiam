import { MarkdownAsync } from 'react-markdown';

import { rehypePlugins, remarkPlugins, shikiConfig } from '@/configs/md';
import remarkGfm from 'remark-gfm';
import rehypeShiki from '@shikijs/rehype';
import Image from '@/components/md/Image';

const Content = async (props: { data: string }) => {
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
      components={{
        img: (props) => <Image {...props} />,
      }}
    />
  );
};

export default Content;
