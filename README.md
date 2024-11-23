# Text-behind-image npm package

A framework-agnostic package to display the **text-behind-image** effect in any web application.  
Inspired by the work of [Rexan Wong](https://x.com/rexan_wong) and developed to be easily integrated directly into your projects.

## Installation

You can install the package using npm:

```bash
npm install text-behind-image
```

## Usage

This package provides a single core function, `TextBehindImage`, which takes an image URL, text settings, and a result image format to apply the text-behind-image effect. You can use it with React, Vue, Svelte or almost any other modern frameworks.

#### 1. Usage with React example

```javascript
import React, { useState } from "react";
import { TextBehindImage } from "text-behind-image";

const App = () => {
  const [imageUrl, setImageUrl] = useState("");

  const generateImage = async () => {
    try {
      const result = await TextBehindImage({
        imageUrl: "https://example.com/image.png",
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
    } catch (error) {
      console.error("Error generating image:", error);
    }
  };

  return (
    <div>
      <button onClick={generateImage}>Generate Image</button>
      {imageUrl && <img src={imageUrl} alt="Generated" />}
    </div>
  );
};

export default App;
```

<br>

#### 2. Usage with Vue 3

```javascript
<template>
  <div>
    <button @click="processImage">Generate Image</button>
    <img v-if="imageUrl" :src="imageUrl" alt="Generated" />
  </div>
</template>

<script>
import { TextBehindImage } from "text-behind-image";

export default {
  data() {
    return {
      imageUrl: "",
    };
  },
  methods: {
    async processImage() {
      try {
        const result = await TextBehindImage({
          imageUrl: "https://example.com/image.png",
          textSettings: {
            font: "Arial",
            fontSize: 48,
            color: "white",
            content: "Sample Text",
            position: { x: 100, y: 100 },
          },
          format: "png",
        });
        this.imageUrl = result;
      } catch (error) {
        console.error("Error generating image:", error);
      }
    },
  },
};
</script>
```

#### 3. Usage with Svelte

```javascript
<script>
  import { TextBehindImage } from 'text-behind-image';
  let imageUrl = '';

  async function generateImage() {
    try {
      const result = await TextBehindImage({
        imageUrl: 'https://example.com/image.png',
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
    } catch (error) {
      console.error('Error generating image:', error);
    }
  }
</script>

<button on:click={generateImage}>Generate Image</button>
{#if imageUrl}
  <img src={imageUrl} alt="Generated" />
{/if}
```

<br>

## Props Reference

### `TextBehindImage`

Processes an image by applying a text-behind-image effect.

#### **Parameters**

- `imageUrl` (string): The URL of the image to process.
- `textSettings` (object, optional): Settings for the text to be applied. Defaults are provided for each property.
  - `font` (string, optional): The font family of the text. Default is 'Arial'.
  - `fontSize` (number, optional): The size of the text font. Default is 20.
  - `color` (string, optional): The color of the text. Default is 'black'.
  - `content` (string, optional): The text content to display. Default is an empty string.
  - `position` (object, optional): The position of the text on the image. Default is { x: 0, y: 0 }.
    - `x` (number, optional): The x-coordinate for the text position.
    - `y` (number, optional): The y-coordinate for the text position.
- `format` (string): The format of the resulting image (e.g., 'png', 'jpg', 'webp').

#### **Returns**

- A `Promise<string>`: A Data URL of the final image with the text-behind effect applied.

## Requirements

To use `text-behind-image`, ensure your environment meets the following requirements:

### Node.js

- **Version**: Node.js v14.0.0 or higher is recommended for compatibility with ES modules and the `canvas` package.

### Additional Libraries

The package has the following dependencies:

- [`canvas`](https://www.npmjs.com/package/canvas): Used for rendering images and text.
- [`@imgly/background-removal`](https://www.npmjs.com/package/@imgly/background-removal): For background removal functionality.

### System Dependencies

The `canvas` package may require additional system-level libraries to be installed, if needed install them with:

- **Linux**: Install the following libraries:
  ```bash
  sudo apt-get install build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev
  ```
- **MacOS**: Install the following libraries:
  ```bash
  brew install pkg-config cairo pango libpng jpeg giflib librsvg
  ```
- **Windows**: Install the following libraries:
  Install Windows Build Tools and libraries required for canvas. Refer to the canvas [installation guide](https://github.com/Automattic/node-canvas/wiki/Installation:-Windows) for detailed instructions.

## Contribute

If you want to contribute to this project, feel free to open an issue or fork this repository & open a pull request.  
While there are no strict contributing guidelines at the moment, please ensure the following:

- **Testing**: Test all changes you make to ensure the functionality remains intact.  
- **Code Style**: Follow the existing code style and structure where possible.  
- **Documentation**: Provide detailed explanations of your changes, including examples when applicable.

We appreciate all contributions that help make this package better!

Again, a big thanks to [Rexan Wong](https://x.com/rexan_wong) for his incredible original work on the [text-behind-image](https://textbehindimage.rexanwong.xyz/) website, which inspired this package.
