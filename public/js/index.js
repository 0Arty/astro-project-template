let APP = {}
// APP UTILS =======================================================================
APP.utils = {
   debounce: (func, delay) => {
      let timeoutId
      return function (...args) {
         const context = this
         clearTimeout(timeoutId)
         timeoutId = setTimeout(() => {
            func.apply(context, args)
         }, delay)
      }
   },
   throttle: (func, delay) => {
      let lastCall = 0
      return function (...args) {
         const context = this
         const now = Date.now()
         if (now - lastCall >= delay) {
            func.apply(context, args)
            lastCall = now
         }
      }
   },
   onWidthChange: (callback, debounceMs = 150) => {
      let lastWidth = window.innerWidth
      let timeoutId = null

      function handleResize() {
         if (timeoutId) {
            clearTimeout(timeoutId)
         }

         timeoutId = setTimeout(() => {
            const currentWidth = window.innerWidth

            if (currentWidth !== lastWidth) {
               lastWidth = currentWidth
               callback(currentWidth)
            }
         }, debounceMs)
      }

      window.addEventListener('resize', handleResize)

      return () => {
         if (timeoutId) {
            clearTimeout(timeoutId)
         }
         window.removeEventListener('resize', handleResize)
      }
   },
   inputMasks: () => {
      $('input[data-input-type]').each(function () {
         const inputType = $(this).data('input-type')

         switch (inputType) {
            case 'text':
               // Маска для текстового поля (дозволяє тільки літери та пробіли)
               $(this).inputmask({
                  mask: '*{1,50}',
                  definitions: {
                     '*': {
                        validator: '[A-Za-zА-Яа-яЁё\\s]',
                        cardinality: 1,
                     },
                  },
               })
               break

            case 'number':
               // Маска для числового поля (дозволяє тільки цифри)
               $(this).inputmask({
                  mask: '9{1,10}',
                  placeholder: '',
                  clearIncomplete: true,
                  showMaskOnHover: true,
                  showMaskOnFocus: true,
                  showMaskOnBlur: true,
               })
               break

            case 'email':
               // Маска для email
               $(this).inputmask({
                  mask: '*{1,64}@*{1,64}.*{1,10}',
                  greedy: false,
                  definitions: {
                     '*': {
                        validator: "[0-9A-Za-z!#$%&'*+/=?^_`{|}~-]",
                        cardinality: 1,
                     },
                  },
                  clearIncomplete: true,
                  showMaskOnHover: true,
                  showMaskOnFocus: true,
                  showMaskOnBlur: true,
               })
               break
         }
      })
   },
   copyToClipboard: stringToCopy => {
      if (navigator.clipboard && navigator.clipboard.writeText) {
         navigator.clipboard
            .writeText(stringToCopy)
            .then(() => {})
            .catch(err => {
               console.error('Failed to copy with clipboard API', err)
               fallbackCopy(stringToCopy)
            })
      } else {
         fallbackCopy(stringToCopy)
      }

      function fallbackCopy(text) {
         const textarea = document.createElement('textarea')
         textarea.value = text
         textarea.style.position = 'fixed' // avoid scrolling to bottom
         textarea.style.opacity = '0'
         document.body.appendChild(textarea)
         textarea.focus()
         textarea.select()

         try {
            const successful = document.execCommand('copy')
            if (successful) {
               console.log('Link copied using fallback method!')
            } else {
               console.warn('Fallback copy failed')
            }
         } catch (err) {
            console.error('Fallback copy error', err)
         }
         document.body.removeChild(textarea)
      }
   },
   scrollToAnchor: () => {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
         anchor.addEventListener('click', function (e) {
            e.preventDefault()
            const target = this.getAttribute('href')

            gsap.to(window, {
               duration: 1,
               scrollTo: {
                  y: target,
                  offsetY: $('header').innerHeight() + 16,
               },
               ease: 'power3.out',
            })
         })
      })
   },
}

APP.gsapConfig = () => {
   // ScrollSmoother
   gsap.registerPlugin(ScrollTrigger)

   APP.utils.onWidthChange(() => {
      ScrollTrigger.refresh()
   })
   window.addEventListener('load', () => {
      setTimeout(() => ScrollTrigger.refresh(), 100)
   })
}

APP.sliders = {
   testSlider: function (sliderSelector) {
      const node = document.querySelector(sliderSelector)
      if (!node) {
         return
      }
      const slider = new Swiper(node, {
         slidesPerView: 1,
         spaceBetween: 20,
         loop: true,
         navigation: {
            prevEl: `${sliderSelector}--prev`,
            nextEl: `${sliderSelector}--next`,
         },
      })
   },
   init: function () {
      this.testSlider('.test-swiper-slider')
   },
}

APP.sharePostIntoSoccials = {
   shareUrl: window.location.href,
   timeout: null,
   shareToFacebook: function () {
      const self = APP.sharePostIntoSoccials
      const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(self.shareUrl)}`
      window.open(facebookUrl, '_blank', 'width=600,height=400')
   },
   shareToLinkedIn: function () {
      const self = APP.sharePostIntoSoccials
      const linkedinUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(self.shareUrl)}`
      window.open(linkedinUrl, '_blank', 'width=600,height=400')
   },
   copyLink: function () {
      const self = APP.sharePostIntoSoccials
      const textToCopy = self.shareUrl
      APP.utils.copyToClipboard(textToCopy)
      self.showMessage()
   },
   showMessage: function () {
      const self = APP.sharePostIntoSoccials
      $('.share .message').slideDown()

      if (self.timeout) {
         $('.share .message').slideUp().slideDown()
         clearTimeout(self.timeout)
      }
      self.timeout = setTimeout(() => {
         $('.share .message').slideUp()
      }, 5000)
   },
   shareToX: function () {
      const self = APP.sharePostIntoSoccials
      const text = encodeURIComponent('Переглянь це: ')
      const url = encodeURIComponent(self.shareUrl)
      const xUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`
      window.open(xUrl, '_blank', 'width=600,height=400')
   },
   handlers: function () {
      $('.share-facebook').click(this.shareToFacebook)
      $('.share-linked-in').click(this.shareToLinkedIn)
      $('.share-x').click(this.shareToX)
      $('.share-inst').click(this.copyLink)
      $('.share-tiktok').click(this.copyLink)
      $('.share-copy').click(this.copyLink)
   },
   init: function () {
      this.handlers()
   },
}

APP.countrySelect = () => {
   const input = document.querySelector('#phone')
   const $input = $(input)
   const $errorMsg = $('.ui-input-phone-error')

   if (!input) {
      return
   }

   // 1. Ініціалізація intl-tel-input
   const iti = window.intlTelInput(input, {
      utilsScript: 'https://cdn.jsdelivr.net/npm/intl-tel-input@18.2.1/build/js/utils.js',
      initialCountry: 'ca',
      separateDialCode: true,
      preferredCountries: ['ua', 'pl', 'us', 'de', 'ca'],
      autoPlaceholder: 'aggressive',
   })

   // 2. Функція оновлення маски
   function updateMask() {
      let placeholder = input.getAttribute('placeholder')

      if (!placeholder) {
         placeholder = '0000000000'
      }

      let exampleNumber = placeholder.replace(/\D/g, '')
      let length = exampleNumber.length

      let maskPattern = ''

      if (length === 9) {
         maskPattern = '999-999-999'
      } else if (length === 11) {
         maskPattern = '999-999-999-99'
      } else {
         maskPattern = '(999)-999-99-99'
      }

      // Застосовуємо маску
      $input.inputmask('remove')
      $input.inputmask({
         mask: maskPattern,
         placeholder: '_',
         showMaskOnHover: false,
         showMaskOnFocus: true,
         clearIncomplete: true,
      })
   }

   iti.promise.then(function () {
      updateMask()
   })

   // 4. Подія зміни країни
   input.addEventListener('countrychange', function () {
      $input.val('')
      updateMask()
   })

   // 5. Валідація
   $input.on('blur', function () {
      if ($input.inputmask('isComplete')) {
         $errorMsg.hide()
         $input.css('border-color', '#ccc')
      } else {
         if ($input.val().length > 0) {
            $errorMsg.show()
            $input.css('border-color', 'red')
         }
      }
   })
}

document.addEventListener('DOMContentLoaded', event => {
   APP.gsapConfig()
   APP.utils.inputMasks()
   APP.utils.scrollToAnchor()

   //    logic
   APP.countrySelect()
   APP.sliders.init()

   setTimeout(() => ScrollTrigger.refresh(), 100)
})
