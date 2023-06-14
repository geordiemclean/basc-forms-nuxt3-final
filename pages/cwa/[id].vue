<template>
    <v-main>
    <v-container fluid v-if="!store.appLoading">
      <!-- STart CWA -->
          <v-card class="transparent mx-auto" flat max-width="900">
            <v-card-text>
          <h2 class="text-center text-primary font-weight-bold">Confirmation of Childcare Agreement</h2>
           <h4 class="font-weight-bold text-secondary mt-3">Parties to Agreement</h4>
  
          <v-row justify="center">
                <v-col cols="4">
                  <v-card-text class="font-weight-bold text-black ">Between:</v-card-text>
                </v-col>
                <v-col cols="8">
                <v-card-text class="text-black">Parent / Guardian Signing This Form</v-card-text>
                </v-col>
          </v-row>
          <v-row class="mt-n10">
                <v-col cols="4">
                  <v-card-text class="font-weight-bold text-black ">And:</v-card-text>
                   </v-col>
                <v-col cols="8" >
                  <v-card-text class="text-black">{{businessName}}. ABN: {{businessABN}} (Provider)</v-card-text>
                    </v-col>
      
                      </v-row>
                     <v-row class="mt-n10"> 
                     <v-col cols="4">
              <v-card-text class="font-weight-bold text-black ">For the care of:</v-card-text>
                     </v-col> <v-col cols="8">
             <v-card-text class="text-black">{{firstName}} {{lastName}}, D.O.B:  {{dateOfBirth}} </v-card-text>
             </v-col>
             </v-row>
  
             <v-row class="mt-n10">
                     <v-col cols="4">
                  
           <v-card-text class="font-weight-bold text-black ">By:</v-card-text>
            </v-col> 
            <v-col cols="8">
                <v-card-text class="text-black">{{serviceName}} (Service)</v-card-text>
           </v-col> 
             </v-row>
           <v-row class="mt-n10">
  
          
           <v-col cols="4">
  
           <v-card-text class="font-weight-bold text-black ">Arrangement Start Date: </v-card-text>
           </v-col> 
            <v-col cols="8">
           <v-card-text>{{ enrolStart }}</v-card-text>
             </v-col> 
              </v-row>
              <v-row class="mt-n10" >
             <v-col cols="4">
            <v-card-text class="font-weight-bold text-black ">Service Fee And Charges: 
                  </v-card-text>
                  </v-col> <v-col cols="8">
                    <v-card-text>
                <v-btn dark color="blue" size="small" class="font-weight-bold" small href="https://www.bondibasc.com/fees-charges" target="_blank">Click Here</v-btn>
             </v-card-text>
          
          </v-col>
           </v-row>
       
          </v-card-text>
        </v-card>
        <v-card class="transparent mb-5 mx-auto" flat max-width="900">
              <v-card-text class="body-1 font-weight-bold text-blue">Routine Bookings</v-card-text>
        
               <v-table v-if="activebookings.length >= 1">
              <thead>
                <tr>
                  <th class="body-1 font-weight-bold text-black"> 
                    Roll
                  </th>
                  <th class="body-1 font-weight-bold text-black"> 
                    Start
                  </th>
                  <th class="body-1 font-weight-bold text-black"> 
                    End
                  </th>
                  <th class="body-1 font-weight-bold text-blue">
                    Week 1 Bookings
                  </th>
                   <th class="body-1 font-weight-bold green--text">
                    Week 2 Bookings
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr  v-for="(item, bookingIndex) in activebookings" :key="bookingIndex + 123445">
                  <td v-if="item.rollGroup !== 'Before School Care'" class=" font-weight-bold">After School Care</td>
                  <td v-if="item.rollGroup === 'Before School Care'" class=" font-weight-bold">Before School Care</td>
                  <td class=" font-weight-bold">{{item.startDate}}</td>
                  <td class=" font-weight-bold">{{item.endDate}}</td>
                  <td >
                    <v-icon v-if="item.mondayW1 === true" color="blue">mdi-alpha-m-box</v-icon>
                    <v-icon v-if="item.mondayW1 === false" color="grey">mdi-alpha-m-box</v-icon>
                    <v-icon v-if="item.tuesdayW1 === true" color="blue">mdi-alpha-t-box</v-icon>
                    <v-icon v-if="item.tuesdayW1 === false" color="grey">mdi-alpha-t-box</v-icon>
                    <v-icon v-if="item.wednesdayW1 === true" color="blue">mdi-alpha-w-box</v-icon>
                    <v-icon v-if="item.wednesdayW1 === false" color="grey">mdi-alpha-w-box</v-icon>
                    <v-icon v-if="item.thursdayW1 === true" color="blue">mdi-alpha-t-box</v-icon>
                    <v-icon v-if="item.thursdayW1 === false" color="grey">mdi-alpha-t-box</v-icon>
                    <v-icon v-if="item.fridayW1 === true" color="blue">mdi-alpha-f-box</v-icon>
                    <v-icon v-if="item.fridayW1 === false" color="grey">mdi-alpha-f-box</v-icon>
                    </td>
                    <td >
                    <v-icon v-if="item.mondayW2 === true" color="green">mdi-alpha-m-box</v-icon>
                    <v-icon v-if="item.mondayW2 === false" color="grey">mdi-alpha-m-box</v-icon>
                    <v-icon v-if="item.tuesdayW2 === true" color="green">mdi-alpha-t-box</v-icon>
                    <v-icon v-if="item.tuesdayW2 === false" color="grey">mdi-alpha-t-box</v-icon>
                    <v-icon v-if="item.wednesdayW2 === true" color="green">mdi-alpha-w-box</v-icon>
                    <v-icon v-if="item.wednesdayW2 === false" color="grey">mdi-alpha-w-box</v-icon>
                    <v-icon v-if="item.thursdayW2 === true" color="green">mdi-alpha-t-box</v-icon>
                    <v-icon v-if="item.thursdayW2 === false" color="grey">mdi-alpha-t-box</v-icon>
                    <v-icon v-if="item.fridayW2 === true" color="green">mdi-alpha-f-box</v-icon>
                    <v-icon v-if="item.fridayW2 === false" color="grey">mdi-alpha-f-box</v-icon>
                    </td>
                </tr>
              </tbody>
            </v-table>
  
           
            <v-card-text v-else>No active routine bookings.</v-card-text>
               
        </v-card>
       
        <v-card class="transparent mx-auto mt-5" flat max-width="900">
          <v-card-text>
          <p  v-html="cwaInformation"></p>
        </v-card-text>
        </v-card>
  
        <v-card id="parentScroll"  v-if="!store.appLoading"  max-width="900" class="mx-auto mt-5">
          <v-card-title class="font-weight-bold text-purple mb-5">Parent / Guardian</v-card-title>
          <v-card-text>
             <v-row>
               <v-col cols="6">
                 <h4 class="font-weight-bold mt-n5">Parent / Guardian First Name</h4>
                <v-text-field  variant="outlined" density="compact"  v-model="contactFirstName" />
               </v-col>
               <v-col cols="6" class="mt-n5">
                 <h4 class="font-weight-bold">Parent / Guardian Last Name</h4>
             <v-text-field  variant="outlined" density="compact"  v-model="contactLastName" />
               </v-col>
               <v-col class="mt-n10 text-center" cols="8">
                <h4 class="purple--text font-weight-bold">Street Address</h4>
             <v-text-field  variant="outlined" density="compact" v-model="userStreet" />
           </v-col>
            <v-col class="mt-n10 text-center" cols="4">
                <h4 class="purple--text font-weight-bold">Suburb</h4>
             <v-text-field  variant="outlined" density="compact" v-model="userSuburb" />
           </v-col>
            <v-col class="mt-n10 text-center" cols="6">
                <h4 class="purple--text font-weight-bold">Post Code</h4>
             <v-text-field  variant="outlined" density="compact" v-model="userPostCode" />
           </v-col>
            <v-col class="mt-n10 text-center" cols="6">
                <h4 class="purple--text font-weight-bold " >State</h4>
             <v-text-field   variant="outlined" density="compact" v-model="userState" />
           </v-col>
               <v-col cols="12" class="mt-n5">
                 <h4 class="font-weight-bold"> Signature 
                   <BaseSignature 
                   signatureType="parent"
                   display="icon"
                   :updateOnChange="true"
                   
                   :import="false"
                   @updateArray="updateArray"
                   
                   v-if="!store.appLoading"                 
                   />
                  </h4>
                 
                   <BaseSignature 
                   signatureType="parent"
                   display="text-field"
                   :updateOnChange="true"
                   @updateArray="updateArray"
                   v-if="!store.appLoading && (contactSignature === '' || contactSignature === null || contactSignature === undefined)"                 
                   />
                   <div v-else>
                     <img  height="80" :src="contactSignature" alt="" />
                   </div>
                  
               </v-col>
             </v-row>
          </v-card-text>
  
     </v-card>
  
     <v-card-text class="text-center" v-if=" !store.appLoading">
      <v-progress-circular
      v-if="processing"
      color="grey"
      indeterminate
      small
    />
  <v-btn
      v-if="!processing"
      color="primary"
      dark
      size="x-large"
      class="font-weight-bold"
      @click="submit"
    >
    <span >Submit</span>
    </v-btn>
  
  </v-card-text>
  
  
  
        
        </v-container>
      </v-main>
  </template>
  
  <script>
  import { useStore } from '../../stores/Store'
   import { format } from 'date-fns';
  import BaseSignature from '../../components/Form/Fields/BaseSignature.vue';
  
  export default {
      setup() {
          const store = useStore();
          const { id } = useRoute().params
          return {
              store, id
          };
      },
      components: { BaseSignature },
      props: ["search"],
      data() {
          return {
              loading: false,
              // start signature
              // start signatures
              processing: false,
              dialogSignature: false,
              signature: "",
              hideMessage: true,
              hideMessage1: true,
              signatureClass: "blue lighten-5",
              saveColour: "green",
              signUpDate: null,
              saveSignature: false,
              // start user info
              contactFirstName: "",
              contactLastName: "",
              contactSignature: "",
              userId: null,
              accountId: null,
              parentId: null,
              userStreet: "",
              userPostCode: "",
              userSuburb: "",
              userState: "NSW",
              // end user info
              // start enrol
              enrolInformation: null,
              // end enrol
              // start cwa
              openForm: false,
              bookings: [],
              // cwa settings
              cwaInformation: null,
              businessName: null,
              businessABN: null,
              serviceName: null,
              // child info
              firstName: null,
              lastName: null,
              yearGroup: null,
              dateOfBirth: null,
              enrolStart: format(new Date(), "dd/MM/yyyy"),
              enrolStartDate: null,
              cwaComplete: null,
              // end cwa
          };
      },
      mounted () {
        this.fetchCwaData();
      },
      computed: {
          activebookings: function () {
              return this.bookings.filter(function (u) {
                  return u.active === true && (u.endDateReversed >= format(new Date(), "yyyyMMdd") || u.endDateReversed === "");
              });
          },
      },
      methods: {

          sortBy(prop) {
              this.bookings.sort((a, b) => (a[prop] < b[prop] ? -1 : 1));
          },
          async fetchBookings() {
              var vm = this;
              vm.bookings = [];

              try {
                 // get all visitors
                    vm.store.fetchArray('bookings', 'childId', '==', vm.id).then(
                    (res) => {
                        vm.bookings = res.data.value
                        vm.sortBy("startDateReversed");
                        vm.store.appLoading = false;
                    })
                  }
             catch (err) {
                    vm.store.appLoading = false
                    vm.store.snackbarSet('red', 'Error', `Something went wrong. Err: ${err}`)
                    }
          },
          updateArray(index, value, signatureType) {
              var vm = this;
              if (signatureType === "parent") {
                  vm.contactSignature = value;
              }
              else {
                  vm.formFields[index].model = value;
              }
          },
         
          async submit() {
              var vm = this;
              if (vm.contactFirstName === "") {
                  vm.store.snackbarSet("red", "Error", "Please add parent / guardian first name!");
              }
              else if (vm.contactLastName === "") {
                  vm.store.snackbarSet("red", "Error", "Please add parent / guardian last name!");
              }
              else if (vm.userStreet === "") {
                  vm.store.snackbarSet("red", "Error", "Please add parent / guardian street!");
              }
              else if (vm.userSuburb === "") {
                  vm.store.snackbarSet("red", "Error", "Please add parent / guardian suburb!");
              }
              else if (vm.userPostCode === "") {
                  vm.store.snackbarSet("red", "Error", "Please add parent / guardian postcode");
              }
              else if (vm.userState === "") {
                  vm.store.snackbarSet("red", "Error", "Please add parent / guardian state!");
              }
              else if (vm.contactSignature === "" || vm.contactSignature === null || vm.contactSignature === undefined) {
                  vm.store.snackbarSet("red", "Error", "Please add parent / guardian signature!");
              }
              else {
    
                      vm.processing = true;
                        vm.store.appLoading = true
                              const cwa = {
                                  active: true,
                                  cwaInformation: vm.cwaInformation,
                                  // child details
                                  formId: "CWA",
                                  bookings: vm.activebookings,
                                  firstName: vm.firstName,
                                  lastName: vm.lastName,
                                  dateOfBirth: vm.dateOfBirth,
                                  childId: vm.id,
                                  enrolStartDate: vm.enrolStart,
                                  contactFirstName: vm.contactFirstName,
                                  contactLastName: vm.contactLastName,
                                  contactSignature: vm.contactSignature,
                                  userStreet: vm.userStreet,
                                  userState: vm.userState,
                                  userPostCode: vm.userPostCode,
                                  userSuburb: vm.userSuburb,
                                  // Dates & Time Record Made
                                  fullDateOfSubmission: format(new Date(), "yyyyMMdd") + "T" + format(new Date(), "HH:mm:ss"),
                                  timeSigned: format(new Date(), "HH:mm"),
                                  dateSigned: format(new Date(), "dd/MM/yyyy"),
                                  signedByParent: true,
                                  saved: false,
                              };

                              try {
                                await vm.store.addDocument('parentForms', cwa)
                                .then(() => { 
                                       vm.updateChildCWA()
                                   // vm.sendEmailNew()
                                })
                                }
                                catch(err) {
                                vm.store.appLoading = false
                                vm.store.snackbarSet('red', 'Error', `Something went wrong. Err: ${err}`)
                                }
              }
          },
          async updateChildCWA () {
            var vm = this
            try {
                vm.store.updateDocument('users', vm.id, { cwaComplete: true })
                .then(() => {
                    vm.store.snackbarSet("green", "Success", "CWA Signed!");
                    vm.$router.push("/");
                    vm.store.formComplete(vm.contactFirstName)
                    vm.store.appLoading = false
                    vm.processing = false
                })
            }
            catch {
                vm.store.appLoading = false
                  vm.store.snackbarSet('red', 'Error', `Something went wrong. Err: ${err}`)
            }
          },
          async fetchChildData() {
              var vm = this;
              vm.store.appLoading = true;
              console.log('child data')
              try {
              this.store.fetchData("users", vm.id).then((res) => {
                // if visitor does not exist - sign up
                if (res.data.value === null) {
                  vm.store.appLoading = false;
                  vm.store.snackbarSet('red', 'Error', `An Error occured: ${res.data.err}`)
                }
                else  {
                    console.log(res.data.value)
                  vm.firstName = res.data.value.firstName;
                  vm.lastName = res.data.value.lastName;
                  vm.yearGroup = res.data.value.yearGroup;
                  vm.cwaComplete = res.data.value.cwaComplete;
                  vm.dateOfBirth = res.data.value.dateOfBirth;
                  vm.enrolStartDate = res.data.value.enrolStartDate;
                  vm.fetchBookings();
                }
               })
             }
             catch (err) {
              vm.store.appLoading = false
              vm.store.snackbarSet('red', 'Error', `Something went wrong. Err: ${err}`)
             }
            },
          async fetchCwaData() {
              var vm = this;
              vm.store.appLoading = true;
              try {
              this.store.fetchCWA("account", "cwaSettings").then((res) => {
                // if visitor does not exist - sign up
                if (res.data.value === null) {
                  vm.store.appLoading = false;
                  vm.store.snackbarSet('red', 'Error', `An Error occured: ${res.data.err}`)
                }
                else  {
                  vm.cwaInformation = res.data.value.cwaInformation;
                  vm.businessName = res.data.value.businessName;
                  vm.businessABN = res.data.value.businessABN;
                  vm.serviceName = res.data.value.serviceName;

                  vm.fetchChildData();
                }
               })
             }
             catch (err) {
              vm.store.snackbarSet('red', 'Error', `Something went wrong. Err: ${err}`)
             }
          },
      },
  }
  </script>
  
  