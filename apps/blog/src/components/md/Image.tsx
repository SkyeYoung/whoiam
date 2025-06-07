import { getLocalImage, getLocalPlaceholder } from '@/utils/image';
import { inferRemoteSize } from 'astro:assets';
import { omit } from 'lodash-es';

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

const Image = (props: BasicImageProps) => {
  const isLocal = props.src!.startsWith('.');
  if (isLocal) {
    return <LocalImage {...props} />;
  }
  return <RemoteImage {...props} />;
};

export default Image;
