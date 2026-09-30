/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Composables
import { createVuetify } from 'vuetify'
// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: 'clinicalLight',
    themes: {
      clinicalLight: {
        dark: false,
        colors: {
          primary: '#087f83',
          secondary: '#163b4a',
          surface: '#ffffff',
          background: '#f2f6f5',
        },
      },
      clinicalDark: {
        dark: true,
        colors: {
          primary: '#65c4bd',
          secondary: '#b8d9dc',
          surface: '#1b2a31',
          background: '#111c21',
        },
      },
    },
  },
})
