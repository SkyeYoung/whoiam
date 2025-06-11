import lqip from 'lqip-modern';

const getPlaceholderImage = async (src: string) => {
  const realSrc = src.replace('./', './src/content/blog/');
  return await lqip(realSrc);
};

function styleObjectToString(style: Record<string, string>) {
  return Object.entries(style)
    .map(([k, v]) => `${k}: ${v};`)
    .join(' ');
}

export const getLocalPlaceholder = async (src: string) => {
  const result = await getPlaceholderImage(src);
  const dataURIBase64 = result.metadata.dataURIBase64;
  return {
    dataURIBase64,
    style: styleObjectToString({
      'background-image': `url(${dataURIBase64})`,
      'background-size': 'cover',
      'background-repeat': 'no-repeat',
    }),
  };
};
