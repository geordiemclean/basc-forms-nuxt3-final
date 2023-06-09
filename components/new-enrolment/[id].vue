<template >
    <v-container fluid>
        <v-toolbar density="compact"  class="no-print " color="transparent" >
            <nuxt-link to="/">    <v-icon class="mr-2" color="purple" to="/">mdi-home</v-icon></nuxt-link>
            <v-toolbar-title class="font-weight-bold text-purple">New Enrolment</v-toolbar-title>
            <v-spacer></v-spacer>
        </v-toolbar>
        <v-window
    v-model="window"
    direction="vertical"
  >
    <v-window-item
      v-for="(item, index) in enrolItems"
      :key="index"
    >
    <v-toolbar density="compact"   color="transparent" >
        <v-toolbar-title :class="item.class">{{item.title}}</v-toolbar-title>
        <v-spacer></v-spacer>
    </v-toolbar>
       
        <component 
        :is="getComponentForField(item)" 
       ></component>
   
    </v-window-item>
    <v-btn @click="window++">Next</v-btn>
  </v-window>
</v-container>
</template>

<script>
import Account from '~/components/Enrol/Account.vue'
import Children from '~/components/Enrol/Children.vue'

export default {
    components: {
        Account,
        Children,
    },
    data() {
        return {
            length: 3,
            window: 0,
            enrolItems: [
                {
                    name: 'Account',
                    title: 'Account Details',
                    class: "font-weight-bold text-primary",
                },
                {
                    name: 'Children',
                    title: 'Children Details',
                    class: "font-weight-bold text-tertiary",
                }
            ]
        }
    },
    methods: {
        getComponentForField(item) {
      // Return the corresponding component based on the field type
      switch (item.name) {
        case 'Account':
          return 'Account';
        case 'Children':
          return 'Children';
      }
    },
    },
}
</script>