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
            // case 'text':
            // Маска для текстового поля (дозволяє тільки літери та пробіли)
            //    $(this).on('input', function () {
            //   this.value = this.value.replace(/[^A-Za-zА-Яа-яЁё\s]/g, '').slice(0, 50)
            //    })

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

            // case 'email':
            //    // Маска для email
            //    $(this).inputmask({
            //       alias: 'email',
            //       clearIncomplete: true,
            //       showMaskOnHover: true,
            //       showMaskOnFocus: true,
            //       showMaskOnBlur: true,
            //    })
            //    break
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
   setHeaderHeight: () => {
      const selector = '.header'
      const cssVar = '--header-height'
      const target = document.documentElement

      const header = document.querySelector(selector)
      if (!header) return

      let rafId = null

      const update = () => {
         cancelAnimationFrame(rafId)
         rafId = requestAnimationFrame(() => {
            const height = header.offsetHeight
            target.style.setProperty(cssVar, `${height}px`)
         })
      }

      // первинний виклик
      update()

      // resize window
      window.addEventListener('resize', update)

      // resize самого header (sticky, меню, шрифти, etc)
      let resizeObserver = null
      if ('ResizeObserver' in window) {
         resizeObserver = new ResizeObserver(update)
         resizeObserver.observe(header)
      }
   },

   url: path => {
      const BASE = window.__BASE__ || ''

      return `${BASE}${path}`
   },
}

APP.gsapConfig = () => {
   // ScrollSmoother
   gsap.registerPlugin(DrawSVGPlugin, ScrollTrigger, ScrollToPlugin, SplitText)

   ScrollTrigger.config({
      autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load,resize',
      ignoreMobileResize: true,
   })
}

APP.testFetch = async () => {
   try {
      const response = await fetch(APP.utils.url('/js/shops.json'))

      if (!response.ok) {
         throw new Error(`HTTP error! status: ${response.status}`)
      }

      const jsonData = await response.json()
      console.log('jsonData:', jsonData.message.text)
   } catch (error) {
      console.error('Помилка завантаження даних:', error)
   }
}

document.addEventListener('DOMContentLoaded', event => {
   APP.gsapConfig()
   //    APP.utils.inputMasks()
   APP.utils.scrollToAnchor()
   APP.utils.setHeaderHeight()

   APP.testFetch()

   ScrollTrigger.refresh()
})
