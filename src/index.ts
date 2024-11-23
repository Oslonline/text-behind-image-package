import { addTextToCanvas, TextSettings } from './textRendering';
import { removeImageBackground } from './backgroundRemoval';

interface TextBehindImageProps {
    imageUrl: string;
    textSettings?: TextSettings;
    format: 'png' | 'jpg' | 'webp';
}

const defaultTextSettings: TextSettings = {
  font: 'Arial',
  fontSize: 20,
  color: 'black',
  content: '',
  position: { x: 0, y: 0 },
};

async function TextBehindImage(props: TextBehindImageProps): Promise<string> {
  const { imageUrl, textSettings = defaultTextSettings, format } = props;
  const image = new Image();
  image.crossOrigin = 'same-origin';
  image.src = imageUrl;

  await new Promise((resolve) => {
    image.onload = resolve;
  });

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas not supported');

  canvas.width = image.width;
  canvas.height = image.height;
  ctx.drawImage(image, 0, 0);

  addTextToCanvas(ctx, textSettings);

  const bgRemovedCanvas = await removeImageBackground(image);
  ctx.drawImage(bgRemovedCanvas, 0, 0);

  return canvas.toDataURL(`image/${format}`);
}

export { TextBehindImage, TextBehindImageProps };