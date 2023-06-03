<template>
  <v-app>
    <AppBar  />
    <Home />
    <DialogSignUp />

    <AppLoading />
    <Snackbar />
  </v-app>
</template>

<script setup>
  import AppBar from '../components/Layout/AppBar.vue';
 import AppLoading from '../components/Loaders/AppLoading.vue';
 import Home from '../components/Home.vue';
   import Snackbar from '../components/Helpers/Snackbar.vue';
   import DialogSignUp from '~~/components/DialogSignUp.vue';
   await useFetch('/api/users')
  //  import { nextTick } from 'vue'

  //   await nextTick()
  // onMounted() {
  //   const { data } = await useFetch('/api/fetchReasons')

  //   console.log(data)
  // }
   
  //   await useFetch('/api/fetchReasons').then((res) => {
  //      console.log(res)
  //  })

</script>