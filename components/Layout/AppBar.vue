<template >
    <v-app-bar density="compact" color="appBarColor" app flat>
      <v-icon color="primary" class="ml-4" left >mdi-circle-outline</v-icon>
      <v-btn color="primary" size="large" variant="text"  class="font-weight-bold"  href='https://ooshtech.com' target="_blank">
        OOSHTECH
      </v-btn>
       
        <v-spacer />
        <v-icon class="mr-10" @click="changeTheme" >mdi-theme-light-dark</v-icon>
        
      </v-app-bar>
</template>

<script>
    import { useTheme } from 'vuetify'
    
    export default {
        setup () {
            const theme = useTheme()
            return { 
               theme }
        },
        mounted () {
          console.log(localStorage.darkMode)
          if (localStorage.darkMode !== null && localStorage.darkMode !== undefined)
          {
          this.theme.global.name.value = localStorage.darkMode
          }
          else {
            this.theme.global.name.value = 'light'
          }

        },
        methods: {
          changeTheme() {
            this.theme.global.name.value = this.theme.global.current.value.dark ? 'light' : 'dark' 
            localStorage.setItem('darkMode', this.theme.global.name.value)
          }
        },
    }
</script>