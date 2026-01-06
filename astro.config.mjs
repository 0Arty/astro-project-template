// @ts-check
import { defineConfig } from 'astro/config'
import path from 'path'

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
                  // Перевіряємо чи є інформація про файл
                  if (!assetInfo.names || assetInfo.names.length === 0) {
                     return 'assets/other/[name][extname]'
                  }

                  // Беремо перше ім'я файлу
                  const fileName = assetInfo.names[0]

                  // CSS файли
                  if (fileName.endsWith('.css')) {
                     return '[name][extname]'
                  }

                  // Шрифти
                  if (/\.(woff|woff2|eot|ttf|otf)$/i.test(fileName)) {
                     return 'assets/fonts/[name][extname]'
                  }

                  // Іконки (SVG)
                  if (fileName.endsWith('.svg')) {
                     return 'assets/icons/[name][extname]'
                  }

                  // Зображення
                  if (/\.(png|jpe?g|gif|webp|avif|bmp|tiff?)$/i.test(fileName)) {
                     return 'assets/images/[name][extname]'
                  }

                  // Відео
                  if (/\.(mp4|webm|ogg|mov|avi|mkv)$/i.test(fileName)) {
                     return 'assets/videos/[name][extname]'
                  }

                  // Аудіо
                  if (/\.(mp3|wav|ogg|flac|aac)$/i.test(fileName)) {
                     return 'assets/audio/[name][extname]'
                  }

                  // Документи
                  if (/\.(pdf|doc|docx|xls|xlsx)$/i.test(fileName)) {
                     return 'assets/documents/[name][extname]'
                  }

                  // Все інше
                  return 'assets/other/[name][extname]'
               },
            },
         },
      },
      resolve: {
         alias: {
            '@components': path.resolve('./src/html/components'),
            '@templates': path.resolve('./src/html/templates'),
            '@ui': path.resolve('./src/html/ui'),
            '@layouts': path.resolve('./src/layouts'),
            '@html': path.resolve('./src/html'),
            '@assets': path.resolve('./src/assets'),
            '@icons': path.resolve('./src/assets/icons'),
            '@images': path.resolve('./src/assets/images'),
            '@configs': path.resolve('./src/configs'),
            '@public': path.resolve('./public'),
            '@public-assets': path.resolve('./public/assets'),
         },
      },
   },
})
