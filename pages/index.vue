<template>
  <v-app>
    <AppBar  />
    <Home />
    <DialogComplete />
  </v-app>
</template>

<script setup>
  import AppBar from '../components/Layout/AppBar.vue';
  import Home from '../components/Home.vue';
  import DialogComplete from '../components/Helpers/DialogComplete.vue';
</script>