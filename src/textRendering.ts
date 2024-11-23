export interface TextSettings {
  font: string;
  fontSize: number;
  color: string;
  content: string;
  position: { x: number; y: number };
}

export function addTextToCanvas(ctx: CanvasRenderingContext2D, textSettings: TextSettings) {
    const { font, fontSize, color, content, position } = textSettings;
    ctx.font = `${fontSize}px ${font}`;
    ctx.fillStyle = color;
    ctx.fillText(content, position.x, position.y);
}
