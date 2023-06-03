<template >
    <v-dialog width="700" v-model="store.dialogLeave">
        <v-card >
          <v-card-text class="text-center pink--text font-weight-bold headline">
            Are you sure you want to leave? This form is not yet submitted!
          </v-card-text>
        
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn @click="store.dialogResponse(false)" class="font-weight-bold" color="blue" dark>Cancel</v-btn>
          <v-spacer></v-spacer>
          <v-btn @click="store.dialogResponse(true)" class="font-weight-bold" color="blue" dark>Leave</v-btn>
        </v-card-actions>
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