<template >
  <v-app-bar flat density="compact" color="appBarColor" app v-if="!['Vac', 'Form', 'ParentSign'].includes($route.name)">
    <v-icon color="primary" class="ml-4" left >mdi-circle-outline</v-icon>
    <v-btn color="primary" size="large" variant="text"  class="font-weight-bold"  href='https://ooshtech.com' target="_blank">
      OOSHTECH
    </v-btn>
     
      <v-spacer />

      <v-btn color="secondary" size="large" variant="text"  class="font-weight-bold"  href='https://www.bondibasc.com/' target="_blank">
        Bondi BASC
      </v-btn>
      <!-- <v-icon class="mr-10" @click="changeTheme" >mdi-theme-light-dark</v-icon> -->
      
    </v-app-bar>
</template>

<script>
   
</script>