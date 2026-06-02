// stylelint.config.mjs
export default {
   extends: ['stylelint-config-standard-scss'],
   plugins: ['stylelint-order'],
   rules: {
      // Порядок властивостей
      'order/properties-order': [
         [
            // Позиціонування
            'position',
            'top',
            'right',
            'bottom',
            'left',
            'z-index',
            // Відображення
            'display',
            'flex',
            'flex-direction',
            'flex-wrap',
            'flex-grow',
            'flex-shrink',
            'flex-basis',
            'justify-content',
            'align-items',
            'align-self',
            'gap',
            'grid',
            'grid-template-columns',
            'grid-template-rows',
            // Box model
            'width',
            'min-width',
            'max-width',
            'height',
            'min-height',
            'max-height',
            'margin',
            'margin-top',
            'margin-right',
            'margin-bottom',
            'margin-left',
            'padding',
            'padding-top',
            'padding-right',
            'padding-bottom',
            'padding-left',
            'border',
            'border-radius',
            'overflow',
            // Візуальне
            'background',
            'background-color',
            'background-image',
            'color',
            'opacity',
            'box-shadow',
            // Типографіка
            'font',
            'font-family',
            'font-size',
            'font-weight',
            'line-height',
            'letter-spacing',
            'text-align',
            'text-decoration',
            'text-transform',
            // Анімація
            'transition',
            'animation',
            'transform',
            // Інше
            'cursor',
            'pointer-events',
            'user-select',
         ],
         { unspecified: 'bottom' }, // невідомі властивості в кінець
      ],

      // Актуальні правила логіки
      'scss/at-rule-no-unknown': true,
      'selector-class-pattern': null,
      'custom-property-pattern': null,
   },
   ignoreFiles: ['**/*.astro'], // Astro компоненти ігноруємо
}
