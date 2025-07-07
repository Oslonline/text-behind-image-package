import { addTextToCanvas, TextSettings } from './textRendering';
import { removeImageBackground } from './backgroundRemoval';

interface TextBehindImageProps {
    image: string | File | Blob;
    textSettings?: TextSettings | TextSettings[];
    format: 'png' | 'jpg' | 'webp';
    outputType?: 'dataUrl' | 'blob' | 'file';
    bgRemovalOptions?: any; // passthrough for future background removal options
}

const defaultTextSettings: TextSettings = {
  font: 'Arial',
  fontSize: 20,
  color: 'black',
  content: '',
  position: { x: 0, y: 0 },
};

async function TextBehindImage(props: TextBehindImageProps): Promise<string | Blob | File> {
  const { image, textSettings = defaultTextSettings, format, outputType = 'dataUrl', bgRemovalOptions } = props;
  let img: HTMLImageElement;
  let src: string;
  if (typeof image === 'string') {
    src = image;
  } else {
    src = URL.createObjectURL(image);
  }
  img = new Image();
  img.crossOrigin = 'anonymous';
  img.src = src;
  await new Promise((resolve) => { img.onload = resolve; });

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas not supported');
  canvas.width = img.width;
  canvas.height = img.height;
  ctx.drawImage(img, 0, 0);

  addTextToCanvas(ctx, textSettings);

  const bgRemovedCanvas = await removeImageBackground(img, bgRemovalOptions);
  ctx.drawImage(bgRemovedCanvas, 0, 0);

  if (outputType === 'blob' || outputType === 'file') {
    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        if (!blob) throw new Error('Failed to create blob');
        if (outputType === 'file') {
          resolve(new File([blob], `text-behind-image.${format}`));
        } else {
          resolve(blob);
        }
      }, `image/${format}`);
    });
  }
  return canvas.toDataURL(`image/${format}`);
}

export { TextBehindImage, TextBehindImageProps };