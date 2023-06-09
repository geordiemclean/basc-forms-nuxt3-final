<template>
    <v-btn
    color="primary"
    dark
    size="x-large"
    class="font-weight-bold"
    @click="submitParentSign"
  >
   <span >Submit</span>
  </v-btn>
</template>

<script>
 import { format } from 'date-fns';
import { useStore } from '../../stores/Store.js'

export default {
    props: ['templateData', 'formData', 'formFields', 'parentFirstName', 'parentLastName', 'parentSignature'],
    setup() {
      const route = useRoute()
          const store = useStore();
          const { id, staffFormId } = useRoute().params
          return {
              store, id, route, staffFormId
          };
      },
      data() {
        return {
            columnOneStyle: "width:50%; padding: 10px; font-weight:bold; font-size: 18px; font-family: Arial, Helvetica, sans-serif; border: 1px solid  black;",
            columnTwoStyle: "width:50%; padding: 10px;  font-size: 18px; font-family: Arial, Helvetica, sans-serif; border: 1px solid black;" ,
            linkStyle: 'font-weight:bold;  color: #2196F3; font-size: 21px; font-family: Arial, Helvetica, sans-serif; ',
            titleStyle: 'font-weight:bold; color: #2196F3; font-size: 21px; font-family: Arial, Helvetica, sans-serif; ',
            // titles
            headingStyle: ' font-weight:bold; color: #2196F3; font-size: 25px; font-family: Arial, Helvetica, sans-serif; ',
            subHeadingStyle: ' font-weight:bold; color: black; font-size: 21px; font-family: Arial, Helvetica, sans-serif; ',
        }
      },
      created () {
        console.log('template', this.templateData);
        console.log('form', this.formData);
      },
    computed: {
        emailFields() {
        var vm = this
        const finalFields = this.formFields.filter(item => item.active !== false && item.sub !== true && (item.model !== '' && item.model !== null && item.model !== undefined || item.type === 'title') )
        finalFields.forEach((item, index) => {
          if (item.type === 'auto-fill-educator' && item.model)
          {
            item.model.forEach((childItem) => {
            
                finalFields[index].html = `
                <tr> 
                  <td style="${this.titleStyle}"><h3>${item.title}</h3></td><td></td>
                <tr> 
                  <td style="${this.columnOneStyle}">First Name</td><td style="${this.columnTwoStyle}">${childItem.firstName} </td>
                <tr/>
                <tr> 
                  <td style="${this.columnOneStyle}">Last Name</td><td style="${this.columnTwoStyle}">${childItem.lastName} </td>
                <tr/>
                <tr> 
                  <td style="${this.columnOneStyle}">Signature</td><td style="${this.columnTwoStyle}"><img width="150" height="100" src="${childItem.signature}"/></td>
                <tr/>
                `
              
            })
          }
          else if (item.type === 'check-box' || item.type === 'switch')
          {
            finalFields[index].html = `<tr><td style="${this.columnOneStyle}" >${item.title}</td><td style="${this.columnTwoStyle}">${item.label}</td></tr>`
          }
          else if (item.model === true && item.type === 'sub-item')
          {
            finalFields[index].html = `<tr><td style="${this.columnOneStyle}" >${item.title}</td><td style="${this.columnTwoStyle}">Yes</td></tr>`
          }
         else if (item.model === false && item.type === 'sub-item')
          {
            finalFields[index].html = `<tr><td style="${this.columnOneStyle}" >${item.title}</td ><td style="${this.columnTwoStyle}">No</td></tr>`
          }
          else if (item.type === 'title')
          {
            finalFields[index].html = `<tr><td style="${this.titleStyle}"><h3>${item.title}</h3></td><td></td></tr>`
          }
          else if  (item.model !== null && item.model !== undefined && item.model !== '' && item.type !== 'auto-fill-educator' && item.type !== 'title' && item.model !== true && item.model !== false)
          { 
          
            finalFields[index].html = `<tr><td style="${this.columnOneStyle}" >${item.title}</td><td style="${this.columnTwoStyle}">${item.model}</td></tr>` }
        })
        
        // if (this.childRequired === true && this.childNumber === 'single')
        //   {
            finalFields.unshift(
              {html: `<tr><td style="${this.titleStyle}"><h3>Child Details</h3></td><td></td></tr>`},
              {html: `<tr><td style="${this.columnOneStyle}" >Child First Name</td><td style="${this.columnTwoStyle}">${this.formData.firstName}</td></tr>`},
              {html: `<tr><td style="${this.columnOneStyle}" >Child Last Name</td><td style="${this.columnTwoStyle}">${this.formData.lastName}</td></tr>`},
              {html: `<tr><td style="${this.columnOneStyle}" >Child Gender</td><td style="${this.columnTwoStyle}">${this.formData.gender}</td></tr>`},
              {html: `<tr><td style="${this.columnOneStyle}" >Child Date Of Birth</td><td style="${this.columnTwoStyle}">${this.formData.dateOfBirth}</td></tr>`},
              {html: `<tr><td style="${this.columnOneStyle}" >Child Child's Age</td><td style="${this.columnTwoStyle}">${this.formData.childsAge}</td></tr>`},
              )
        //  }
        //   if (this.childRequired === true && this.childNumber === 'multiple')
        //   {
        //   const childrenMap =  this.children.map((item, index) => `
        //     <tr><td style="${this.columnOneStyle}" >Child ${index + 1}</td><td style="${this.columnTwoStyle}">${item.firstName} ${item.lastName} (${item.gender} ${item.dateOfBirth})</td></tr>
        //     `).join('')
        //     finalFields.unshift(
        //       {html: `<tr><td style="${this.titleStyle}"><h3>Children</h3></td><td></td></tr>`},
        //       {html: `${childrenMap}`},
        //       )
        //   }
        
          if (this.templateData.educatorRequired === true)
          {
            finalFields.push(
              {html: `<tr><td style="${this.titleStyle}"><h3>Educator / Person Completing This Form Details</h3></td><td></td></tr>`},
              {html: `<tr><td style="${this.columnOneStyle}" >First Name</td><td style="${this.columnTwoStyle}">${this.formData.educatorFirstName}</td></tr>`},
              {html: `<tr><td style="${this.columnOneStyle}" >Last Name</td><td style="${this.columnTwoStyle}">${this.formData.educatorLastName}</td></tr>`},
              {html: `<tr><td style="${this.columnOneStyle}" >Signature</td><td style="${this.columnTwoStyle}"><img width="150" height="100" src="${this.formData.educatorSignature}"/></td></tr>`},
              {html: `<tr><td style="${this.columnOneStyle}" >Date Signed</td><td style="${this.columnTwoStyle}">${this.formData.educatorDateSigned}</td></tr>`},
              {html: `<tr><td style="${this.columnOneStyle}" >Time Signed</td><td style="${this.columnTwoStyle}">${this.formData.educatorTimeSigned}</td></tr>`},
              )
          }
          if (this.templateData.rpRequired === true && (this.rpSignature !== '' && this.rpSignature !== null && this.rpSignature !== undefined))
          {
            finalFields.push(
              {html: `<tr><td style="${this.titleStyle}"><h3>Responsible Person Details</h3></td><td></td></tr>`},
              {html: `<tr><td style="${this.columnOneStyle}" >First Name</td><td style="${this.columnTwoStyle}">${this.formData.rpFirstName}</td></tr>`},
              {html: `<tr><td style="${this.columnOneStyle}" >Last Name</td><td style="${this.columnTwoStyle}">${this.formData.rpLastName}</td></tr>`},
              {html: `<tr><td style="${this.columnOneStyle}" >Signature</td><td style="${this.columnTwoStyle}"><img width="150" height="100" src="${this.formData.rpSignature}"/></td></tr>`},
              {html: `<tr><td style="${this.columnOneStyle}" >Date Signed</td><td style="${this.columnTwoStyle}">${this.formData.rpDateSigned}</td></tr>`},
              {html: `<tr><td style="${this.columnOneStyle}" >Time Signed</td><td style="${this.columnTwoStyle}">${this.formData.rpTimeSigned}</td></tr>`},
              )
          }
        //   if (this.parentRequired === true && (this.parentSignature !== '' && this.parentSignature !== null && this.parentSignature !== undefined))
        //   {
            finalFields.push(
              {html: `<tr><td style="${this.titleStyle}"><h3>Parent Details</h3></td><td></td></tr>`},
              {html: `<tr><td style="${this.columnOneStyle}" >First Name</td><td style="${this.columnTwoStyle}">${this.parentFirstName}</td></tr>`},
              {html: `<tr><td style="${this.columnOneStyle}" >Last Name</td><td style="${this.columnTwoStyle}">${this.parentLastName}</td></tr>`},
              {html: `<tr><td style="${this.columnOneStyle}" >Signature</td><td style="${this.columnTwoStyle}"><img width="150" height="100" src="${this.parentSignature}"/></td></tr>`},
              {html: `<tr><td style="${this.columnOneStyle}" >Date Signed</td><td style="${this.columnTwoStyle}">${format(new Date(), 'dd/MM/yyyy')}</td></tr>`},
              {html: `<tr><td style="${this.columnOneStyle}" >Time Signed</td><td style="${this.columnTwoStyle}">${format(new Date(), 'HH:mm')}</td></tr>`},
              )
          //}
          finalFields.unshift(
              {html: `<tr><td  style="${this.headingStyle}">${this.templateData.formName}</td> </tr> `},
                {html: `<tr><td  style="${this.subHeadingStyle}">${this.formData.stampDate} - ${this.formData.stampTime}</td> </tr>`},
                {html: `<tr><td  style="${this.linkStyle}"> <a href="https://admin.bondibasc.com/all/template/${vm.id}/form/${vm.staffFormId}" >Link To Form</a>  </td> </tr>`}
              )
        const test = finalFields.map(item => `${item.html}`).join('')
        return test
      },
    },
    methods: {
        sendEmailNew() {
            var vm = this
            let message = {
                    subject: `${this.formData.stampDate} - ${vm.formData.lastName}, ${vm.formData.firstName} - ${this.templateData.formName}`,
                    // html: `
                    // ${vm.formFields.map(item => `<tr><td>${item.title}</td><td>${item.model}</td></tr>`).join('')}
                    // `,
                    html: vm.emailFields
                }
            const info = {
                to: "bondiaftercare@gmail.com",
                message: message,
                from: '"Form Complete" <bondiaftercare2@gmail.com>',
            }
            this.store.addDocument('mail', info)
        },
        async submitParentSign () {
        var vm = this
        
        if ((vm.parentFirstName === '' || vm.parentFirstName === null || vm.parentFirstName === undefined))
          {vm.store.snackbarSet('pink', 'Error', 'Please add Parent / Guardian First Name')}
          else if ( (vm.parentLastName === '' || vm.parentLastName === null || vm.parentLastName === undefined))
          {vm.store.snackbarSet('pink', 'Error', 'Please add Parent / Guardian Last Name')}
           else if ( (vm.parentSignature === '' || vm.parentSignature === null || vm.parentSignature === undefined))
          {vm.store.snackbarSet('pink', 'Error', 'Please add Parent / Guardian Signature')}
          else {
            vm.processing = true
            const info = {
              parentFirstName: vm.parentFirstName,
           parentLastName: vm.parentLastName,
        //   childRequired: vm.childRequired,
           parentDateSigned: format(new Date(), 'dd/MM/yyyy'),
            parentTimeSigned: format(new Date(), 'HH:mm'),
            parentSignature: vm.parentSignature,
            formSaved: true,
            formEmailed: true,
            }
            vm.store.updateDocument('forms', this.staffFormId, info).then(() => {
                vm.sendEmailNew()
              vm.store.snackbarSet('green', 'Success', 'Form Submitted')
                vm.store.submitted = true
                vm.processing = false
                vm.$router.push('/')
                vm.store.formComplete(vm.parentFirstName)
            })
          }
      },
    },
}
</script>