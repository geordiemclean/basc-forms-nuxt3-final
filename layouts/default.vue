<template>
  <div>
    <!-- <header class="shadow-sm bg-white">
      <nav class="container mx-auto p-4 flex justify-between">
        <NuxtLink to="/" class="font-bold">Nuxt Dojo</NuxtLink>
        <ul class="flex gap-4">
          <li><NuxtLink to="/">Home</NuxtLink></li>
          <li><NuxtLink to="/about">About</NuxtLink></li>
          <li><NuxtLink to="/products" class="btn">Merch</NuxtLink></li>
        </ul>
      </nav>
    </header> -->
  
      <v-app >
        <AppLoading />
        <Snackbar />
   <slot  />

    </v-app>
    
  </div>
</template>

<script setup>
 import AppLoading from '../components/Loaders/AppLoading.vue';
import Snackbar from '../components/Helpers/Snackbar.vue';

    await useFetch('/api/users')
   
</script>
