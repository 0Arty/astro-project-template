import js from '@eslint/js'
import astro from 'eslint-plugin-astro'
import tsParser from '@typescript-eslint/parser'

export default [
   js.configs.recommended,
   ...astro.configs.recommended,

   // Ігноруємо автогенероване
   {
      ignores: ['dist/**', 'node_modules/**', '.astro/**'],
   },

   // Node.js файли (конфіги, скрипти)
   {
      files: ['astro.config.mjs', 'scripts/**/*.js', 'eslint.config.js'],
      languageOptions: {
         globals: {
            process: 'readonly',
            console: 'readonly',
            __dirname: 'readonly',
         },
      },
   },

   // Браузерні скрипти
   {
      files: ['public/js/**/*.js'],
      languageOptions: {
         globals: {
            window: 'readonly',
            document: 'readonly',
            navigator: 'readonly',
            fetch: 'readonly',
            setTimeout: 'readonly',
            clearTimeout: 'readonly',
            requestAnimationFrame: 'readonly',
            cancelAnimationFrame: 'readonly',
            ResizeObserver: 'readonly',
            event: 'readonly',
            $: 'readonly',
            gsap: 'readonly',
            DrawSVGPlugin: 'readonly',
            ScrollTrigger: 'readonly',
            ScrollToPlugin: 'readonly',
            SplitText: 'readonly',
            console: 'readonly',
         },
      },
      rules: {
         'no-unused-vars': 'warn',
         'no-undef': 'warn',
         'no-console': 'warn',
         eqeqeq: ['error', 'always'],
         'no-var': 'error',
         'prefer-const': 'warn',
      },
   },

   // Astro з TypeScript
   {
      files: ['**/*.astro'],
      languageOptions: {
         parserOptions: {
            parser: tsParser,
         },
      },
   },
]
