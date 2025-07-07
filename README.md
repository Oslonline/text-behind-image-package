<div align="center">
  <img width="70%" src="https://i.ibb.co/dcQkddx/GYo-CIJaas-AE5-QV7.jpg" alt="Downloads" />
  <p align="center">
    <a href="https://www.npmjs.com/package/text-behind-image">
      <img src="https://img.shields.io/npm/dm/text-behind-image?label=Downloads&color=blue&style=flat" alt="Downloads" />
    </a>
    <a href="https://www.npmjs.com/package/text-behind-image">
      <img src="https://img.shields.io/npm/v/text-behind-image?label=npm&color=green&style=flat" alt="Version" />
    </a>
  </p>
</div>

# Text-behind-image package

A **framework-agnostic** package to display the text-behind-image effect in any web application or Node.js script. Inspired by the work of [Rexan Wong](https://x.com/rexan_wong) and developed to be easily integrated directly into your projects.

---

## Installation

```bash
npm install text-behind-image
```

---

## Usage

This package provides a single core function, `TextBehindImage`, which takes an image (URL, File, or Blob), advanced text settings (single or multiple layers), and a result image format/output type to apply the text-behind-image effect.

**Framework-agnostic:** Works in any environment that supports the HTML Canvas API (browsers, Electron, Node.js with `canvas`).

### Basic Example

```js
import { TextBehindImage } from "text-behind-image";

const result = await TextBehindImage({
  image: fileOrUrl, // string | File | Blob
  textSettings: [
    {
      font: "Arial",
      fontSize: 48,
      color: "white",
      content: "Sample Text",
      position: { x: 100, y: 100 },
      alignment: "center",
      rotation: 0,
      shadowColor: "#000",
      shadowBlur: 10,
      shadowOffsetX: 0,
      shadowOffsetY: 0,
      strokeColor: "#fff",
      strokeWidth: 2,
      opacity: 0.9,
      letterSpacing: 2,
      lineHeight: 1.5,
    },
    // ...more layers
  ],
  format: "png",
  outputType: "dataUrl", // or 'blob' | 'file'
  bgRemovalOptions: { /* options for background removal */ },
});
```

---

## Usage in Frameworks

### React
```jsx
import React, { useState } from "react";
import { TextBehindImage } from "text-behind-image";

const App = () => {
  const [imageUrl, setImageUrl] = useState("");
  const generateImage = async () => {
    const result = await TextBehindImage({
      image: "https://example.com/image.png",
      textSettings: {
        font: "Arial",
        fontSize: 48,
        color: "white",
        content: "Sample Text",
        position: { x: 100, y: 100 },
      },
      format: "png",
    });
    setImageUrl(result);
  };
  return (
    <div>
      <button onClick={generateImage}>Generate Image</button>
      {imageUrl && <img src={imageUrl} alt="Generated" />}
    </div>
  );
};
```

### Vue 3
```vue
<template>
  <div>
    <button @click="processImage">Generate Image</button>
    <img v-if="imageUrl" :src="imageUrl" alt="Generated" />
  </div>
</template>
<script setup>
import { ref } from 'vue';
import { TextBehindImage } from 'text-behind-image';
const imageUrl = ref('');
async function processImage() {
  const result = await TextBehindImage({
    image: 'https://example.com/image.png',
    textSettings: {
      font: 'Arial',
      fontSize: 48,
      color: 'white',
      content: 'Sample Text',
      position: { x: 100, y: 100 },
    },
    format: 'png',
  });
  imageUrl.value = result;
}
</script>
```

### Svelte
```svelte
<script>
  import { TextBehindImage } from 'text-behind-image';
  let imageUrl = '';
  async function generateImage() {
    const result = await TextBehindImage({
      image: 'https://example.com/image.png',
      textSettings: {
        font: 'Arial',
        fontSize: 48,
        color: 'white',
        content: 'Sample Text',
        position: { x: 100, y: 100 },
      },
      format: 'png',
    });
    imageUrl = result;
  }
</script>
<button on:click={generateImage}>Generate Image</button>
{#if imageUrl}
  <img src={imageUrl} alt="Generated" />
{/if}
```

---

## API Reference

### `TextBehindImage`

Processes an image by applying a text-behind-image effect.

#### Parameters
- `image` (string | File | Blob): The image to process (URL, File, or Blob).
- `textSettings` (object | object[]): Settings for one or more text layers. Each object supports:
  - `font` (string): Font family
  - `fontSize` (number): Font size
  - `color` (string): Text color
  - `content` (string): Text content
  - `position` (object): `{ x: number, y: number }`
  - `alignment` (CanvasTextAlign): Text alignment
  - `rotation` (number): Rotation in degrees
  - `shadowColor`, `shadowBlur`, `shadowOffsetX`, `shadowOffsetY`
  - `strokeColor`, `strokeWidth`
  - `opacity` (number): 0-1
  - `letterSpacing` (number)
  - `lineHeight` (number)
- `format` (string): Output format ('png', 'jpg', 'webp')
- `outputType` (string): 'dataUrl' (default), 'blob', or 'file'
- `bgRemovalOptions` (object): Options for background removal (see @imgly/background-removal)

#### Returns
- A `Promise<string | Blob | File>`: The final image as a Data URL, Blob, or File.

---

## Browser & Node.js Support
- **Browser:** Works in all modern browsers with Canvas support. For background removal, your site must be cross-origin isolated (see [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer)).
- **Node.js:** Works with Node.js v14+ and the [`canvas`](https://www.npmjs.com/package/canvas) package. See system dependencies below.


## Requirements

### Node.js
- **Version:** Node.js v14.0.0 or higher is recommended for compatibility with ES modules and the `canvas` package.

### Additional Libraries
- [`canvas`](https://www.npmjs.com/package/canvas): Used for rendering images and text.
- [`@imgly/background-removal`](https://www.npmjs.com/package/@imgly/background-removal): For background removal functionality.

### System Dependencies
- **Linux:**
  ```bash
  sudo apt-get install build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev
  ```
- **MacOS:**
  ```bash
  brew install pkg-config cairo pango libpng jpeg giflib librsvg
  ```
- **Windows:**
  Install Windows Build Tools and libraries required for canvas. Refer to the canvas [installation guide](https://github.com/Automattic/node-canvas/wiki/Installation:-Windows) for detailed instructions.

---

## Contribute
If you want to contribute to this project, feel free to open an issue or fork this repository & open a pull request. Please:
- **Test** all changes you make to ensure the functionality remains intact.
- **Follow** the existing code style and structure where possible.
- **Document** your changes, including examples when applicable.

We appreciate all contributions that help make this package better!

Again, a big thanks to [Rexan Wong](https://x.com/rexan_wong) for his incredible original work on the [text-behind-image](https://textbehindimage.rexanwong.xyz/) website, which inspired this package.