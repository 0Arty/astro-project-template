import { createAnchor, createExampleLink } from '@functions/router'

const BASE = import.meta.env.BASE_URL

export const ROUTES = {
   INDEX: BASE,
   PRODUCTS: `${BASE}products`,
   PRODUCT: `${BASE}product`,
   PRODUCTIONS: `${BASE}productions`,
   ABOUT: `${BASE}about`,
   STORES: `${BASE}stores`,
   NEWS: `${BASE}news`,
   POST: `${BASE}post`,
   CONTACTS: `${BASE}contacts`,
} as const

export const ANCHORS = {
   Hero: 'hero',
   AboutUs: 'AboutUs',
   OurLocations: 'OurLocations',
   Services: 'Services',
   Results: 'Results',
} as const

export const MENU = [
   {
      link: ROUTES.PRODUCTS,
      name: 'Наша продукція',
   },
   {
      link: ROUTES.PRODUCTIONS,
      name: 'Виробництво',
   },
   {
      link: ROUTES.ABOUT,
      name: 'Про компанію',
   },
   {
      link: ROUTES.STORES,
      name: 'Магазини',
   },
   {
      link: ROUTES.NEWS,
      name: 'Новини & рецепти',
   },
   {
      link: ROUTES.CONTACTS,
      name: 'Контакти',
   },
] as const
