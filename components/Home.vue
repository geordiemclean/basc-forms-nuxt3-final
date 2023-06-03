<template>
    <v-main fluid>
      <v-row justify="center" class="mt-5">
        <div class="text-center">
        <h3 class=" text-primary"><span >Bondi Before & After School Care</span></h3>
      </div>
        </v-row>
  
        <v-row justify="center" >
            <h4  class="text-center">Visitor Check In</h4>
          </v-row>
            
  
          <v-row justify="center" >
  
          
        
                <v-responsive max-width="350">
  
    
              <v-text-field-mobile
          label="Please enter your mobile number"
          color="primary"
          class=" mt-3 textField"
          counter
          maxlength="10"
          v-model="visitorStore.mobile"
          readonly
          size="10"
          append-inner-icon="mdi-login"
          @click:append-inner="visitorStore.login"
          @keypress.enter="visitorStore.login">
          
          </v-text-field-mobile>
        </v-responsive>
        
          </v-row>
  
  
      <v-row justify="center" v-for="(row, rowIndex) in buttons" :key="rowIndex">   
               <v-btn color="buttonCheckIn"  v-for="(button, buttonIndex) in row.row" :key="buttonIndex + 111"   @click="addNumber(button.value)" width="80" height="80"  size="x-large" :class="button.class">{{button.name}}</v-btn>
      </v-row>
          <v-row justify="center">
                  <v-btn color="buttonCheckIn"   @click="btnCLR" width="80" height="80"  size="x-large" class="text-h4 mt-3 mr-3">CLR</v-btn>
                  <v-btn color="buttonCheckIn"  @click="addNumber(0)" width="80" height="80"  size="x-large" class="text-h3 mt-3">0</v-btn>
                  <v-btn  color="buttonCheckIn"  @click="btnDEL" width="80" height="80"  size="x-large" class="text-h4 mt-3 ml-3">DEL</v-btn>
          </v-row>
                 
                 
  
             
  
              
  
  
  
                <v-dialog persistent  width="auto" v-model="visitorStore.dialogCheckIn">
                  <v-card>
                    <v-toolbar color="transparent" density="compact">
                      <v-spacer />
                      <v-btn 
                      color="primary"
                      class="font-weight-bold mr-5"
                      variant="outlined"
                      prepend-icon="mdi-close" 
                      @click="visitorStore.dialogCheckIn = false">
                       Close
                      </v-btn>
                    </v-toolbar>
                    <v-card-text>
                    <div class="text-center text-blue text-h5">{{visitorStore.welcomeText}} {{visitorStore.visitorFirstName}}</div>
                    <div  class="pa-4 text-center">
                     
                      <h3 class="title font-weight-bold mb-10">
                        <v-icon size="100" color="green">mdi-check-circle</v-icon>
                          {{visitorStore.checkInText}}
                      </h3>
                      <h4 class="blue--text">  {{visitorStore.thankYouText}}</h4>
                      </div>
                    </v-card-text>
                  </v-card>
                </v-dialog>
  
  </v-main>
  </template>
  
  <script>
  import { useVisitorStore } from '../stores/VisitorStore'


  
  export default {
     setup() {
          const visitorStore = useVisitorStore();
          return {
              visitorStore,
          };
      },
     mounted() {
    
      this.visitorStore.fetchSettings()
      this.visitorStore.signOutAll()
        },
      data: () => ({
          buttons: [
              {
                  row: [
                      { name: "1", value: 1, class: "text-h3 display-2 mr-3" },
                      { name: "2", value: 2, class: "text-h3 display-2" },
                      { name: "3", value: 3, class: "text-h3 display-2 ml-3" },
                  ],
              },
              {
                  row: [
                      { name: "4", value: 4, class: "text-h3 display-2 mt-3 mr-3" },
                      { name: "5", value: 5, class: "text-h3 display-2 mt-3" },
                      { name: "6", value: 6, class: "text-h3 display-2 mt-3 ml-3" },
                  ],
              },
              {
                  row: [
                      { name: "7", value: 7, class: "text-h3 display-2 mt-3 mr-3" },
                      { name: "8", value: 8, class: "text-h3 display-2 mt-3" },
                      { name: "9", value: 9, class: "text-h3 display-2 mt-3 ml-3" },
                  ],
              },
          ],
          
      }),
      methods: {
      //   async  fetchReasons() {
      //   const { data } = await useFetch('/api/fetchReasons')

      //   console.log(data)
      // },
          addNumber(number) {
              if (this.visitorStore.mobile.length < 10) {
                  this.visitorStore.mobile = this.visitorStore.mobile + number;
                  if (this.visitorStore.mobile.length === 10) {
                      this.visitorStore.login();
                  }
              }
              else {
                  this.visitorStore.login();
              }
          },
          btnDEL() {
              this.visitorStore.mobile = this.visitorStore.mobile.slice(0, -1);
          },
          btnCLR() {
              this.visitorStore.mobile = "";
          },
      },
  };
  </script>
  
  <style>
  
  body{
  touch-action: manipulation;
  }
  .textField input {
    font-size: 1.5em;
    letter-spacing: 0.3em;
  }
  </style>
  