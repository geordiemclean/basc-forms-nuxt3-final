<template >
    <v-dialog persistent  width="auto" v-model="store.dialogComplete">
        <v-card>
          <v-toolbar color="transparent" density="compact">
            <v-spacer />
            <v-btn 
            color="primary"
            class="font-weight-bold mr-5"
            variant="outlined"
            prepend-icon="mdi-close" 
            @click="store.dialogComplete = false">
             Close
            </v-btn>
          </v-toolbar>
          <v-card-text>
          <div class="text-center text-blue text-h5">Thanks {{store.contactName}}</div>
          <div  class="pa-4 text-center">
            <h3 class="title font-weight-bold mb-10">
              <v-icon size="100" color="green">mdi-check-circle</v-icon>
                You have successfully submitted this form.
            </h3>
            <h4 class="blue--text">Have a nice day!</h4>
            </div>
          </v-card-text>
        </v-card>
      </v-dialog>
</template>

<script>
    import { useStore } from '../../stores/Store'

    export default {
        setup() {
        const store = useStore()
        return {
            store,
        };
    },
    
    }
</script>