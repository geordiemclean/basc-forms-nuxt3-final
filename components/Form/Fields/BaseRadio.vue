<template>
    <div>
    <v-radio-group
    @change="changeUpdate"
    v-model="model" 
    :rules="rules"
    :required="required"
    :inline="row"
    :multiple="multiple"
     >
     <v-radio v-for="(item, itemIndex) in items"
     :key="itemIndex + item.value"
     :label="item.value"
     :value="item.value"
     :color="colorModel"
     class="text-black font-weight-bold"
     >
     </v-radio>
     
     </v-radio-group>
     <v-btn dark size="x-small" color="pink" class="font-weight-bold no-print " @click="clear">Clear</v-btn>
    </div>
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
            colorModel: 'primary',
        }
    },
    created () {
        if (this.color)
        {
            this.colorModel = this.color
        }
        if (this.type === 'multiple-choice')
        {
            this.model = []
            this.multiple = true
        }
        if (this.required === true) 
        {
            this.rules.push(v => !!v || 'Field is required')
        }
        if (this.importValue === true && this.importModel) 
        {
            
            this.model = this.importModel
        }
    },
    methods: {
    changeUpdate() {
            if (this.updateOnChange === true)
            {
                this.$emit('updateField', this.model, this.childIndex)
            }
        },
        clear() {
            if (this.type === 'multiple-choice')
        {
            this.model = []
                this.$emit('updateField', this.model, this.childIndex)
        }
        else {

            this.model = ''
                this.$emit('updateField', this.model, this.childIndex)
        }
       
        }
    },
}
</script>