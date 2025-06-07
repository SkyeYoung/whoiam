import { getLocalImage, getLocalPlaceholder } from '@/utils/image';
import { inferRemoteSize } from 'astro:assets';
import { omit } from 'lodash-es';

type BasicImageProps = React.ImgHTMLAttributes<HTMLImageElement>;
const LocalImage = async (props: BasicImageProps) => {
  const img = await getLocalImage(props.src!);
  const placeholder = await getLocalPlaceholder(props.src!);

  return (
    <img {...omit(props, 'node')} {...img.attrs} style={placeholder.style} />
  );
};

const RemoteImage = async (props: BasicImageProps) => {
  const size = await inferRemoteSize(props.src!);
  return (
    <img {...omit(props, 'node')} {...size} loading="lazy" decoding="async" />
  );
};

const Image = (props: BasicImageProps) => {
  const isLocal = props.src!.startsWith('.');
  if (isLocal) {
    return <LocalImage {...props} />;
  }
  return <RemoteImage {...props} />;
};

export default Image;
