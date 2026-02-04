interface IMETA {
   desription: string
   title: string
   imageSrc: string
   faviconSrc: string
   faviconType: string
}

export const META: IMETA = {
   desription: 'Site description',
   title: 'og title, twitter title',
   imageSrc: './assets/images/meta/og-image.png',
   faviconSrc: './assets/images/meta/favicon.svg',
   faviconType: 'img/svg+xml',
}
