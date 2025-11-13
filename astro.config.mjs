// @ts-check
import { defineConfig } from 'astro/config'

// https://astro.build/config
export default defineConfig({
   compressHTML: false,
   build: {
      assets: 'assets',
      inlineStylesheets: 'never',
      format: 'file',
      assetsPrefix: './',
   },
   vite: {
      build: {
         assetsInlineLimit: 0,
         rollupOptions: {
            output: {
               assetFileNames: assetInfo => {
                  if (assetInfo && assetInfo.name && assetInfo.name.endsWith('.css')) {
                     return 'styles/[name][extname]'
                  }
                  return 'assets/[name][extname]'
               },
            },
         },
      },
   },
})
