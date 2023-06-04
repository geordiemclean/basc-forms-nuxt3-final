<template>
    <div>
    <v-radio-group
    @change="changeUpdate"
    v-model="model" 
    :rules="rules"
    :required="childItem.required"
    :inline="childItem.row"
    :multiple="childItem.multiple"
     >
     <v-radio v-for="(item, itemIndex) in childItem.items"
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
    props: ['updateOnChange',  'importValue', 'importModel', 'childIndex', 'childItem'],
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
        if (this.childItem.color)
        {
            this.colorModel = this.childItem.color
        }
        if (this.childItem.type === 'multiple-choice')
        {
            this.model = []
           // this.multiple = true
        }
        if (this.childItem.required === true) 
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
            if (this.childItem.type === 'multiple-choice')
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