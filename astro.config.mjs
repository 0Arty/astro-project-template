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
                  if (assetInfo.names && assetInfo.names.length > 0) {
                     for (const name of assetInfo.names) {
                        if (name.endsWith('.css')) {
                           console.log('this is css:', name)
                           return 'styles/[name][extname]'
                        }
                        return 'assets/[name][extname]'
                     }
                  }

                  return 'assets/[name][extname]'
               },
            },
         },
      },
   },
})
