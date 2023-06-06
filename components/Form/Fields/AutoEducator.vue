<template>
    <div>
   <v-table density="compact" v-for="(educator, educatorInd) in model"
   :key="educatorInd + 1"
   >
    <tbody>

        <tr>
        <td class="font-weight-bold">First Name
            <span class="red--text font-weight-bold" v-if="required">*</span>
        </td>
        <td><v-text-field readonly density="compact" :rules="rules" :required="required"  v-model="educator.firstName" /></td>
         </tr>  <tr>
          <td class="font-weight-bold">Last Name
            <span class="red--text font-weight-bold" v-if="required">*</span>
          </td>
          <td><v-text-field readonly density="compact" :rules="rules" :required="required"    v-model="educator.lastName" /></td>
           </tr>  <tr>
            <td class="font-weight-bold">Signature 
            </td>
            <td>
              <img  v-if="childDataLoaded && (educator.signature !== '' && educator.signature !== null && educator.signature !== undefined)"   height="80" :src="educator.signature" alt="">
              <span v-if="childDataLoaded && (educator.signature !== '' && educator.signature !== null && educator.signature !== undefined)">{{educator.timeSigned}} - {{educator.dateSigned}}</span>
            </td>
              </tr>
    </tbody>
   </v-table>
</div>
</template>
<script>
import BaseSignature from '../Fields/BaseSignature.vue'
import { format } from 'date-fns';


export default {
    components: { BaseSignature },
    props: ["collectionRef", "childDataLoaded", "childItem", "importModel", "educators", "fieldId", 'multiple', 'required', 'childIndex'],
    data() {
        return {
            model: [{ firstName: "", lastName: "", signature: "", educatorId: '' , dateSigned: '', timeSigned: ''}],
            responses: [],
            search: "",
            currentDocument: "",
            loading: false,
            defaultFields: [],
            order: "",
            currentIndex: null,
            rules: [],
        };
    },
    created() {
        // console.log(this.importModel)
        if (this.importModel && this.childDataLoaded) {
            this.model = this.importModel;
        }
        if (this.required === true) 
        {
            this.rules.push(v => !!v || 'Field is required')
        }
    },

       
}
</script>

<style>

</style>