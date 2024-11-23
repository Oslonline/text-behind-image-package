interface TextSettings {
  font: string;
  fontSize: number;
  color: string;
  orientation: 'horizontal' | 'vertical';
  content: string;
  position: { x: number; y: number };
}

function addTextToCanvas(ctx: CanvasRenderingContext2D, textSettings: TextSettings) {
  ctx.font = `${textSettings.fontSize}px ${textSettings.font}`;
  ctx.fillStyle = textSettings.color;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  const { x, y } = textSettings.position;
  ctx.save();
  if (textSettings.orientation === 'vertical') {
    ctx.rotate(-Math.PI / 2);
    ctx.fillText(textSettings.content, -y, x);
  } else {
    ctx.fillText(textSettings.content, x, y);
  }
  ctx.restore();
}

export { addTextToCanvas, TextSettings };