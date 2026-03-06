import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'; // for SVG Sprite
import path from 'path';
import { logoWorksDir } from './pearlpuppy-config';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr(),
    createSvgIconsPlugin({
      // directories where the SVGs stored
      iconDirs: [path.resolve(process.cwd(), logoWorksDir(0))],
      // style of id called from <use>
      symbolId: 'logo-[dir]-[name]', // [dir] for subdirectory
    }),
  ],
});
