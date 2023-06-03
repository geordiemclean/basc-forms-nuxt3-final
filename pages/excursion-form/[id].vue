<template>
    <v-main>
    <v-container fluid>
      <v-toolbar density="compact"  class="no-print " color="transparent" >
        <v-icon class="mr-2" color="purple"  @click="$router.push('/')">mdi-home</v-icon>
   </v-toolbar>
      <v-card  v-if="!store.appLoading"  max-width="900" class="mx-auto mt-5" style="border-top: 10px solid blue !important">
        <v-card-text class="font-weight-bold text--black">
          <h1> {{ id }} Vacation Excursion Form</h1>
          </v-card-text>
  
      </v-card>
  
      <v-card  v-if="!store.appLoading"  max-width="900" class="mx-auto mt-5" >
        <v-card-text>
        <v-card-text >
          <div  v-html="vacInformation"></div>
          </v-card-text>
        </v-card-text>
      </v-card>
  
      <v-card  v-if="!store.appLoading"  max-width="900" class="mx-auto mt-5" >
        <v-card-text >
          <h3    class="mb-7  text-purple  font-weight-bold">Child's Details</h3>
  
          <h3 class="  purple--text font-weight-bold">
            Child's First Name
          </h3>
          <v-text-field
          density="compact"
            variant="outlined"
            label="Child First Name"
            v-model="firstName"
          />
  
        
          <p class="  purple--text font-weight-bold">
            Child's Last Name
          </p>
          <v-text-field
          density="compact"
            variant="outlined"
            
            label="Child Last Name"
            v-model="lastName"
          />
       
          <p class="  purple--text font-weight-bold">
            Child's Year Group
          </p>
          <v-select
          v-if="id === 'Junior'"
          density="compact"
            :items="juniorYears"
            variant="outlined"
            label="Childs Year Group"
            v-model="yearGroup"
          />
           <v-select
          v-if="id === 'Senior'"
            :items="seniorYears"
            variant="outlined"
            label="Childs Year Group"
            v-model="yearGroup"
          />
          </v-card-text>
      </v-card>
            
  
      <v-card  v-if="!store.appLoading"  max-width="900" class="mx-auto mt-5" flat color="transparent" >
         <v-card-text>
          <v-row   >
            <v-col v-for="(item, i) in mergeArrays"  :key="i" cols="12" md="4">
              <v-card>
                    <v-card-text class="font-weight-bold body-1 blue--text  text-center">{{item.title}} {{item.dayOfExcursion}} - {{item.dateOfExcursion}} <v-icon large color="blue" @click="openInfo(item)" >mdi-information</v-icon> <span></span></v-card-text>
                  
                    
                  
                   <v-row  justify="center">
                     <v-col cols="10">
             
                <v-radio-group  >
                  <v-radio
                    class="font-weight-bold"
                    label="I have read and understand the above information, and I give permission for my child to leave the service premise to attend this excursion via the method of transport stated above."
                    value="Yes"
                    @click="authoriseAndCheck(item)"
                  ></v-radio>
                <a v-if="item.liability === true && item.liabilityLink !== ''" class="ml-5 font-weight-bold" target="_blank" :href="item.liabilityLink">Click here to complete liability form.</a>
                </v-radio-group>
                <h5 v-if="item.waterActivity === true" class="mt-n3 mb-n5 blue--text font-weight-bold">Swimming Ability?</h5>
                <v-radio-group v-if="item.waterActivity === true"  row  v-model="swimming">
                  <v-radio label="Non-Swimmer" value="Non-Swimmer"></v-radio>
                  <v-radio
                    label="Beginner Swimmer"
                    value="Beginner Swimmer"
                  ></v-radio>
                  <v-radio
                    label="Confident swimmer"
                    value="Confident Swimmer"
                  ></v-radio>
                </v-radio-group>
                </v-col>
              </v-row>
              </v-card>
            </v-col>
          </v-row>
          </v-card-text>
          </v-card>
  
          <v-card id="parentScroll"  v-if="!store.appLoading"  max-width="900" class="mx-auto mt-5">
            <v-card-title class="font-weight-bold text-purple">Parent / Guardian</v-card-title>
            <v-card-text>
               <v-row>
                 <v-col cols="12">
                   <h4 class="font-weight-bold">First Name</h4>
                  <v-text-field  variant="outlined" density="compact"  v-model="contactFirstName" />
                 </v-col>
                 <v-col cols="12" class="mt-n5">
                   <h4 class="font-weight-bold">Last Name</h4>
               <v-text-field  variant="outlined" density="compact"  v-model="contactLastName" />
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
  
                      
       
  
  <v-dialog max-width="900" v-model="dialogInfo">
    <v-card>
      <v-card-title >
        <v-spacer />
        <v-btn @click="dialogInfo = false" dark color="blue" class="font-weight-bold">
          
      <v-icon left   >mdi-close</v-icon>
        Close
  
        </v-btn>
      </v-card-title>
      <v-card-text >
         <v-card-text
                class="mt-n5 text-center headline font-weight-bold blue--text"
                >{{ currentItem.title }} -<span class="ml-3 black--text"
                  >{{ currentItem.dayOfExcursion }} {{ currentItem.dateOfExcursion }}
                </span></v-card-text
              >
              <!-- <v-card-text>index: {{index}}, step {{step}}</v-card-text> -->
              <v-row justify="center">
                <v-table>
                  <tbody>
                    <tr>
                      <td :class="class1">Departure Time</td>
                      <td>{{ currentItem.departureTime }}</td>
                    </tr>
                    <tr>
                      <td :class="class1">Return Time:</td>
                      <td>{{ currentItem.returnTime }}</td>
                    </tr>
                    <tr>
                      <td :class="class1">Excursion Cost:</td>
                      <td>${{ currentItem.price }}</td>
                    </tr>
                    <tr>
                      <td :class="class1">Venue Address:</td>
                      <td>
                        {{ currentItem.street }}, {{ currentItem.suburb }}, {{ currentItem.state }}
                        {{ currentItem.postCode }}
                      </td>
                    </tr>
                    <tr>
                      <td :class="class1">Pick Up Location:</td>
                      <td>
                        Bondi BASC, Bondi Public School, Wellington Street, Bondi,
                        NSW 2026
                      </td>
                    </tr>
                    <tr>
                      <td :class="class1">Transport To Venue:</td>
                      <td>{{ currentItem.transportTo }}</td>
                    </tr>
                    <tr>
                      <td :class="class1">Transport From Venue:</td>
                      <td>{{ currentItem.transportBack }}</td>
                    </tr>
                    <tr>
                      <td :class="class1">Travel Time:</td>
                      <td>{{ currentItem.travelTime }}</td>
                    </tr>
                    <tr>
                      <td :class="class1">Excursion Duration:</td>
                      <td>{{ currentItem.duration }}</td>
                    </tr>
                    <tr>
                      <td :class="class1">Information:</td>
                      <td>{{ currentItem.info }}</td>
                    </tr>
                  </tbody>
                </v-table>
              </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
  
    <DialogLeave />
  
    </v-container>
  </v-main>
  </template>
  
  <script>
  import { useStore } from '../../stores/Store'
  import { format } from "date-fns";
  import BaseSignature from '../../components/Form/Fields/BaseSignature.vue';
  import DialogLeave from '../../components/Helpers/DialogLeave.vue';
  
  export default {
      setup() {
          const store = useStore();
          const route = useRoute()
          const { id } = useRoute().params
          return {
              store, id, route
          };
      },
      data() {
          return {
            submitted: false,
              test: "",
              // v-linear-progress
              // start swimming
              selected: [],
              waterCheck: false,
              swimming: "",
              // end swimming
              progress1: 0,
              progress2: 25,
              progress3: 50,
              progress4: 75,
              progress5: 100,
              authorised: false,
              authorisedArray: [],
              currentItem: "",
              dialogInfo: false,
              loading: false,
              processing: false,
              class1: "font-weight-bold",
              step1Complete: false,
              infoComplete: false,
              vacInformation: null,
              // parent data
              contactFirstName: "",
              contactLastName: "",
              contactSignature: "",
              signatureEmpty: true,
              // userAddress: null,
              step: 3,
              saveColour: "blue",
              padColour: "blue lighten-5",
              juniorYears: [
                  "Kindy",
                  "Year 1",
                  "Year 2",
              ],
              seniorYears: [
                  "Year 3",
                  "Year 4",
                  "Year 5",
                  "Year 6",
              ],
              // currentAuthId: '',
              // child info
              firstName: "",
              lastName: "",
              yearGroup: "",
              vacExcursions: [],
          };
      },
      mounted() {
       this.fetchData()
      },
      computed: {
          filter: function () {
              this.sortBy("dateOfExcursionReversed");
              var formType = this.id;
              return this.vacExcursions.filter(function (u) {
                  return u.active === true && u.type === formType;
              });
          },
          mergeArrays: function () {
        
              return this.filter.map((obj) => ({
                 active: true, title: 
                 obj.title,  
                 excursionDetails: obj,
                 formId: "Excursion Form", 
                 activityId: obj.activityId, 
                 excursionId: obj.id,  
                  rollGroup: "", 
                  // notes: "",
                  tags: [], 
                  headCounts: [], 
                  //  linked: false,
                  //   childId: '',
                  firstName: "", 
                  lastName: "", 
                  yearGroup: "", 
                  //  accountId: "",
                  contactFirstName: "", 
                  contactLastName: "", 
                  contactSignature: "", 
                  fullDateOfSubmission: format(new Date(), "yyyyMMdd") + "T" + format(new Date(), "HH:mm:ss"), 
                  timeSigned: format(new Date(), "HH:mm"), 
                  dateSigned: format(new Date(), "dd/MM/yyyy"),
              }));
          },
      },
      beforeMount() {
        window.addEventListener("beforeunload", event => {
          if (this.$route.name === 'index' || this.$route.name === 'form-complete') return
          event.preventDefault()
          // Chrome requires returnValue to be set.
          event.returnValue = ""
        })
      },
      beforeRouteLeave(to, from, next) {
        if (!this.submitted)
        {
      this.store.dialogLeave = true
      this.store.createPromise().then(res => {
        this.store.dialogLeave = false
        next(res)
      })
        }
        else {
          this.store.dialogLeave = false
          next()
        }
      },
      methods: {
          updateArray(index, value, signatureType) {
              var vm = this;
              if (signatureType === "parent") {
                  vm.contactSignature = value;
              }
              else {
                  vm.formFields[index].model = value;
              }
          },
          submitForm() {
            var vm = this
              //  var childId = `${this.lastName}${this.firstName}${this.yearGroup}`;
              if (this.contactFirstName === "") {
                  this.store.snackbarSet("red", "Error", "Please add Parent / Guardians First Name!");
              }
              else if (this.contactLastName === "") {
                  this.store.snackbarSet("red", "Error", "Please add Parent / Guardians Last Name!");
              }
              else if (this.contactSignature === "" ||
                  this.contactSignature === undefined ||
                  this.contactSignature === null) {
                  this.store.snackbarSet("red", "Error", "Please select save on the signature pad!");
                  this.saveColour = "red";
              }
              else {
                  this.processing = true;
                  this.selected.forEach(async (element, index, array) => {
                      if (element.waterActivity === true && this.swimming) {
                          element.tags.push({
                              value: this.swimming,
                              color: "green",
                          });
                      }
                      // element.childId = childId
                      element.excursionDetails = "";
                      element.firstName = this.firstName;
                      element.lastName = this.lastName;
                      element.yearGroup = this.yearGroup;
                      element.contactFirstName = this.contactFirstName;
                      element.contactLastName = this.contactLastName;
                      element.contactSignature = this.contactSignature;
                      try {
                   
                      await vm.store.addSubDocument("vacExcursions", element.excursionId, "forms", array[index])
     
                        }
                        catch(err) {
                        vm.appLoading = false
                        vm.store.snackbarSet('red', 'Error', `Something went wrong. Err: ${err}`)
                        }
                  });
                  this.processing = false;
                  this.submitted = true;
                this.store.snackbarSet("green", "Success", "Form Completed!");
                this.$router.push("/form-complete");
                
              }
          },
          openInfo(item) {
              this.currentItem = item.excursionDetails
              this.dialogInfo = true;
          },
          async fetchArrays() {
              var vm = this
              try {
                 // get all visitors
                    vm.store.fetchArray('vacExcursions', 'dateOfExcursionReversed', '>=', format(new Date(), "yyyyMMdd")).then(
                    (res) => {
                        vm.vacExcursions = res.data.value
                        vm.store.appLoading = false;
                    })
                  }
             catch (err) {
                    vm.store.appLoading = false
                    vm.store.snackbarSet('red', 'Error', `Something went wrong. Err: ${err}`)
                    }
          },
          submit() {
              if (this.firstName === "") {
                  this.store.snackbarSet("red", "Error", "Please add Childs First Name!");
              }
              else if (this.lastName === "") {
                  this.store.snackbarSet("red", "Error", "Please add Childs Last Name!");
              }
              else if (this.yearGroup === "") {
                  this.store.snackbarSet("red", "Error", "Please add Childs Year Group!");
              }
              else {
                  this.nextStep2();
              }
          },
          nextStep2() {
              if (this.authorised === false) {
                  this.store.snackbarSet("pink", "Error", "Please authorise atleast 1 excursion!");
              }
              else if (this.waterCheck === true && this.swimming === "") {
                  this.store.snackbarSet("pink", "Error", "Please add swimming ability!");
              }
              else {
                  this.submitForm();
              }
          },
          authoriseAndCheck(item) {
              this.authorised = true;
              if (item.waterActivity === true) {
                  this.waterCheck = true;
              }
              this.selected.push(item);
          },
          sortBy(prop) {
              this.vacExcursions.sort((a, b) => (a[prop] < b[prop] ? -1 : 1));
          },
          async fetchData() {
              var vm = this;
              vm.store.appLoading = true;
              try {
              this.store.fetchData("account", "vacSettings").then((res) => {
                // if visitor does not exist - sign up
                if (res.data.value === null) {
                  vm.store.appLoading = false;
                  vm.store.snackbarSet('red', 'Error', `An Error occured: ${res.data.err}`)
                  vm.store.appLoading = false
                }
                else  {
                    vm.vacInformation = res.data.value.vacInformation;
                  vm.fetchArrays();
                }
               })
             }
             catch (err) {
              vm.store.appLoading = false
              vm.store.snackbarSet('red', 'Error', `Something went wrong. Err: ${err}`)
             }
  
          },
      },
      components: { BaseSignature, DialogLeave }
  };
  </script>
  
  <style></style>
  