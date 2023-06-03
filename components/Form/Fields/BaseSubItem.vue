<template>
    <v-radio-group
    @change="changeUpdate"
    v-model="model" 
    :rules="rules"
    :required="required"
    class="font-weight-bold" 
   row
    :multiple="multiple"
     >
     <v-radio 
     @click="revealSubItems" 
     label="Yes"
     :value="true"
     :color="color"
     />
     <v-radio 
     @click="hideSubItems" 
     label="No"
     :value="false"
     :color="color"
     />
     </v-radio-group>
</template>
<script>
export default {
    props: ['type', 'label', 'placeHolder', 'hint', 'required', 'restrictLength', 'maxLength', 'minLength', 'color', 'items', 'row', 'updateOnChange', 'fieldId', 'importValue', 'importModel', 'childIndex', 'childItem'],
    data() {
        return {
            model: '',
            rules: [],
            prependIcon: '',
            multiple: false,
        }
    },
    created () {

        if (this.importValue === true) 
        {
            
            this.model = this.importModel
            if (this.importModel === true)
            {
            this.revealSubItems()
            }

        }
    },
    methods: {
    changeUpdate() {
            if (this.updateOnChange === true)
            {
                this.$emit('updateField', this.fieldId, this.model, this.childIndex, null)
            }
        },
        revealSubItems() {
            if (this.updateOnChange === true)
            {
                this.$emit('revealSubItems', this.childItem)
            }
        },
        hideSubItems() {
            if (this.updateOnChange === true)
            {
                this.$emit('hideSubItems', this.childItem)
            }
        },
        clear() {
            this.model = ''
            this.$emit('updateField', this.fieldId, this.model, this.childIndex, null)
        
        }
    },
}
</script>