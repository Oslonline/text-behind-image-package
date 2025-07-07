export interface TextSettings {
  font: string;
  fontSize: number;
  color: string;
  content: string;
  position: { x: number; y: number };
  alignment?: CanvasTextAlign;
  rotation?: number; // in degrees
  shadowColor?: string;
  shadowBlur?: number;
  shadowOffsetX?: number;
  shadowOffsetY?: number;
  strokeColor?: string;
  strokeWidth?: number;
  opacity?: number;
  letterSpacing?: number;
  lineHeight?: number;
}

export function addTextToCanvas(ctx: CanvasRenderingContext2D, textSettings: TextSettings | TextSettings[]) {
  const layers = Array.isArray(textSettings) ? textSettings : [textSettings];
  for (const settings of layers) {
    const {
      font, fontSize, color, content, position,
      alignment = 'start', rotation = 0,
      shadowColor, shadowBlur, shadowOffsetX, shadowOffsetY,
      strokeColor, strokeWidth,
      opacity = 1,
      letterSpacing = 0,
      lineHeight = 1.2,
    } = settings;
    ctx.save();
    ctx.font = `${fontSize}px ${font}`;
    ctx.textAlign = alignment;
    ctx.globalAlpha = opacity;
    if (shadowColor) ctx.shadowColor = shadowColor;
    if (shadowBlur) ctx.shadowBlur = shadowBlur;
    if (shadowOffsetX) ctx.shadowOffsetX = shadowOffsetX;
    if (shadowOffsetY) ctx.shadowOffsetY = shadowOffsetY;
    ctx.translate(position.x, position.y);
    if (rotation) ctx.rotate((rotation * Math.PI) / 180);
    // Letter spacing and line height
    const lines = content.split('\n');
    for (let i = 0; i < lines.length; i++) {
      let x = 0, y = i * fontSize * lineHeight;
      if (letterSpacing) {
        let currentX = x;
        for (const char of lines[i]) {
          ctx.fillStyle = color;
          ctx.fillText(char, currentX, y);
          if (strokeColor && strokeWidth) {
            ctx.lineWidth = strokeWidth;
            ctx.strokeStyle = strokeColor;
            ctx.strokeText(char, currentX, y);
          }
          currentX += ctx.measureText(char).width + letterSpacing;
        }
      } else {
        ctx.fillStyle = color;
        ctx.fillText(lines[i], x, y);
        if (strokeColor && strokeWidth) {
          ctx.lineWidth = strokeWidth;
          ctx.strokeStyle = strokeColor;
          ctx.strokeText(lines[i], x, y);
        }
      }
    }
    ctx.restore();
  }
}
