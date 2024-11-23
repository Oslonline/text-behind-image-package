import { removeBackground } from '@imgly/background-removal';

export async function removeImageBackground(image: HTMLImageElement): Promise<HTMLCanvasElement> {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Canvas not supported');

    canvas.width = image.width;
    canvas.height = image.height;
    ctx.drawImage(image, 0, 0);

    const blob = await fetch(image.src).then(r => {
        if (!r.ok) throw new Error('Failed to fetch image');
        return r.blob();
    });

    const maskBlob = await removeBackground(blob);
    const maskImage = await createImageBitmap(maskBlob);
    ctx.globalCompositeOperation = 'destination-in'; // This line is necessary to mask the image
    ctx.drawImage(maskImage, 0, 0);

    return canvas;
}
