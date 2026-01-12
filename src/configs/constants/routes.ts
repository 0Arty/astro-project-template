import { createAnchor, createExampleLink } from '@functions/router'

export const ROUTES = {
   findLocation: createExampleLink('findLocation'),
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
      link: createAnchor(ANCHORS.AboutUs),
      name: 'About us',
   },
   {
      link: createAnchor(ANCHORS.OurLocations),
      name: 'Our locations',
   },

   {
      link: createAnchor(ANCHORS.Services),
      name: 'Services',
   },

   {
      link: createAnchor(ANCHORS.Results),
      name: 'Results',
   },
] as const

export const OFFICES = [
   {
      link: createExampleLink('Baltimore'),
      name: 'Baltimore',
      id: 'Baltimore1',
   },
   {
      link: createExampleLink('Towson'),
      name: 'Towson',
      id: 'Towson1',
   },

   {
      link: createExampleLink('Essex'),
      name: 'Essex',
      id: 'Essex1',
   },

   {
      link: createExampleLink('Hyattsville'),
      name: 'Hyattsville',
      id: 'Hyattsville1',
   },
] as const
