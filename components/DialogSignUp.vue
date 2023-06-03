<template lang="">
    <v-dialog 
    max-width="600" 
    v-model="visitorStore.signUpDialog"
    persistent
    >
    <v-card

    >
    <v-toolbar
      flat
      dark
      density="compact"
      color="primary"
    >
      <v-toolbar-title>Sign Up</v-toolbar-title>
      <v-spacer />
      <v-spacer />
      <v-toolbar-items>
        <v-btn
          color="white--text darken-1"
          text
          dark
          prepend-icon="mdi-close"
          @click="visitorStore.close"
        >
          Close
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-card-text >
      <v-row >
        <v-col cols="6">
          <h4 class="blue--text">First Name <span class="text-error">*</span></h4>
              <v-text-field
              prepend-icon="mdi-account"
              density="compact"
              variant="outlined"
                v-model="visitorStore.visitorFirstName"
                :rules="firstNameRules"
                type="string"
                autocomplete="off"
              ></v-text-field>
        </v-col>
        <v-col  cols="6">
          <h4 class="blue--text">Last Name <span class="text-error">*</span></h4>
          <v-text-field
          density="compact"
            v-model="visitorStore.visitorLastName"
            :rules="lastNameRules"
            type="string"
            autocomplete="off"
            prepend-icon="mdi-account"
            variant="outlined"
          ></v-text-field>
        </v-col>
      </v-row>
          
         
         
      
          <h4 class="blue--text">Reason For Visit <span class="text-error">*</span></h4>
         
            <v-select
                :items="visitorStore.mapReasons"
                :rules="[v => !!v || 'Required']"
                prepend-icon="mdi-briefcase"
                autocomplete=“off”
                variant="outlined"
                density="compact"
                v-model="visitorStore.reasonForVisit"
              ></v-select>
         
          <h4 class="blue--text">Email <span class="text-error">*</span></h4>
              <v-text-field
              density="compact"
                :rules="emailRules"
                v-model="visitorStore.email"
                autocomplete="off"
                prepend-icon="mdi-email"
                variant="outlined"
              />
         
          <h4 class="blue--text">Working With Childrens Check</h4>
              <v-text-field
              density="compact"
                v-model="visitorStore.wwcc"
                autocomplete="off"
                prepend-icon="mdi-pound-box"
                variant="outlined"
              ></v-text-field>
         <div class="text-center font-weight-bold">By creating your account, you agree to </div>
         <div class="text-center font-weight-bold">
          <span class="ml-5 mr-n3">the services</span> <Terms :visitorTC="visitorStore.visitorTC" />
         </div>
       
    </v-card-text>
    <v-divider class="my-2"></v-divider>

    <div class="text-center my-2">
      
      <v-btn
        color="primary"
        class="font-weight-bold"
        size="x-large"
        variant="elevated"
        rounded
        @click="visitorStore.signUp"
      >
        Create Account
      </v-btn>
    </div>



    </v-card>
    </v-dialog>
</template>

<script>  
import { useVisitorStore } from '../stores/VisitorStore'
import Terms from "./Terms.vue";

export default {
    setup() {
          const visitorStore = useVisitorStore();
          return {
              visitorStore,
          };
      },
      components: { Terms },
      data() {
        return {
            // rules
          firstNameRules: [
              (v) => !!v || "First Name is required",
          ],
          lastNameRules: [
              (v) => !!v || "Last Name is required",
          ],
          emailRules: [
              (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
          ],
          Rules: [
              v => (v && v.length >= 1) || "Required",
          ],
          // closeConfirmDialog: false,
          valid: true,
        }
      },
    
}
</script>