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

// /@fs/Users/xxxx/Dev/Projects/iam/content/friends/assets/xxxx.png?origWidth=384&origHeight=384&origFormat=png
// => /Users/xxxx/Dev/Projects/iam/content/friends/assets/xxxx.png
function extractFsPath(viteUrl: string) {
  const match = viteUrl.match(/^\/@fs(\/[^?]+)/);
  return match ? match[1] : null;
}

const getPlaceholderImage = async (src: string, isFs = false) => {
  const realSrc = isFs ? extractFsPath(src) : resolve(__PROJECT__.dir, `./${getLocalImageKey(src)}`);
  if (!realSrc) {
    throw new Error('Invalid image fs path');
  }
  return await lqip(realSrc);
};

export const getLocalPlaceholder = async (src: string, isFs = false) => {
  const result = await getPlaceholderImage(src, isFs);
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
  const rawSrc = imgResult.rawOptions.src;
  return {
    ...imgResult.options,
    ...imgResult.attributes,
    srcSet: imgResult.srcSet.attribute,
    src: imgResult.src.toString(),
    'data-raw-src': typeof rawSrc === 'string' ? rawSrc : rawSrc.src,
  };
};

export const getLocalImage = async (src: string) => {
  const imageKey = getLocalImageKey(src);
  const imgMeta = await getLocalImageMetadata(imageKey);
  const img = await getImage({ src: imgMeta, quality: 60 });

  return {
    attrs: toImgAttrs(img),
    src: img.src.toString(),
  };
};
