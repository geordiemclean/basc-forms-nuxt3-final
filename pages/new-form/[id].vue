<template>
    <v-main>
    <v-container fluid>   
        <v-toolbar density="compact"  class="no-print " color="transparent" >
          <nuxt-link to="/">    <v-icon class="mr-2" color="purple" to="/">mdi-home</v-icon></nuxt-link>
         
      </v-toolbar>
  
  <v-card  v-if="!store.appLoading"  max-width="900" class="mx-auto mt-5" style="border-top: 10px solid blue !important">
    <v-card-text class="font-weight-bold text--black">
      <h1>{{formName}}</h1>
      </v-card-text>
    <v-card-text v-if="formDescription">
      {{formDescription}}
    </v-card-text>
  </v-card>
   
    
       <v-card id="childDetails" v-if="childRequired === true  && !store.appLoading"  max-width="900" class="mx-auto mt-5">
           <v-card-title class="font-weight-bold text-purple">Child Details</v-card-title>
           <v-card-text>
           <v-row>
            <v-col cols="6">
              <h4 class="font-weight-bold">Child First Name <span class="text-red font-weight-bold" >*</span></h4>
              <v-text-field :rules="[rules.required]" density="compact" variant="outlined" v-model="firstName" />
            </v-col>
            <v-col cols="6">
              <h4 class="font-weight-bold">Child Last Name  <span class="text-red font-weight-bold" >*</span></h4>
              <v-text-field :rules="[rules.required]" density="compact" variant="outlined"  v-model="lastName" />
            </v-col>
           </v-row>
          </v-card-text>
      </v-card>

      <div   v-for="(childItem, childIndex) in formFields" :key="childIndex + 100" :id="childItem.key" :hidden="childItem.sub" 
      >
  
               <v-card :style="childItem.style" max-width="900" class="mx-auto mt-5"    v-if="!store.appLoading">
  
               
                       <v-col cols="12" >
            <div v-if="childItem.type !== 'title'" class="font-weight-bold text-black  mb-2"><h4>{{childItem.title}} <span class="text-red font-weight-bold" v-if="childItem.required">*</span></h4>
             <BaseSignature 
             display="icon"
             :updateOnChange="true"
             :fieldId="childItem.key"
             
             :import="false"
             @updateArray="updateArray"
             :childIndex="childIndex"
             :importModel="childItem.model"
             v-if="childItem.type === 'signature' && !store.appLoading"                 
             />
           </div>
          <BaseTitle :title="childItem.title" :textWeight="childItem.textWeight" :textSize="childItem.textSize" :textColor="childItem.textColor" 
          v-if="childItem.type === 'title' && !store.appLoading"   
          />
          <component 
            :is="getComponentForField(childItem)" 
            v-if="!store.appLoading"
            :childItem="childItem"
            :childIndex="childIndex"
            :updateOnChange="true"
            @updateArray="updateArray"
            @updateFiles="updateFiles"
            :importValue="true"
            :childDataLoaded="!store.appLoading"
            @revealSubItems="revealSubItems"
            @hideSubItems="hideSubItems"
            @updateField="updateField"
            :type="childItem.type" 
            :dataType="childItem.dataType" 
            :label="childItem.label"
            :placeHolder="childItem.placeHolder"
            :hint="childItem.hint" 
            :items="childItem.items"
            :required="childItem.required"
            :color="childItem.color"
            :fieldId="childItem.key"
            :row="childItem.row"
            :importModel="childItem.model"
            :tableRows="childItem.tableRows"
            :multiple="childItem.multiple"
            :fileKey="childItem.fileKey"
            display="text-field"
           ></component>
            
           <BaseSignature 
           display="text-field"
           :updateOnChange="true"
           :fieldId="childItem.key"
           @updateField="updateField"
           :childIndex="childIndex"
           @updateArray="updateArray"
           :importValue="true"
           :importModel="childItem.model"
           v-if="childItem.type === 'signature' && !store.appLoading && (childItem.model === '' || childItem.model === null || childItem.model === undefined)"                 
           />
           <img 
           v-if="childItem.type === 'signature' && !store.appLoading && childItem.model"    
           height="100" :src="childItem.model"  alt="" /> 
                       </v-col>
               </v-card>
     </div>
  
   <v-card id="parentScroll"  v-if="parentRequired === true "  max-width="900" class="mx-auto mt-5">
           <v-card-title class="font-weight-bold text-purple">Parent / Guardian</v-card-title>
           <v-card-text>
              <v-row>
                <v-col cols="12">
                  <h4 class="font-weight-bold">First Name</h4>
                 <v-text-field  variant="outlined" density="compact"  v-model="parentFirstName" />
                </v-col>
                <v-col cols="12" class="mt-n5">
                  <h4 class="font-weight-bold">Last Name</h4>
              <v-text-field  variant="outlined" density="compact"  v-model="parentLastName" />
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
                    v-if="(parentSignature === '' || parentSignature === null || parentSignature === undefined)"                 
                    />
                    <div v-else>
                      <img  height="80" :src="parentSignature" alt="" />
                      <span class="font-weight-bold black--text" v-if="parentTimeSigned">Signed at {{parentTimeSigned}} </span><span class="font-weight-bold black--text" v-if="parentDateSigned"> on {{parentDateSigned}}</span>  
                    </div>
                   
                </v-col>
              </v-row>
           </v-card-text>
  
      </v-card>
  
    
      
  
     <v-card-text class="text-center" v-if="!store.appLoading">
          <v-progress-circular
          v-if="processing"
          color="grey"
          indeterminate
          small
        />
       <v-btn
          v-if="!processing "
          color="primary"
          dark
          size="x-large"
          class="font-weight-bold"
          @click="submitForm"
        >
         <span >Submit</span>
        </v-btn>
  
    </v-card-text>
  
      <DialogLeave />
      
       
    </v-container>
  </v-main>
  </template>
  
  <script>
  
//   import emailjs from "emailjs-com";
  
  import { format } from 'date-fns';

  
  import { useStore } from '../../stores/Store.js'
  import DialogLeave from "../../components/Helpers/DialogLeave.vue";

  import BaseTitle from "../../components/Form/Fields/BaseTitle.vue";

  import BaseTextField from "@/components/Form/Fields/BaseTextField.vue";
  import BaseTextArea from "@/components/Form/Fields/BaseTextArea.vue";
  import BaseDate from "@/components/Form/Fields/BaseDate.vue";
  import BaseSwitch from "@/components/Form/Fields/BaseSwitch.vue";
  import BaseDropDown from "@/components/Form/Fields/BaseDropDown.vue";
  import BaseRadio from "@/components/Form/Fields/BaseRadio.vue";
  import BaseCheckBox from "@/components/Form/Fields/BaseCheckBox.vue";
  import BaseTime from "@/components/Form/Fields/BaseTime.vue";
  import BaseUpload from "@/components/Form/Fields/BaseUpload.vue";
  import BaseInformation from "@/components/Form/Fields/BaseInformation.vue";
  import BaseTable from "@/components/Form/Fields/BaseTable.vue";
  import BaseSignature from "@/components/Form/Fields/BaseSignature.vue";
  import BaseSubItem from "@/components/Form/Fields/BaseSubItem.vue";
  
  export default {
    setup() {
      const route = useRoute()
          const store = useStore();
          const { id } = useRoute().params
          return {
              store, id, route
          };
      },
      components: {

     BaseSignature,
      BaseTitle,
      DialogLeave,
      BaseTextField,
      BaseTextArea,
      BaseDate,
      BaseSwitch,
      BaseDropDown,
      BaseRadio,
      BaseCheckBox,
      BaseTime,
      BaseUpload,
      BaseInformation,
      BaseTable,
      BaseSubItem,

  },
      data() {
          return {
            processing: false,
            submitted: false,
            openDialog: false,
            functionResolve: null,
            //
            order: [],
              // rules
              rules: {
          required: value => !!value || 'Field is required',
        },
            emailRules: [
          (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
          ],
            // end rules
            loading: false,
            // start leave
            // end leave
            step: 1,
             timePickerFormat: 'hh:mm a',
            checkForm: false,
            printOn: false,
          firstName: null,
           lastName: null,
           gender: null,
           dateOfBirth: null,
           childsAge: null,
            // start signatories
            currentSignatory: '',
          childRequired: null,
          childNumber: null,
            parentRequired: null,
             parentFirstName: '',
               parentLastName: '',
            parentSignature: '',
            parentDateSigned: null,
            parentTimeSigned: null,
            // end signatories
            // start signature
        currentParentItem: null,
        currentParentIndex: null,
        currentChildIndex: null,
        dialogSignature: false,
        signature: '',
        hideMessage: true,
        hideMessage1: true,
        signatureClass: 'blue lighten-5',
        saveColour: 'green',
        signUpDate: null,
        saveSignature: false,
        // end signature
            // end dialog add field
            formName: null,
            formType: null,
            formId: null,
             formDescription: null,
              formFields: [],
              stampDate: null,
              stampTime: null,
              // email send
              testParams: {
                  items: [
                    
                  ]
              },
              newFormId: null,
              // border: 1px solid black;
              columnOneSyle: "width:50%; padding: 10px; font-weight:bold; font-size: 18px; font-family: Arial, Helvetica, sans-serif; border: 1px solid  black;",
              columnTwoSyle: "width:50%; padding: 10px;  font-size: 18px; font-family: Arial, Helvetica, sans-serif; border: 1px solid black;" ,
              columnOneClass: 'font-weight-bold text-black text-h6',
              titleStyle: 'font-weight:bold;  color: #2196F3; font-size: 22px; font-family: Arial, Helvetica, sans-serif; ',
          }
      },
    mounted() {
    this.fetchTemplateData()
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
      computed: {
      
        emailFields() {
        const finalFields = this.formFields.filter(item => item.active !== false && item.sub !== true && (item.model !== '' && item.model !== null && item.model !== undefined || item.type === 'title') )
        finalFields.forEach((item, index) => {
         if (item.model === true)
          {
            finalFields[index].html = `<tr><td style="${this.columnOneSyle}" class="${this.columnOneClass}" >${item.title}</td><td style="${this.columnTwoSyle}" >Yes</td></tr>`
          }
         else if (item.model === false)
          {
            finalFields[index].html = `<tr><td style="${this.columnOneSyle}" class="${this.columnOneClass}" >${item.title}</td><td style="${this.columnTwoSyle}">No</td></tr>`
          }
          else if (item.type === 'title')
          {
            finalFields[index].html = `<tr><td style="${this.titleStyle}"><h3>${item.title}</h3></td><td></td></tr>`
          }
          else if  (item.model !== null && item.model !== undefined && item.model !== '' && item.type !== 'auto-fill-educator' && item.type !== 'title' && item.model !== true && item.model !== false)
          { 
          
            finalFields[index].html = `<tr><td style="${this.columnOneSyle}" class="${this.columnOneClass}" >${item.title}</td><td style="${this.columnTwoSyle}" >${item.model}</td></tr>` }
        })
        if (this.childRequired === true && this.childNumber === 'single')
          {
            finalFields.unshift(
              {html: `<tr><td style="${this.titleStyle}"><h3>Child Details</h3></td><td></td></tr>`},
              {html: `<tr><td style="${this.columnOneSyle}" class="${this.columnOneClass}" >Child First Name</td><td style="${this.columnTwoSyle}" >${this.firstName}</td></tr>`},
              {html: `<tr><td style="${this.columnOneSyle}" class="${this.columnOneClass}" >Child Last Name</td><td style="${this.columnTwoSyle}" >${this.lastName}</td></tr>`},
              )
          }
          if (this.parentRequired === true)
          {
            finalFields.push(
              {html: `<tr><td style="${this.titleStyle}"><h3>Parent Details</h3></td><td></td></tr>`},
              {html: `<tr><td style="${this.columnOneSyle}" class="${this.columnOneClass}" >First Name</td><td style="${this.columnTwoSyle}" >${this.parentFirstName}</td></tr>`},
              {html: `<tr><td style="${this.columnOneSyle}" class="${this.columnOneClass}" >Last Name</td><td style="${this.columnTwoSyle}" >${this.parentLastName}</td></tr>`},
              {html: `<tr><td style="${this.columnOneSyle}" class="${this.columnOneClass}" >Signature</td><td style="${this.columnTwoSyle}" ><img width="150" height="100" src="${this.parentSignature}"/></td></tr>`},
              {html: `<tr><td style="${this.columnOneSyle}" class="${this.columnOneClass}" >Date Signed</td><td style="${this.columnTwoSyle}" >${format(new Date(), 'dd/MM/yyyy')}</td></tr>`},
              {html: `<tr><td style="${this.columnOneSyle}" class="${this.columnOneClass}" >Time Signed</td><td style="${this.columnTwoSyle}" >${format(new Date(), 'HH:mm')}</td></tr>`},
              )
          }
        const test = finalFields.map(item => `${item.html}`).join('')
        return test
      },
      },
      methods: {
        getComponentForField(field) {
      // Return the corresponding component based on the field type
      switch (field.type) {
        case 'check-box':
          return 'BaseCheckBox';
        case 'date':
          return 'BaseDate';
        case 'drop-down':
          return 'BaseDropDown';
        case 'information':
          return 'BaseInformation';
        case 'single-choice':
          return 'BaseRadio';
        case 'multiple-choice':
          return 'BaseRadio';
        // case 'signature':
        //   return 'BaseSignature';
        case 'sub-item':
          return 'BaseSubItem';
        case 'switch':
          return 'BaseSwitch';
        case 'table':
          return 'BaseTable';
        case 'text-area':
          return 'BaseTextArea';
        case 'text-field':
          return 'BaseTextField';
        case 'time':
          return 'BaseTime';
        case 'upload':
          return 'BaseUpload';
        default:
          return 'div';
      }
    },
        async sendEmailNew () {
      // console.log(this.emailFields)
            var vm = this
           // let subject = ''
            let children = ''
            if (vm.childRequired === true && vm.childNumber === 'single')
            {
              children = `${vm.firstName} ${vm.lastName}`
            }

            // if (vm.$route.params.signatory === 'educator')
            // {
            //   subject = `${this.formName}`
            // }
            let message = {
                    subject: `${vm.formName} for ${children}`,
                    // html: `
                    // ${vm.formFields.map(item => `<tr><td>${item.title}</td><td>${item.model}</td></tr>`).join('')}
                    // `,
                    html: vm.emailFields
                }
            const info = {
                to: "bondiaftercare@gmail.com",
                message: message,
                from: 'New Parent Form" <bondiaftercare2@gmail.com>'
            }
           
           try { await vm.store.addDocument('mail', info)
          .then((res) => { 
            vm.submitted = true
           vm.$router.push('/')
           vm.store.formComplete(vm.parentFirstName)
           vm.store.snackbarSet('green', 'Success', 'Form Submitted!')
           vm.processing = false
           vm.appLoading = false
         })
        }
         catch(err) {
          vm.appLoading = false
          vm.store.snackbarSet('red', 'Error', `Something went wrong. Err: ${err}`)
         }
           
        
        },
     scrollToBottom () {
            const element = document.getElementById('parentScroll');
            element.scrollTop = element.scrollHeight;
        },
        updateField(key, value, childIndex, snackbar) {
              var vm = this
              console.log(key, snackbar)
              vm.formFields[childIndex].model = value
          },
          sendEmail () {
        const templateParams = {
          firstName: this.firstName,
          lastName: this.lastName,
          templateId: this.id,
          formId: this.newFormId,
          parentFirstName: this.parentFirstName,
          parentLastName: this.parentLastName,
          stampDate: format(new Date(), 'dd/MM/yyyy'),
          stampTime: format(new Date(), 'HH:mm'),
          formName: this.formName,
          formFields: this.testParams 
          }
        emailjs.send('service_3o4fw8s', 'template_19kewh1', templateParams,
              'user_vAEdepyhgf4tcqRxsYT3Y')
              .then((result) => {
                  console.log('SUCCESS!', result.status, result.text);
              }, (error) => {
                  console.log('FAILED...', error);
              });
      },
       
      // start revewl
      revealSubItems(childItem)
          {
            var vm = this
            childItem.subItems.forEach((subItem) => {
             vm.formFields.forEach((childItem2, childIndex) => {
              if (childItem2.key === subItem.key)
              {
                vm.formFields[childIndex].sub = false
           
              }
             })
            })
          },
          hideSubItems(childItem)
          {
             var vm = this
            childItem.subItems.forEach((subItem) => {
             vm.formFields.forEach((childItem2, childIndex) => {
              if (childItem2.key === subItem.key)
              {   
                vm.formFields[childIndex].sub = true
              }
             })
            })
          },
        updateArray(index, value, signatureType) {
              var vm = this
              if (signatureType === 'parent')
              {
                vm.parentSignature = value
               }
              else  
              {
              vm.formFields[index].model = value
               }
          },
          updateFiles(index, file) {
              var vm = this
              if ( vm.formFields[index].model === '' || vm.formFields[index].model === undefined || vm.formFields[index].model === null )
              {
                vm.formFields[index].model = [file]
              }
              else {
                vm.formFields[index].model.push(file)
              }
          },
          elementScroll(id){
            const element = document.getElementById(id);
              element.scrollIntoView();
          },
        // start next step
        async submitForm(){
          var vm = this
           if (vm.childRequired === true && (vm.firstName === '' || vm.firstName === null || vm.firstName === undefined))
            {
              vm.store.snackbarSet('pink', 'Error', 'Please add Child First Name')
              vm.elementScroll('childDetails');
          }
             else if (vm.childRequired === true && (vm.lastName === '' || vm.lastName === null || vm.lastName === undefined))
            {vm.store.snackbarSet('pink', 'Error', 'Please add Child Last Name')
            vm.elementScroll('childDetails');
          }
            else {
  
        var counter = 0
        var mobileCounter = 0
        var emailCounter = 0
        var itemKeys = []
       vm.formFields.forEach((item) => {
        if (item.type === 'time'){
  
        }
          // check each required quesiton is answered and change style to red if not
            if((item.model === '' || item.model === null || item.model === undefined || item.model === [] || (item.model === false && (item.type === 'switch' || item.type === 'check-box'))) && item.required === true && item.sub === false)
            {
                counter++
                 itemKeys.push(item.key)
            item.style = "border-top: 10px solid red !important"
            }
            // start check mobile is 10 digits
            else if (item.type === 'mobile' && item.required === true && item.model.length !== 10)
            {
              mobileCounter++
             
              item.style = "border-top: 10px solid red !important"
              vm.store.snackbarSet('pink', 'Error', `Mobile requires 10 digits, however, you have only entered ${item.model.length}`)
            }
            // start check email is valid
            else if (item.type === 'email' && item.required === true && (/.+@.+\..+/.test(item.model) === false)) 
            {
              emailCounter++
              item.style = "border-top: 10px solid red !important"
              vm.store.snackbarSet('pink', 'Error', 'Please enter a valid email!')
            }
            // remove red outline if all required questions are ansewers
            else if ((item.model !== '' && item.model !== null && item.model !== undefined && item.model !== []) && item.required === true)
            {item.style = ''
            }
          })
          // if each question is answers proceed to next step or submit
          if (counter === 0 && mobileCounter === 0 && emailCounter === 0)
          {
               if (vm.parentRequired === true && (vm.parentFirstName === '' || vm.parentFirstName === null || vm.parentFirstName === undefined))
            {vm.store.snackbarSet('pink', 'Error', 'Please add Parent / Guardian First Name')}
            else if (vm.parentRequired === true && (vm.parentLastName === '' || vm.parentLastName === null || vm.parentLastName === undefined))
            {vm.store.snackbarSet('pink', 'Error', 'Please add Parent / Guardian Last Name')}
             else if (vm.parentRequired === true && (vm.parentSignature === '' || vm.parentSignature === null || vm.parentSignature === undefined))
            {vm.store.snackbarSet('pink', 'Error', 'Please add Parent / Guardian Signature')}
            else {
              
              vm.processing = true
              var info = {
                formSaved: false,
            // formFields: vm.formFields,
             formName: vm.formName,
              formType: vm.formType,
              formId: vm.formId,
            formDescription: vm.formDescription,
             templateId: vm.id,
              stampDate: format(new Date(), 'dd/MM/yyyy'),
            stampTime: format(new Date(), 'HH:mm'),
            stampFull: format(new Date(), 'yyyyMMdd') + 'T' + format(new Date(), 'HH:mm:ss'),
            dateSigned: format(new Date(), 'dd/MM/yyyy'),
            timeSigned: format(new Date(), 'HH:mm'),
            dateRecordMade: format(new Date(), 'dd/MM/yyyy'),
            timeRecordMade: format(new Date(), 'HH:mm'),
            fullDateOfSubmission: format(new Date(), 'yyyyMMdd') + 'T' + format(new Date(), 'HH:mm:ss'),
          //  parentRequired: vm.parentRequired,
            parentFirstName: vm.parentFirstName,
             parentLastName: vm.parentLastName,
          //   childRequired: vm.childRequired,
           //  childNumber: vm.childNumber,
            firstName: vm.firstName,
             lastName: vm.lastName,
             parentDateSigned: format(new Date(), 'dd/MM/yyyy'),
              parentTimeSigned: format(new Date(), 'HH:mm'),
              parentSignature: vm.parentSignature,
              newForm: true,
           }
  
              vm.formFields.forEach((childItem)=>{
                  if (childItem.type !== 'table' && childItem.type !== 'title' && childItem.type !== 'information')
                 { info[childItem.key] = childItem.model 
                  vm.testParams.items.push({
                    title: childItem.title,
                    value: childItem.model
                  })
  
                }
                  
              })

              try {
         await vm.store.addDocument('forms', info)
          .then((res) => { 
         
            vm.newFormId = res.data.value
            vm.sendEmailNew()
            
         })
        }
         catch(err) {
          vm.appLoading = false
          vm.store.snackbarSet('red', 'Error', `Something went wrong. Err: ${err}`)
         }


       
            }
            
            }
          else if (counter !== 0){
            vm.store.snackbarSet('pink', 'Error', 'Please complete each required question!')
            const element = document.getElementById(itemKeys[0]);
              element.scrollIntoView();
          }
            }
         },
        // form
        async fetchFields () {
          var vm = this

          try {
              this.store.fetchSubArray("formTemplate", vm.id, "formFields", "active", "==", true).then((res) => {
          
                // if visitor does not exist - sign up
                if (res.data.value === null) {
                  vm.appLoading = false;
          
                  vm.store.snackbarSet('red', 'Error', `An Error occured: ${res.data.err}`)
                  vm.store.appLoading = false
                }
                else  {
                  // success continue
                  vm.formFields = res.data.value
                  vm.formFields.sort(function (a, b) {
                    return vm.order.indexOf(a.id) - vm.order.indexOf(b.id);
                   });

                    vm.store.appLoading = false
                

                }
               })
             }
             catch (err) {
              vm.store.appLoading = false
              vm.store.snackbarSet('red', 'Error', `Something went wrong. Err: ${err}`)
             }



        },
        // templates
        async fetchTemplateData() {
          var vm = this
          vm.store.appLoading = true
        
          try {
              this.store.fetchData("formTemplate", vm.id).then((res) => {

                // if visitor does not exist - sign up
                if (res.data.value === null) {
                  vm.appLoading = false;
                  vm.store.snackbarSet('red', 'Error', `An Error occured: ${res.data.err}`)
                  vm.store.appLoading = false
                }
                else  {
                  vm.order = res.data.value.order;
                    vm.formType = res.data.value.formType;
                    vm.formId = res.data.value.formId;
                  vm.formName = res.data.value.formName;
                  vm.formDescription = res.data.value.formDescription;
                  vm.formType = res.data.value.formType;
                    vm.childNumber = res.data.value.childNumber;
                    vm.childRequired = res.data.value.childRequired;
                    vm.educatorRequired = res.data.value.educatorRequired;
                      vm.rpRequired = res.data.value.rpRequired;
                        vm.parentRequired = res.data.value.parentRequired;
                        // end loading
                        vm.fetchFields()
                }
               })
             }
             catch (err) {
              vm.store.appLoading = false

              vm.store.snackbarSet('red', 'Error', `Something went wrong. Err: ${err}`)
             }
        },
     
     
    },
  }
  </script>
  
  <style scoped>
     html {
    scroll-behavior: smooth;
  }

  
  </style>