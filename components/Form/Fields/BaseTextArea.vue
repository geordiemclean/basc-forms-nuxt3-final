<template>
    <v-textarea 
    rows="1"
    auto-grow
    :label="childItem.label" 
    :placeholder="childItem.placeHolder" 
    :hint="childItem.hint" 
    :color="childItem.color"
    @change="changeUpdate"  
    v-model="model" 
    :rules="rules"
    density="compact"
    :counter="childItem.restrictLength"
    :maxlength="childItem.maxLength"
    variant="outlined"
     />
</template>
<script>
export default {
    props: ['updateOnChange', 'importValue', 'importModel', 'childIndex', 'childItem'],
    data() {
        return {
            model: '',
            rules: [],
        }
    },
    methods: {
        changeUpdate() {
            if (this.updateOnChange === true)
            {
                this.$emit('updateField', this.model, this.childIndex)
            }
        },
    },
    created () {
        if (this.importValue === true) 
        {
            
            this.model = this.importModel
        }
        if (this.childItem.required === true) 
        {
            this.rules.push(v => !!v || 'Field is required')
        }
        if (this.childItem.restrictLength === true && this.childItem.maxLength !== '') 
        {
            this.rules.push(value => value.length <= this.maxLength || `Max ${this.maxLength} characters`)
        }
        if (this.childItem.restrictLength === true && this.childItem.minLength !== '') 
        {
            this.rules.push(v => v.length >= this.minLength || `Min ${this.minLength} characters`)
        }
    },
}
</script>