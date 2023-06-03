<template>
  <v-dialog
  v-model="dialog"
  width="800"
>
  <template v-slot:activator="{ props }">
    <v-btn
      variant="text"
      color="primary"
      v-bind="props"
      class="font-weight-bold text-decoration-underline"
    >Terms And Conditions
    </v-btn>
  </template>
  <v-card>
    <v-toolbar density="compact">
      <v-spacer />
      <v-btn 
      color="primary"
      class="font-weight-bold mr-5"
      variant="outlined"
      prepend-icon="mdi-close" 
      @click="dialog = false">
       Close
      </v-btn>
    </v-toolbar>
    <v-card-text v-html="visitorTC">
    </v-card-text>
    <v-toolbar density="compact">
      <v-spacer />
      <v-btn class="mr-5 font-weight-bold" color="primary" variant="outlined" prepend-icon="mdi-close" @click="dialog = false">
       Close
      </v-btn>
    </v-toolbar>
  </v-card>
</v-dialog>
</template>

<script>

export default {
  props: ['visitorTC'],
  data() {
    return {
      dialog: false,
    }
  },
  
}
</script>

