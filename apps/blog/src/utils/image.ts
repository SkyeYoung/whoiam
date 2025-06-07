import type { GetImageResult } from 'astro';
import { getImage } from 'astro:assets';
import { omit } from 'lodash-es';
import lqip from 'lqip-modern';
import { resolve } from 'node:path';

const images = import.meta.glob<{ default: ImageMetadata }>(
  'src/content/**/*.{png,jpg,jpeg,webp,svg}'
);
const imageKeys = Object.keys(images);

const getLocalImageKey = (src: string) => {
  return imageKeys.find((key) => key.includes(src.slice(1)))!;
};

const getLocalImageMetadata = async (imageKey: string) => {
  return (await images[imageKey]()).default;
};

const getPlaceholderImage = async (src: string) => {
  const srcKey = getLocalImageKey(src);
  const realSrc = resolve(__PROJECT__.dir, `./${srcKey}`);
  return await lqip(realSrc);
};

export const getLocalPlaceholder = async (src: string) => {
  const result = await getPlaceholderImage(src);
  const dataURIBase64 = result.metadata.dataURIBase64;
  return {
    dataURIBase64,
    style: {
      backgroundImage: `url(${dataURIBase64})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
    },
  };
};

export const toImgAttrs = (imgResult: GetImageResult) => {
  const attrs = {
    ...imgResult.options,
    ...imgResult.attributes,
    srcSet: imgResult.srcSet.attribute,
    src: imgResult.src.toString(),
  };
  return omit(attrs, 'inputtedwidth');
};

export const getLocalImage = async (src: string) => {
  const imageKey = getLocalImageKey(src);
  const imgMeta = await getLocalImageMetadata(imageKey);
  const img = await getImage({ src: imgMeta });

  return {
    attrs: toImgAttrs(img),
    src: img.src.toString(),
  };
};
