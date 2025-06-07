import React, { useEffect, useState } from 'react';
import Lightbox, { type SlideImage } from 'yet-another-react-lightbox';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';

type ImageData = Omit<SlideImage, 'type'>;

export const ImageLightboxViewer: React.FC = () => {
  const [images, setImages] = useState<ImageData[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [curIdx, setCurIdx] = useState(0);

  useEffect(() => {
    const clickHandlers = new Map<HTMLImageElement, () => void>();

    const collectImages = () => {
      const imageElements =
        document.querySelectorAll<HTMLImageElement>('.lightbox-image');
      const imageData: ImageData[] = [];

      imageElements.forEach((img, index) => {
        imageData.push({
          src: img.getAttribute('data-raw-src') || img.src,
          alt: img.alt,
          imageFit: 'contain',
          // if width and height are not set, the image will be scaled to fit the container
        });

        const handleClick = () => {
          setCurIdx(index);
          setIsOpen(true);
        };

        img.addEventListener('click', handleClick);
        clickHandlers.set(img, handleClick);
      });

      setImages(imageData);
    };

    collectImages();

    return () => {
      clickHandlers.forEach((handler, img) => {
        img.removeEventListener('click', handler);
      });
    };
  }, []);

  const handleView = ({ index }: { index: number }) => {
    setCurIdx(index);
  };

  return (
    <Lightbox
      open={isOpen}
      close={() => setIsOpen(false)}
      index={curIdx}
      slides={images}
      plugins={[Thumbnails, Zoom]}
      animation={{
        zoom: 500,
      }}
      on={{
        view: handleView,
      }}
      zoom={{
        scrollToZoom: true,
      }}
      thumbnails={{
        height: 50,
        vignette: false,
      }}
      styles={{
        container: {
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
        },
        thumbnailsContainer: {
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
        },
      }}
    />
  );
};
