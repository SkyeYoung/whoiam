import { getLocalImage, getLocalPlaceholder } from '@/utils/image';
import { inferRemoteSize } from 'astro:assets';
import { omit } from 'lodash-es';
import { join } from 'path';
import RiEarthLine from '~icons/ri/earth-line';
import clsx from 'clsx';
import { fileExists } from '@/utils/common';

type BasicImageProps = React.ImgHTMLAttributes<HTMLImageElement>;

const BasicImage = (props: BasicImageProps) => {
  return (
    <figure>
      <img
        className="cursor-zoom-in rounded border-solid border-gray-300 border-1 object-cover lightbox-image"
        {...omit(props, 'node', 'inputtedwidth')}
      />
      <figcaption className="text-sm text-gray-500 mt-2">
        <span className="select-none">— </span>
        {props.alt}
      </figcaption>
    </figure>
  );
};

const LocalImage = async (props: BasicImageProps) => {
  const img = await getLocalImage(props.src!);
  const placeholder = await getLocalPlaceholder(props.src!);
  return <BasicImage {...props} {...img.attrs} style={placeholder.style} />;
};

const RemoteImage = async (props: BasicImageProps) => {
  const size = await inferRemoteSize(props.src!);
  return <BasicImage {...props} {...size} loading="lazy" decoding="async" />;
};

const FaviconImage = async (props: BasicImageProps) => {
  const src = props.src!;

  const filePath = join('./public', src);
  if (await fileExists(filePath)) {
    return <img {...props} />;
  }
  return (
    <RiEarthLine className={clsx(props.className, 'text-zinc-500 text-base')} />
  );
};

const Image = (props: BasicImageProps) => {
  const src = props.src!;
  if (src.startsWith('/favicons')) {
    return <FaviconImage {...props} />;
  }
  if (src.startsWith('.') || src.startsWith('/')) {
    return <LocalImage {...props} />;
  }
  return <RemoteImage {...props} />;
};

export default Image;
