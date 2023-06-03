// import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { VBtn, VTextField, VCard, VProgressCircular } from 'vuetify/components'

export default defineNuxtPlugin((nuxtApp) => {
    const vuetify = createVuetify({
        ssr: true,
        components,
        directives,
        aliases: {
            // btns
            VBtnOutlined: VBtn,
            VBtnAlt: VBtn,
            // textfields
            VTextFieldEmail: VTextField,
            VTextFieldPassword: VTextField,
            VTextFieldSearch: VTextField,
            VTextFieldMobile: VTextField,
            // cards
            VCardLogin: VCard,
            // loaders
            VProgressCircularBtn: VProgressCircular,
          },
        theme: {
            defaultTheme: 'light',
            themes: {
              dark: {
                dark: true,
                colors: {
                  // blue
                  primary: '#42A5F5',
                  // purple 
                  secondary: '#9575CD',
                  // cyan
                  tertiary: '#4DD0E1',
                  // red
                  error: '#FF1744',
                  // blue grey
                  buttonCheckIn: '#78909C',
                  // none
                  appBarColor: '#212121'
        
                  
                },
              },
              light: {
                dark: false,
                colors: {
        
                  // background: "#FAFAFA",
                  primary: '#1697f6',
                  secondary: '#7E57C2',
                  tertiary: '#00838F',
                  error: '#FF1744',
                  // blue grey
                  buttonCheckIn: '#ECEFF1',
                  appBarColor: 'ECEFF1'
                },
              },
            },
          },
    })  
    nuxtApp.vueApp.use(vuetify)
})